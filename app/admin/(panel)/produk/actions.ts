"use server";

import { count, eq, max } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { emptyToNull, fail, invalid, ok, optionalText, refresh, requiredText, rupiah, type ActionState } from "@/lib/admin/action";
import { requireAdmin } from "@/lib/auth/dal";
import { isHex, isLightHex } from "@/lib/format";

const { flowerTypes, colors, products, settings, orderItems } = schema;

const optionalId = z.preprocess(emptyToNull, z.string().nullable().default(null));

// ---------- Jenis bunga ----------

const flowerTypeSchema = z.object({
  id: optionalId,
  name: requiredText("Nama", 60),
  description: optionalText("Deskripsi", 120),
  pricePerStem: rupiah("Harga per tangkai"),
  petalStyle: z.enum(schema.petalStyle.enumValues, { error: "Pilih bentuk kelopak." }),
  palette: z.enum(schema.palette.enumValues, { error: "Pilih palet warna." }),
});

export async function saveFlowerType(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = flowerTypeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  const { id, ...values } = parsed.data;
  const db = getDb();

  if (id) {
    await db.update(flowerTypes).set(values).where(eq(flowerTypes.id, id));
  } else {
    const [{ last }] = await db.select({ last: max(flowerTypes.sortOrder) }).from(flowerTypes);
    await db.insert(flowerTypes).values({ id: crypto.randomUUID(), ...values, sortOrder: (last ?? -1) + 1 });
  }
  refresh();
  return ok;
}

export async function setFlowerTypeActive(id: string, isActive: boolean): Promise<ActionState> {
  await requireAdmin();
  await getDb().update(flowerTypes).set({ isActive }).where(eq(flowerTypes.id, id));
  refresh();
  return ok;
}

export async function deleteFlowerType(id: string): Promise<ActionState> {
  await requireAdmin();
  const db = getDb();
  const [{ used }] = await db.select({ used: count() }).from(orderItems).where(eq(orderItems.flowerTypeId, id));
  if (used > 0) return fail("Jenis bunga ini sudah dipakai di pesanan. Nonaktifkan saja supaya riwayat tetap utuh.");
  await db.delete(flowerTypes).where(eq(flowerTypes.id, id));
  refresh();
  return ok;
}

// ---------- Warna ----------

const colorSchema = z.object({
  id: optionalId,
  group: z.enum(schema.colorGroup.enumValues, { error: "Grup warna tidak dikenal." }),
  name: requiredText("Nama warna", 40),
  hex: z.string().refine(isHex, "Kode warna harus berformat #rrggbb."),
  surcharge: z.preprocess((v) => (v === undefined ? "0" : v), rupiah("Tambahan harga", 1_000_000)),
});

export async function saveColor(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = colorSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  const { id, group, ...rest } = parsed.data;
  // pita gratis: tidak pernah ada tambahan harga
  const values = { ...rest, hex: rest.hex.toLowerCase(), light: isLightHex(rest.hex), surcharge: group === "ribbon" ? 0 : rest.surcharge };
  const db = getDb();

  if (id) {
    await db.update(colors).set(values).where(eq(colors.id, id));
  } else {
    const [{ last }] = await db.select({ last: max(colors.sortOrder) }).from(colors).where(eq(colors.group, group));
    await db.insert(colors).values({ id: crypto.randomUUID(), group, ...values, sortOrder: (last ?? -1) + 1 });
  }
  refresh();
  return ok;
}

export async function setColorReady(id: string, isReady: boolean): Promise<ActionState> {
  await requireAdmin();
  await getDb().update(colors).set({ isReady }).where(eq(colors.id, id));
  refresh();
  return ok;
}

export async function deleteColor(id: string): Promise<ActionState> {
  await requireAdmin();
  await getDb().delete(colors).where(eq(colors.id, id));
  refresh();
  return ok;
}

// ---------- Katalog ----------

const productSchema = z.object({
  id: z.string().min(1),
  name: requiredText("Nama produk", 60),
  tagline: optionalText("Keterangan", 120),
  price: rupiah("Harga"),
  theme: z.enum(schema.productTheme.enumValues, { error: "Pilih warna kartu." }),
  flowerTypeId: z.preprocess(emptyToNull, z.string().nullable()),
  stemCount: z.preprocess(
    emptyToNull,
    z.coerce.number({ error: "Jumlah tangkai harus berupa angka." }).int().min(1, "Jumlah tangkai minimal 1.").max(200).nullable(),
  ),
});

export async function saveProduct(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  const { id, ...values } = parsed.data;
  if (Boolean(values.flowerTypeId) !== Boolean(values.stemCount)) {
    return fail("Untuk HPP, isi jenis bunga dan jumlah tangkai dua-duanya, atau kosongkan dua-duanya.");
  }
  await getDb().update(products).set(values).where(eq(products.id, id));
  refresh();
  return ok;
}

export async function setProductActive(id: string, isActive: boolean): Promise<ActionState> {
  await requireAdmin();
  await getDb().update(products).set({ isActive }).where(eq(products.id, id));
  refresh();
  return ok;
}

// ---------- Pengaturan ----------

const qty = (label: string) => z.coerce.number({ error: `${label} harus berupa angka.` }).int().min(1, `${label} minimal 1.`).max(100, `${label} maksimal 100.`);
const settingsSchema = z
  .object({ minQty: qty("Jumlah minimal"), maxQty: qty("Jumlah maksimal") })
  .refine((v) => v.minQty <= v.maxQty, "Jumlah minimal tidak boleh lebih besar dari jumlah maksimal.");

export async function saveSettings(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  const db = getDb();
  const upsert = (key: string, value: number) =>
    db
      .insert(settings)
      .values({ key, value: String(value) })
      .onConflictDoUpdate({ target: settings.key, set: { value: String(value) } });
  await db.batch([upsert("min_qty", parsed.data.minQty), upsert("max_qty", parsed.data.maxQty)]);
  refresh();
  return ok;
}
