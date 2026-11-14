import { ActionForm, SubmitButton } from "@/components/admin/forms";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { MAX_QTY, MIN_QTY } from "@/data/builder";
import type { schema } from "@/db";
import { saveSettings } from "./actions";

type SettingRow = typeof schema.settings.$inferSelect;

export default function SettingsTab({ settings }: { settings: SettingRow[] }) {
  const get = (key: string, fallback: number) => settings.find((s) => s.key === key)?.value ?? String(fallback);

  return (
    <Card>
      <h2 className="text-xl font-extrabold text-brand-deep">Jumlah tangkai di perakit</h2>
      <p className="text-sm font-semibold text-brand-dark">Batas jumlah tangkai yang bisa dipilih pelanggan saat merakit bunga.</p>
      <ActionForm action={saveSettings} className="mt-4">
        <div className="grid max-w-md grid-cols-2 gap-4">
          <Field label="Minimal">
            <input name="minQty" required inputMode="numeric" defaultValue={get("min_qty", MIN_QTY)} className={inputClass} />
          </Field>
          <Field label="Maksimal">
            <input name="maxQty" required inputMode="numeric" defaultValue={get("max_qty", MAX_QTY)} className={inputClass} />
          </Field>
        </div>
        <SubmitButton className="mt-4" />
      </ActionForm>
    </Card>
  );
}
