"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ActionForm, SubmitButton } from "@/components/admin/forms";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { calcTotal } from "@/data/builder";
import { formatRupiah } from "@/data/products";
import type { ActionState } from "@/lib/admin/action";
import { parseRupiah } from "@/lib/format";
import { ORDER_STATUSES, STATUS_LABEL, itemsCost, itemsSubtotal, orderProfit, orderTotal } from "@/lib/orders";

export interface TypeOpt { id: string; name: string; pricePerStem: number; chrome: boolean; stemCost: number }
export interface ColorOpt { id: string; name: string; hex: string; surcharge: number; group: string; isReady: boolean }
export interface ProductOpt { id: string; name: string; price: number; cost: number }

type Kind = "rakit" | "katalog" | "lain";
interface Line {
  key: string;
  kind: Kind;
  qty: string;
  unitPrice: string;
  flowerTypeId: string;
  petalColorId: string;
  stemColorId: string;
  ribbonColorId: string;
  productId: string;
  description: string;
  unitCost: string;
}

const num = (s: string) => parseRupiah(s) ?? 0;
const intQty = (s: string) => Math.max(0, Math.floor(Number(s) || 0));

export default function OrderForm({
  action,
  types,
  colors,
  products,
  packagingCost,
  today,
}: {
  action: (fd: FormData) => Promise<ActionState>;
  types: TypeOpt[];
  colors: ColorOpt[];
  products: ProductOpt[];
  packagingCost: number;
  today: string;
}) {
  const inGroup = (g: string) => colors.filter((c) => c.group === g);
  const firstReady = (g: string) => (inGroup(g).find((c) => c.isReady) ?? inGroup(g)[0])?.id ?? "";
  const petalGroup = (typeId: string) => (types.find((t) => t.id === typeId)?.chrome ? "petal_chrome" : "petal_pastel");

  /** harga default per tangkai = harga jenis + tambahan warna, sama seperti di toko */
  function rakitPrice(l: Pick<Line, "flowerTypeId" | "petalColorId" | "stemColorId">) {
    const t = types.find((x) => x.id === l.flowerTypeId);
    if (!t) return 0;
    const c = (id: string) => colors.find((x) => x.id === id) ?? { id, name: "", hex: "#000000", surcharge: 0 };
    return calcTotal({ type: { ...t, desc: "", style: "simple" }, qty: 1, petal: c(l.petalColorId), stem: c(l.stemColorId) }).perStem;
  }

  function newLine(kind: Kind): Line {
    const flowerTypeId = types[0]?.id ?? "";
    const base: Line = {
      key: crypto.randomUUID(),
      kind,
      qty: kind === "rakit" ? "5" : "1",
      unitPrice: "",
      flowerTypeId,
      petalColorId: firstReady(petalGroup(flowerTypeId)),
      stemColorId: firstReady("stem"),
      ribbonColorId: firstReady("ribbon"),
      productId: products[0]?.id ?? "",
      description: "",
      unitCost: "0",
    };
    if (kind === "rakit") base.unitPrice = String(rakitPrice(base));
    if (kind === "katalog") base.unitPrice = String(products[0]?.price ?? 0);
    return base;
  }

  const [lines, setLines] = useState<Line[]>(() => [newLine(types.length ? "rakit" : products.length ? "katalog" : "lain")]);
  const [discount, setDiscount] = useState("0");
  const [shipping, setShipping] = useState("0");

  function update(key: string, patch: Partial<Line>) {
    setLines((ls) =>
      ls.map((l) => {
        if (l.key !== key) return l;
        const next = { ...l, ...patch };
        if (next.kind === "rakit" && ("flowerTypeId" in patch || "petalColorId" in patch || "stemColorId" in patch)) {
          // warna kelopak harus mengikuti palet jenis bunga yang dipilih
          const g = petalGroup(next.flowerTypeId);
          if (!colors.some((c) => c.id === next.petalColorId && c.group === g)) next.petalColorId = firstReady(g);
          next.unitPrice = String(rakitPrice(next));
        }
        if (next.kind === "katalog" && "productId" in patch) {
          next.unitPrice = String(products.find((p) => p.id === next.productId)?.price ?? 0);
        }
        return next;
      }),
    );
  }

  const priced = lines.map((l) => {
    const qty = intQty(l.qty);
    const unitPrice = num(l.unitPrice);
    if (l.kind === "rakit") {
      const stemCost = types.find((t) => t.id === l.flowerTypeId)?.stemCost ?? 0;
      return { qty, unitPrice, unitCost: Math.round(stemCost), extraCost: Math.round(packagingCost) };
    }
    if (l.kind === "katalog") return { qty, unitPrice, unitCost: products.find((p) => p.id === l.productId)?.cost ?? 0, extraCost: 0 };
    return { qty, unitPrice, unitCost: num(l.unitCost), extraCost: 0 };
  });
  const subtotal = itemsSubtotal(priced);
  const total = orderTotal(subtotal, num(discount), num(shipping));
  const cost = itemsCost(priced);

  const payload = lines.map((l) => {
    const common = { kind: l.kind, qty: l.qty, unitPrice: l.unitPrice };
    if (l.kind === "rakit") return { ...common, flowerTypeId: l.flowerTypeId, petalColorId: l.petalColorId, stemColorId: l.stemColorId, ribbonColorId: l.ribbonColorId };
    if (l.kind === "katalog") return { ...common, productId: l.productId };
    return { ...common, description: l.description, unitCost: l.unitCost };
  });

  const colorSelect = (label: string, group: string, value: string, onChange: (v: string) => void) => (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {inGroup(group).map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
            {c.surcharge > 0 ? ` (+${formatRupiah(c.surcharge)})` : ""}
            {c.isReady ? "" : " (habis)"}
          </option>
        ))}
      </select>
    </Field>
  );

  return (
    <ActionForm action={action} className="space-y-4">
      <input type="hidden" name="items" value={JSON.stringify(payload)} />

      <Card>
        <h2 className="mb-3 text-xl font-extrabold text-brand-deep">Pelanggan</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nama">
            <input name="customerName" required maxLength={80} autoComplete="off" className={inputClass} />
          </Field>
          <Field label="No. HP / WhatsApp" hint="Opsional">
            <input name="customerPhone" type="tel" maxLength={30} autoComplete="off" placeholder="08xx" className={inputClass} />
          </Field>
          <Field label="Tanggal pesan">
            <input name="orderDate" type="date" required defaultValue={today} className={inputClass} />
          </Field>
          <Field label="Tanggal ambil / kirim" hint="Opsional">
            <input name="pickupDate" type="date" className={inputClass} />
          </Field>
        </div>
      </Card>

      {lines.map((l, i) => {
        const p = priced[i];
        return (
          <Card key={l.key}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-brand-deep">
                Item {i + 1} · {l.kind === "rakit" ? "Rakit bunga" : l.kind === "katalog" ? "Produk katalog" : "Lainnya"}
              </h2>
              {lines.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLines((ls) => ls.filter((x) => x.key !== l.key))}
                  aria-label={`Hapus item ${i + 1}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-peach-deep hover:bg-peach-soft"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {l.kind === "rakit" && (
                <>
                  <Field label="Jenis bunga" className="col-span-2 sm:col-span-1">
                    <select value={l.flowerTypeId} onChange={(e) => update(l.key, { flowerTypeId: e.target.value })} className={inputClass}>
                      {types.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </Field>
                  {colorSelect("Warna kelopak", petalGroup(l.flowerTypeId), l.petalColorId, (v) => update(l.key, { petalColorId: v }))}
                  {colorSelect("Warna tangkai", "stem", l.stemColorId, (v) => update(l.key, { stemColorId: v }))}
                  {colorSelect("Warna pita", "ribbon", l.ribbonColorId, (v) => update(l.key, { ribbonColorId: v }))}
                </>
              )}
              {l.kind === "katalog" && (
                <Field label="Produk" className="col-span-2">
                  <select value={l.productId} onChange={(e) => update(l.key, { productId: e.target.value })} className={inputClass}>
                    {products.map((x) => (
                      <option key={x.id} value={x.id}>{x.name}</option>
                    ))}
                  </select>
                </Field>
              )}
              {l.kind === "lain" && (
                <Field label="Keterangan" className="col-span-2">
                  <input value={l.description} onChange={(e) => update(l.key, { description: e.target.value })} required maxLength={120} placeholder="Mis. boneka wisuda" className={inputClass} />
                </Field>
              )}
              <Field label={l.kind === "rakit" ? "Jumlah tangkai" : "Jumlah"}>
                <input value={l.qty} onChange={(e) => update(l.key, { qty: e.target.value })} required inputMode="numeric" className={inputClass} />
              </Field>
              <Field label={l.kind === "rakit" ? "Harga per tangkai" : "Harga satuan"}>
                <input value={l.unitPrice} onChange={(e) => update(l.key, { unitPrice: e.target.value })} required inputMode="numeric" className={inputClass} />
              </Field>
              {l.kind === "lain" && (
                <Field label="HPP satuan" hint="Modal per unit, kalau ada">
                  <input value={l.unitCost} onChange={(e) => update(l.key, { unitCost: e.target.value })} inputMode="numeric" className={inputClass} />
                </Field>
              )}
            </div>
            <p className="mt-3 flex flex-wrap justify-between gap-2 text-sm font-bold text-brand-dark">
              <span>HPP {formatRupiah(itemsCost([p]))}{l.kind === "rakit" && packagingCost > 0 ? " (termasuk kemasan)" : ""}</span>
              <span className="text-base font-extrabold text-brand-deep">{formatRupiah(itemsSubtotal([p]))}</span>
            </p>
          </Card>
        );
      })}

      <div className="flex flex-wrap gap-2">
        {types.length > 0 && (
          <button type="button" onClick={() => setLines((ls) => [...ls, newLine("rakit")])} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-4 font-bold text-brand-deep shadow-soft hover:bg-sky-soft">
            <Plus className="h-4 w-4" aria-hidden /> Rakit bunga
          </button>
        )}
        {products.length > 0 && (
          <button type="button" onClick={() => setLines((ls) => [...ls, newLine("katalog")])} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-4 font-bold text-brand-deep shadow-soft hover:bg-sky-soft">
            <Plus className="h-4 w-4" aria-hidden /> Produk katalog
          </button>
        )}
        <button type="button" onClick={() => setLines((ls) => [...ls, newLine("lain")])} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-4 font-bold text-brand-deep shadow-soft hover:bg-sky-soft">
          <Plus className="h-4 w-4" aria-hidden /> Lainnya
        </button>
      </div>

      <Card>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Diskon (Rp)">
            <input name="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} inputMode="numeric" className={inputClass} />
          </Field>
          <Field label="Ongkir (Rp)">
            <input name="shippingFee" value={shipping} onChange={(e) => setShipping(e.target.value)} inputMode="numeric" className={inputClass} />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue="baru" className={inputClass}>
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </Field>
          <label className="flex min-h-11 items-center gap-2 self-end font-bold text-brand-deep">
            <input name="isPaid" type="checkbox" className="h-5 w-5 accent-[#4db547]" /> Sudah lunas
          </label>
          <Field label="Catatan" className="col-span-2">
            <textarea name="note" rows={2} maxLength={500} placeholder="Tulisan kartu ucapan, alamat kirim, dll." className={inputClass} />
          </Field>
        </div>

        <dl className="mt-4 space-y-1 rounded-xl bg-cream p-4 font-semibold text-brand-deep">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatRupiah(subtotal)}</dd></div>
          {num(discount) > 0 && <div className="flex justify-between"><dt>Diskon</dt><dd>−{formatRupiah(num(discount))}</dd></div>}
          {num(shipping) > 0 && <div className="flex justify-between"><dt>Ongkir</dt><dd>{formatRupiah(num(shipping))}</dd></div>}
          <div className="flex justify-between border-t-2 border-dashed border-brand/30 pt-2 font-display text-2xl font-extrabold">
            <dt>Total</dt><dd className="text-peach-deep">{formatRupiah(total)}</dd>
          </div>
          <div className="flex justify-between text-sm text-brand-dark"><dt>Perkiraan laba</dt><dd>{formatRupiah(orderProfit({ total, shippingFee: num(shipping) }, cost))}</dd></div>
        </dl>
        <SubmitButton className="mt-4 w-full sm:w-auto">Simpan pesanan</SubmitButton>
      </Card>
    </ActionForm>
  );
}
