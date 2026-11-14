import { Plus } from "lucide-react";
import { ActionForm, ConfirmButton, SubmitButton, ToggleButton } from "@/components/admin/forms";
import { Badge, Card, Field, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import type { schema } from "@/db";
import { deleteColor, saveColor, setColorReady } from "./actions";

type ColorRow = typeof schema.colors.$inferSelect;
type Group = ColorRow["group"];

const GROUPS: { id: Group; title: string; note: string; hasSurcharge: boolean }[] = [
  { id: "petal_pastel", title: "Kelopak pastel", note: "Untuk jenis bunga berpalet pastel.", hasSurcharge: true },
  { id: "petal_chrome", title: "Kelopak chrome", note: "Untuk jenis bunga berpalet chrome.", hasSurcharge: true },
  { id: "stem", title: "Tangkai", note: "Berlaku untuk semua jenis bunga.", hasSurcharge: true },
  { id: "ribbon", title: "Pita", note: "Pita gratis, pelanggan tinggal pilih warna.", hasSurcharge: false },
];

function Fields({ group, hasSurcharge, color }: { group: Group; hasSurcharge: boolean; color?: ColorRow }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 sm:grid-cols-[1fr_auto_10rem]">
      {color && <input type="hidden" name="id" value={color.id} />}
      <input type="hidden" name="group" value={group} />
      <Field label="Nama warna">
        <input name="name" required maxLength={40} defaultValue={color?.name} placeholder="Biru Pastel" className={inputClass} />
      </Field>
      <Field label="Warna">
        <input name="hex" type="color" required defaultValue={color?.hex ?? "#a9b9ee"} className="h-11 w-16 cursor-pointer rounded-xl border-2 border-sky-soft bg-white p-1" />
      </Field>
      {hasSurcharge && (
        <Field label="Tambahan harga/tangkai" className="col-span-2 sm:col-span-1">
          <input name="surcharge" inputMode="numeric" defaultValue={color?.surcharge ?? 0} className={inputClass} />
        </Field>
      )}
    </div>
  );
}

export default function ColorsTab({ colors }: { colors: ColorRow[] }) {
  return (
    <div className="space-y-5">
      {GROUPS.map((g) => {
        const list = colors.filter((c) => c.group === g.id);
        const ready = list.filter((c) => c.isReady).length;
        return (
          <Card key={g.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h2 className="text-xl font-extrabold text-brand-deep">{g.title}</h2>
              <p className="text-sm font-bold text-brand-dark">{ready} dari {list.length} ready</p>
            </div>
            <p className="text-sm font-semibold text-brand-dark">{g.note}</p>

            <ul className="mt-3 divide-y-2 divide-sky-pale">
              {list.map((c) => (
                <li key={c.id} className="py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-10 w-10 shrink-0 rounded-full border-2 shadow-soft ${c.light ? "border-brand/40" : "border-white"} ${c.isReady ? "" : "opacity-40"}`}
                      style={{ backgroundColor: c.hex }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`truncate font-bold ${c.isReady ? "text-brand-deep" : "text-brand-dark line-through"}`}>{c.name}</p>
                      {c.surcharge > 0 && <Badge tone="peach">+{formatRupiah(c.surcharge)}/tangkai</Badge>}
                    </div>
                    <ToggleButton action={setColorReady.bind(null, c.id, !c.isReady)} on={c.isReady} onLabel="Ready" offLabel="Habis" label={c.name} />
                  </div>
                  <details className="mt-1">
                    <summary className="inline-flex min-h-9 cursor-pointer items-center text-sm font-bold text-brand hover:text-brand-dark">Ubah</summary>
                    <ActionForm action={saveColor} className="mt-2 rounded-xl bg-sky-pale p-3">
                      <Fields group={g.id} hasSurcharge={g.hasSurcharge} color={c} />
                      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                        <SubmitButton />
                        <ConfirmButton action={deleteColor.bind(null, c.id)}>Hapus warna</ConfirmButton>
                      </div>
                    </ActionForm>
                  </details>
                </li>
              ))}
              {list.length === 0 && <li className="py-3 font-semibold text-brand-dark">Belum ada warna di grup ini.</li>}
            </ul>

            <details className="mt-2 border-t-2 border-sky-pale pt-2">
              <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-bold text-brand-deep">
                <Plus className="h-4 w-4" aria-hidden /> Tambah warna {g.title.toLowerCase()}
              </summary>
              <ActionForm action={saveColor} resetOnSuccess successText="Warna ditambahkan" className="mt-2">
                <Fields group={g.id} hasSurcharge={g.hasSurcharge} />
                <SubmitButton className="mt-3">Tambah</SubmitButton>
              </ActionForm>
            </details>
          </Card>
        );
      })}
    </div>
  );
}
