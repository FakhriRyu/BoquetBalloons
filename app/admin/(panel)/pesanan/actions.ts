"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { emptyToNull, fail, invalid, ok, optionalText, refreshAdmin, requiredText, rupiah, rupiahOrZero, type ActionState } from "@/lib/admin/action";
import { loadCostTable } from "@/lib/admin/costs";
import { requireAdmin } from "@/lib/auth/dal";
import { isIsoDate, todayWIB } from "@/lib/dates";
import { bouquetCost } from "@/lib/hpp";
import { ORDER_STATUSES, itemsSubtotal, orderTotal, type OrderStatus } from "@/lib/orders";

const { orders, orderItems, flowerTypes, colors, products } = schema;

const isoDate = (label: string) => z.string({ error: `${label} wajib diisi.` }).refine(isIsoDate, `${label} tidak valid.`);

const headerSchema = z.object({
  customerName: requiredText("Nama pelanggan", 80),
  customerPhone: optionalText("No. HP", 30),
  orderDate: isoDate("Tanggal pesan"),
  pickupDate: z.preprocess(emptyToNull, isoDate("Tanggal ambil").nullable().default(null)),
  discount: rupiahOrZero("Diskon"),
  shippingFee: rupiahOrZero("Ongkir"),
  note: optionalText("Catatan", 500),
});

const qty = z.coerce.number({ error: "Jumlah harus berupa angka." }).int("Jumlah harus bilangan bulat.").min(1, "Jumlah minimal 1.").max(1000);

const itemSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("rakit"),
    flowerTypeId: z.string().min(1, "Pilih jenis bunga."),
    qty,
    petalColorId: z.string().min(1, "Pilih warna kelopak."),
    stemColorId: z.string().min(1, "Pilih warna tangkai."),
    ribbonColorId: z.string().min(1, "Pilih warna pita."),
    unitPrice: rupiah("Harga per tangkai"),
  }),
  z.object({ kind: z.literal("katalog"), productId: z.string().min(1, "Pilih produk."), qty, unitPrice: rupiah("Harga") }),
  z.object({
    kind: z.literal("lain"),
    description: requiredText("Keterangan item", 120),
    qty,
    unitPrice: rupiah("Harga"),
    unitCost: rupiahOrZero("HPP"),
  }),
]);
const itemsSchema = z.array(itemSchema).min(1, "Tambahkan minimal satu item.").max(30, "Maksimal 30 item per pesanan.");

type ItemInput = z.infer<typeof itemSchema>;
type ItemRow = typeof orderItems.$inferInsert;

/** Ubah isian form menjadi baris item dengan snapshot nama, warna, dan HPP saat ini. */
async function buildItems(orderId: string, input: ItemInput[]): Promise<ItemRow[] | string> {
  const db = getDb();
  const [{ table }, typeRows, colorRows, productRows] = await Promise.all([
    loadCostTable(),
    db.select().from(flowerTypes),
    db.select().from(colors),
    db.select().from(products),
  ]);
  const type = new Map(typeRows.map((t) => [t.id, t]));
  const color = new Map(colorRows.map((c) => [c.id, c]));
  const product = new Map(productRows.map((p) => [p.id, p]));

  const rows: ItemRow[] = [];
  for (const [i, it] of input.entries()) {
    const base = { id: crypto.randomUUID(), orderId, qty: it.qty, unitPrice: it.unitPrice, sortOrder: i };
    if (it.kind === "rakit") {
      const t = type.get(it.flowerTypeId);
      const petal = color.get(it.petalColorId);
      const stem = color.get(it.stemColorId);
      const ribbon = color.get(it.ribbonColorId);
      if (!t || !petal || !stem || !ribbon) return `Item ${i + 1}: jenis bunga atau warna sudah tidak ada. Muat ulang halaman.`;
      rows.push({
        ...base,
        description: `${t.name} · ${it.qty} tangkai`,
        flowerTypeId: t.id,
        unitCost: Math.round(table.stemCost(t.id)),
        extraCost: Math.round(table.bouquetCost),
        petalColor: petal.name,
        stemColor: stem.name,
        ribbonColor: ribbon.name,
      });
    } else if (it.kind === "katalog") {
      const p = product.get(it.productId);
      if (!p) return `Item ${i + 1}: produk sudah tidak ada. Muat ulang halaman.`;
      rows.push({
        ...base,
        description: p.name,
        productId: p.id,
        unitCost: p.flowerTypeId && p.stemCount ? bouquetCost(table, p.flowerTypeId, p.stemCount) : 0,
      });
    } else {
      rows.push({ ...base, description: it.description, unitCost: it.unitCost });
    }
  }
  return rows;
}

function parseItems(raw: FormDataEntryValue | null) {
  try {
    return itemsSchema.safeParse(JSON.parse(String(raw ?? "[]")));
  } catch {
    return itemsSchema.safeParse(null);
  }
}

export async function createOrder(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const header = headerSchema.safeParse(Object.fromEntries(formData));
  if (!header.success) return invalid(header.error);
  const items = parseItems(formData.get("items"));
  if (!items.success) return invalid(items.error);
  const status = z.enum(ORDER_STATUSES).catch("baru").parse(formData.get("status"));
  const isPaid = formData.get("isPaid") === "on";

  const id = crypto.randomUUID();
  const rows = await buildItems(id, items.data);
  if (typeof rows === "string") return fail(rows);

  const h = header.data;
  const total = orderTotal(itemsSubtotal(items.data), h.discount, h.shippingFee);
  if (total < 0) return fail("Diskon lebih besar dari total belanja.");

  const db = getDb();
  await db.batch([
    db.insert(orders).values({ id, ...h, status, total, isPaid, paidAt: isPaid ? h.orderDate : null }),
    db.insert(orderItems).values(rows),
  ]);
  refreshAdmin();
  redirect(`/admin/pesanan/${id}`);
}

/** Ubah data pelanggan, tanggal, diskon, ongkir, catatan. Item tidak diubah supaya snapshot HPP tetap. */
export async function updateOrder(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const header = headerSchema.safeParse(Object.fromEntries(formData));
  if (!header.success) return invalid(header.error);
  const db = getDb();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  if (items.length === 0) return fail("Pesanan tidak ditemukan.");
  const h = header.data;
  const total = orderTotal(itemsSubtotal(items), h.discount, h.shippingFee);
  if (total < 0) return fail("Diskon lebih besar dari total belanja.");
  await db.update(orders).set({ ...h, total }).where(eq(orders.id, id));
  refreshAdmin();
  return ok;
}

export async function setOrderStatus(id: string, status: OrderStatus): Promise<ActionState> {
  await requireAdmin();
  if (!ORDER_STATUSES.includes(status)) return fail("Status tidak dikenal.");
  await getDb().update(orders).set({ status }).where(eq(orders.id, id));
  refreshAdmin();
  return ok;
}

export async function setOrderPaid(id: string, isPaid: boolean): Promise<ActionState> {
  await requireAdmin();
  await getDb().update(orders).set({ isPaid, paidAt: isPaid ? todayWIB() : null }).where(eq(orders.id, id));
  refreshAdmin();
  return ok;
}

export async function deleteOrder(id: string): Promise<ActionState> {
  await requireAdmin();
  await getDb().delete(orders).where(eq(orders.id, id));
  refreshAdmin();
  redirect("/admin/pesanan");
}
