import { formatRupiah } from "@/data/products";

export function Stat({ label, value, tone = "default", hint }: { label: string; value: number; tone?: "default" | "in" | "out" | "net"; hint?: string }) {
  const color = { default: "text-brand-deep", in: "text-leaf-dark", out: "text-peach-deep", net: value < 0 ? "text-peach-deep" : "text-brand-deep" }[tone];
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <dt className="text-sm font-bold text-brand-dark">{label}</dt>
      <dd className={`mt-1 font-display text-2xl font-extrabold ${color}`}>{formatRupiah(value)}</dd>
      {hint && <p className="mt-0.5 text-xs font-semibold text-brand-dark">{hint}</p>}
    </div>
  );
}
