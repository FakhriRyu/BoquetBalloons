import Link from "next/link";
import { ActionForm, ConfirmButton, SubmitButton } from "@/components/admin/forms";
import { Card, inputBase, inputClass } from "@/components/admin/ui";
import type { schema } from "@/db";
import { formatRupiahPrecise } from "@/lib/format";
import { unitCost, type CostTable } from "@/lib/hpp";
import { addRecipeItem, deleteRecipeItem, updateRecipeQty } from "./actions";

type FlowerTypeRow = typeof schema.flowerTypes.$inferSelect;
type MaterialRow = typeof schema.materials.$inferSelect;
type RecipeRow = typeof schema.recipeItems.$inferSelect;

function RecipeCard({
  title,
  subtitle,
  total,
  scope,
  flowerTypeId,
  lines,
  materials,
}: {
  title: string;
  subtitle: string;
  total: number;
  scope: RecipeRow["scope"];
  flowerTypeId: string | null;
  lines: RecipeRow[];
  materials: MaterialRow[];
}) {
  const byId = new Map(materials.map((m) => [m.id, m]));
  const usable = materials.filter((m) => m.isActive);

  return (
    <Card>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h2 className="text-xl font-extrabold text-brand-deep">{title}</h2>
        <p className="font-display text-lg font-extrabold text-peach-deep">{formatRupiahPrecise(total)}</p>
      </div>
      <p className="text-sm font-semibold text-brand-dark">{subtitle}</p>

      <ul className="mt-3 divide-y-2 divide-sky-pale">
        {lines.map((r) => {
          const m = byId.get(r.materialId);
          const cost = m ? unitCost(m) * r.qty : 0;
          return (
            <li key={r.id} className="py-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate font-bold text-brand-deep">{m?.name ?? "Bahan terhapus"}</span>
                <span className="shrink-0 text-sm font-extrabold text-brand-deep">{formatRupiahPrecise(cost)}</span>
              </div>
              <div className="mt-1 flex flex-wrap items-start gap-2">
                <ActionForm action={updateRecipeQty} successText="" className="flex items-center gap-2">
                  <input type="hidden" name="id" value={r.id} />
                  <label className="sr-only" htmlFor={`qty-${r.id}`}>Jumlah {m?.name}</label>
                  <input id={`qty-${r.id}`} name="qty" inputMode="decimal" defaultValue={r.qty} className={`${inputBase} w-20 text-right`} />
                  <span className="text-sm font-semibold text-brand-dark">{m?.unit}</span>
                  <SubmitButton className="px-3 text-sm">Ubah</SubmitButton>
                </ActionForm>
                <span className="ml-auto">
                  <ConfirmButton action={deleteRecipeItem.bind(null, r.id)} confirmText="Yakin?">Hapus</ConfirmButton>
                </span>
              </div>
            </li>
          );
        })}
        {lines.length === 0 && <li className="py-2 text-sm font-semibold text-brand-dark">Belum ada bahan di resep ini.</li>}
      </ul>

      {usable.length > 0 ? (
        <ActionForm action={addRecipeItem} resetOnSuccess successText="Bahan ditambahkan ke resep" className="mt-3 rounded-xl bg-sky-pale p-3">
          <input type="hidden" name="scope" value={scope} />
          {flowerTypeId && <input type="hidden" name="flowerTypeId" value={flowerTypeId} />}
          <div className="flex flex-wrap items-end gap-2">
            <label className="min-w-40 flex-1">
              <span className="mb-1 block text-sm font-bold text-brand-deep">Tambah bahan</span>
              <select name="materialId" required defaultValue="" className={inputClass}>
                <option value="" disabled>Pilih bahan…</option>
                {usable.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>
                ))}
              </select>
            </label>
            <label className="w-24">
              <span className="mb-1 block text-sm font-bold text-brand-deep">Jumlah</span>
              <input name="qty" required inputMode="decimal" placeholder="1" className={inputClass} />
            </label>
            <SubmitButton>Tambah</SubmitButton>
          </div>
        </ActionForm>
      ) : null}
    </Card>
  );
}

export default function RecipeTab({
  types,
  materials,
  recipe,
  table,
}: {
  types: FlowerTypeRow[];
  materials: MaterialRow[];
  recipe: RecipeRow[];
  table: CostTable;
}) {
  if (materials.length === 0) {
    return (
      <Card>
        <p className="font-semibold text-brand-dark">
          Isi dulu daftar bahan baku di tab{" "}
          <Link href="/admin/hpp?tab=bahan" className="font-extrabold text-brand underline">Bahan baku</Link>, lalu susun resepnya di sini.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {types.map((t) => (
        <RecipeCard
          key={t.id}
          title={t.name}
          subtitle="Bahan untuk membuat satu tangkai."
          total={table.stemCost(t.id)}
          scope="stem"
          flowerTypeId={t.id}
          lines={recipe.filter((r) => r.scope === "stem" && r.flowerTypeId === t.id)}
          materials={materials}
        />
      ))}
      <RecipeCard
        title="Kemasan per buket"
        subtitle="Dipakai sekali per buket berapa pun jumlah tangkainya: plastik, pita, kartu ucapan, dll."
        total={table.bouquetCost}
        scope="bouquet"
        flowerTypeId={null}
        lines={recipe.filter((r) => r.scope === "bouquet")}
        materials={materials}
      />
    </div>
  );
}
