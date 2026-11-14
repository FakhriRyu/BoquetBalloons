import Image from "next/image";
import { ActionForm, SubmitButton, ToggleButton } from "@/components/admin/forms";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import type { schema } from "@/db";
import { saveProduct, setProductActive } from "./actions";

type ProductRow = typeof schema.products.$inferSelect;
type FlowerTypeRow = typeof schema.flowerTypes.$inferSelect;

const THEME_LABEL = { blue: "Biru", pink: "Pink", teal: "Teal" } as const;

export default function CatalogTab({ products, types }: { products: ProductRow[]; types: FlowerTypeRow[] }) {
  return (
    <div className="space-y-4">
      {products.map((p) => (
        <Card key={p.id} className={p.isActive ? "" : "opacity-75"}>
          <div className="flex items-center gap-3">
            <Image src={p.image} alt="" width={900} height={1125} sizes="64px" className="h-20 w-16 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-xl font-extrabold text-brand-deep">{p.name}</h2>
              <p className="text-sm font-bold text-peach-deep">{formatRupiah(p.price)}</p>
            </div>
            <ToggleButton action={setProductActive.bind(null, p.id, !p.isActive)} on={p.isActive} onLabel="Tampil" offLabel="Sembunyi" label={p.name} />
          </div>
          <details className="mt-3 border-t-2 border-sky-pale pt-3">
            <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold text-brand hover:text-brand-dark">Ubah harga & detail</summary>
            <ActionForm action={saveProduct} className="mt-3">
              <input type="hidden" name="id" value={p.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nama produk">
                  <input name="name" required maxLength={60} defaultValue={p.name} className={inputClass} />
                </Field>
                <Field label="Harga (Rp)">
                  <input name="price" required inputMode="numeric" defaultValue={p.price} className={inputClass} />
                </Field>
                <Field label="Keterangan" className="sm:col-span-2">
                  <input name="tagline" maxLength={120} defaultValue={p.tagline} className={inputClass} />
                </Field>
                <Field label="Warna kartu">
                  <select name="theme" defaultValue={p.theme} className={inputClass}>
                    {Object.entries(THEME_LABEL).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <fieldset className="mt-4 rounded-xl bg-sky-pale p-3">
                <legend className="px-1 text-sm font-extrabold text-brand-deep">Isi buket (untuk hitung HPP, opsional)</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Jenis bunga">
                    <select name="flowerTypeId" defaultValue={p.flowerTypeId ?? ""} className={inputClass}>
                      <option value="">Belum diisi</option>
                      {types.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Jumlah tangkai">
                    <input name="stemCount" inputMode="numeric" defaultValue={p.stemCount ?? ""} className={inputClass} />
                  </Field>
                </div>
              </fieldset>
              <SubmitButton className="mt-4" />
            </ActionForm>
          </details>
        </Card>
      ))}
      <p className="text-sm font-semibold text-brand-dark">
        Foto katalog masih diatur lewat kode (folder <code className="rounded bg-white px-1.5 py-0.5">public/images</code>), jadi menambah produk baru belum bisa dari sini.
      </p>
    </div>
  );
}
