import { Plus } from "lucide-react";
import { ActionForm, ConfirmButton, SubmitButton, ToggleButton } from "@/components/admin/forms";
import { Badge, Card, Field, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import type { schema } from "@/db";
import { formatRupiahPrecise } from "@/lib/format";
import { unitCost } from "@/lib/hpp";
import { deleteMaterial, saveMaterial, setMaterialActive } from "./actions";

type MaterialRow = typeof schema.materials.$inferSelect;
type RecipeRow = typeof schema.recipeItems.$inferSelect;

function Fields({ m }: { m?: MaterialRow }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {m && <input type="hidden" name="id" value={m.id} />}
      <Field label="Nama bahan" className="col-span-2">
        <input name="name" required maxLength={60} defaultValue={m?.name} placeholder="Balon pentil 260" className={inputClass} />
      </Field>
      <Field label="Satuan pakai" className="col-span-2">
        <input name="unit" required maxLength={20} defaultValue={m?.unit} placeholder="pcs / meter / lembar" list="unit-suggestions" className={inputClass} />
      </Field>
      <Field label="Harga beli (Rp)" hint="Harga satu kemasan">
        <input name="packPrice" required inputMode="numeric" defaultValue={m?.packPrice} placeholder="25000" className={inputClass} />
      </Field>
      <Field label="Isi per kemasan" hint="Dalam satuan pakai">
        <input name="packQty" required inputMode="decimal" defaultValue={m?.packQty} placeholder="100" className={inputClass} />
      </Field>
    </div>
  );
}

export default function MaterialsTab({ materials, recipe }: { materials: MaterialRow[]; recipe: RecipeRow[] }) {
  const usage = (id: string) => recipe.filter((r) => r.materialId === id).length;

  return (
    <div className="space-y-4">
      <datalist id="unit-suggestions">
        {["pcs", "meter", "lembar", "gram", "roll", "batang"].map((u) => (
          <option key={u} value={u} />
        ))}
      </datalist>

      {materials.length === 0 && (
        <Card>
          <p className="font-semibold text-brand-dark">
            Belum ada bahan baku. Catat bahan yang dipakai membuat bunga (balon, stik, pita, plastik, kartu ucapan), lengkap dengan harga beli dan isi per kemasan.
          </p>
        </Card>
      )}

      {materials.map((m) => {
        const used = usage(m.id);
        return (
          <Card key={m.id} className={m.isActive ? "" : "opacity-75"}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-extrabold text-brand-deep">{m.name}</h2>
                <p className="text-sm font-semibold text-brand-dark">
                  {formatRupiah(m.packPrice)} isi {m.packQty.toLocaleString("id-ID")} {m.unit} ·{" "}
                  <span className="font-extrabold text-peach-deep">{formatRupiahPrecise(unitCost(m))}/{m.unit}</span>
                </p>
                <div className="mt-1">{used > 0 ? <Badge tone="blue">Dipakai di {used} resep</Badge> : <Badge tone="gray">Belum dipakai</Badge>}</div>
              </div>
              <ToggleButton action={setMaterialActive.bind(null, m.id, !m.isActive)} on={m.isActive} onLabel="Aktif" offLabel="Nonaktif" label={m.name} />
            </div>
            <details className="mt-3 border-t-2 border-sky-pale pt-2">
              <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold text-brand hover:text-brand-dark">Ubah harga & detail</summary>
              <ActionForm action={saveMaterial} className="mt-2">
                <Fields m={m} />
                <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                  <SubmitButton />
                  <ConfirmButton action={deleteMaterial.bind(null, m.id)}>Hapus bahan</ConfirmButton>
                </div>
              </ActionForm>
            </details>
          </Card>
        );
      })}

      <Card>
        <details open={materials.length === 0}>
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-display text-lg font-extrabold text-brand-deep">
            <Plus className="h-5 w-5" aria-hidden /> Tambah bahan baku
          </summary>
          <ActionForm action={saveMaterial} resetOnSuccess successText="Bahan ditambahkan" className="mt-3">
            <Fields />
            <SubmitButton className="mt-4">Tambah</SubmitButton>
          </ActionForm>
        </details>
      </Card>
    </div>
  );
}
