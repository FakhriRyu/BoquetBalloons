import { Plus } from "lucide-react";
import { ActionForm, ConfirmButton, SubmitButton, ToggleButton } from "@/components/admin/forms";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import type { schema } from "@/db";
import { deleteFlowerType, saveFlowerType, setFlowerTypeActive } from "./actions";

type FlowerTypeRow = typeof schema.flowerTypes.$inferSelect;

const STYLE_LABEL = { simple: "Simple (garis lurus)", curly: "Keriting (garis lengkung)", plain: "Polos" } as const;
const PALETTE_LABEL = { pastel: "Pastel", chrome: "Chrome (metalik)" } as const;

function Fields({ type }: { type?: FlowerTypeRow }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {type && <input type="hidden" name="id" value={type.id} />}
      <Field label="Nama">
        <input name="name" required maxLength={60} defaultValue={type?.name} className={inputClass} />
      </Field>
      <Field label="Harga per tangkai (Rp)">
        <input name="pricePerStem" required inputMode="numeric" defaultValue={type?.pricePerStem} placeholder="5000" className={inputClass} />
      </Field>
      <Field label="Deskripsi singkat" className="sm:col-span-2">
        <input name="description" maxLength={120} defaultValue={type?.description} placeholder="Manis & ringan" className={inputClass} />
      </Field>
      <Field label="Bentuk kelopak" hint="Menentukan gambar di pratinjau perakit.">
        <select name="petalStyle" defaultValue={type?.petalStyle ?? "simple"} className={inputClass}>
          {Object.entries(STYLE_LABEL).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </Field>
      <Field label="Palet warna kelopak" hint="Menentukan daftar warna kelopak yang ditawarkan.">
        <select name="palette" defaultValue={type?.palette ?? "pastel"} className={inputClass}>
          {Object.entries(PALETTE_LABEL).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </Field>
    </div>
  );
}

export default function FlowerTypesTab({ types }: { types: FlowerTypeRow[] }) {
  return (
    <div className="space-y-4">
      {types.length === 0 && <Card><p className="font-semibold text-brand-dark">Belum ada jenis bunga. Tambahkan di bawah.</p></Card>}

      {types.map((t) => (
        <Card key={t.id} className={t.isActive ? "" : "opacity-75"}>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-xl font-extrabold text-brand-deep">{t.name}</h2>
              <p className="text-sm font-bold text-peach-deep">{formatRupiah(t.pricePerStem)}/tangkai · {PALETTE_LABEL[t.palette]}</p>
            </div>
            <ToggleButton action={setFlowerTypeActive.bind(null, t.id, !t.isActive)} on={t.isActive} onLabel="Aktif" offLabel="Nonaktif" label={t.name} />
          </div>
          <details className="mt-3 border-t-2 border-sky-pale pt-3">
            <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold text-brand hover:text-brand-dark">Ubah harga & detail</summary>
            <ActionForm action={saveFlowerType} className="mt-3">
              <Fields type={t} />
              <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                <SubmitButton />
                <ConfirmButton action={deleteFlowerType.bind(null, t.id)}>Hapus jenis bunga</ConfirmButton>
              </div>
            </ActionForm>
          </details>
        </Card>
      ))}

      <Card>
        <details>
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-display text-lg font-extrabold text-brand-deep">
            <Plus className="h-5 w-5" aria-hidden /> Tambah jenis bunga
          </summary>
          <ActionForm action={saveFlowerType} resetOnSuccess successText="Jenis bunga ditambahkan" className="mt-3">
            <Fields />
            <SubmitButton className="mt-4">Tambah</SubmitButton>
          </ActionForm>
        </details>
      </Card>
    </div>
  );
}
