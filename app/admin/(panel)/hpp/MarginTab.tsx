import Link from "next/link";
import { Card } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import type { schema } from "@/db";
import { bouquetCost, marginPct, type CostTable } from "@/lib/hpp";

type FlowerTypeRow = typeof schema.flowerTypes.$inferSelect;
type ProductRow = typeof schema.products.$inferSelect;

function Margin({ price, cost }: { price: number; cost: number }) {
  const pct = marginPct(price, cost);
  const tone = pct === null ? "text-brand-dark" : pct < 0 ? "text-peach-deep" : pct < 30 ? "text-[#a87a00]" : "text-leaf-dark";
  return (
    <span className={`font-extrabold ${tone}`}>
      {formatRupiah(price - cost)}
      {pct !== null && <span className="ml-1 text-xs">({pct.toFixed(0)}%)</span>}
    </span>
  );
}

const th = "px-3 py-2 text-left text-xs font-extrabold uppercase tracking-wide text-brand-dark";
const td = "px-3 py-2.5 font-semibold text-brand-deep";

export default function MarginTab({ types, products, table }: { types: FlowerTypeRow[]; products: ProductRow[]; table: CostTable }) {
  const missing = types.filter((t) => !table.hasRecipe(t.id));
  const typeName = new Map(types.map((t) => [t.id, t.name]));
  const priced = products.filter((p) => p.flowerTypeId && p.stemCount);

  return (
    <div className="space-y-4">
      {missing.length > 0 && (
        <p className="rounded-xl bg-peach-soft px-4 py-3 text-sm font-bold text-peach-deep">
          Resep belum diisi untuk: {missing.map((t) => t.name).join(", ")}. HPP-nya masih dihitung Rp 0.{" "}
          <Link href="/admin/hpp?tab=resep" className="underline">Isi resep</Link>
        </p>
      )}

      <Card className="overflow-hidden p-0 sm:p-0">
        <h2 className="px-4 pt-4 text-xl font-extrabold text-brand-deep sm:px-5">Per tangkai</h2>
        <div className="overflow-x-auto">
          <table className="mt-2 w-full min-w-[28rem]">
            <thead className="bg-sky-pale">
              <tr><th className={th}>Jenis</th><th className={th}>Harga</th><th className={th}>HPP</th><th className={th}>Margin</th></tr>
            </thead>
            <tbody className="divide-y-2 divide-sky-pale">
              {types.map((t) => {
                const cost = Math.round(table.stemCost(t.id));
                return (
                  <tr key={t.id}>
                    <td className={td}>{t.name}{!t.isActive && <span className="ml-1 text-xs text-brand-dark">(nonaktif)</span>}</td>
                    <td className={td}>{formatRupiah(t.pricePerStem)}</td>
                    <td className={td}>{formatRupiah(cost)}</td>
                    <td className={td}><Margin price={t.pricePerStem} cost={cost} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="px-4 py-3 text-xs font-semibold text-brand-dark sm:px-5">
          Belum termasuk kemasan per buket ({formatRupiah(Math.round(table.bouquetCost))}), yang dihitung sekali per pesanan buket.
        </p>
      </Card>

      <Card className="overflow-hidden p-0 sm:p-0">
        <h2 className="px-4 pt-4 text-xl font-extrabold text-brand-deep sm:px-5">Produk katalog</h2>
        {priced.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="mt-2 w-full min-w-[28rem]">
              <thead className="bg-sky-pale">
                <tr><th className={th}>Produk</th><th className={th}>Harga</th><th className={th}>HPP</th><th className={th}>Margin</th></tr>
              </thead>
              <tbody className="divide-y-2 divide-sky-pale">
                {priced.map((p) => {
                  const cost = bouquetCost(table, p.flowerTypeId!, p.stemCount!);
                  return (
                    <tr key={p.id}>
                      <td className={td}>
                        {p.name}
                        <span className="block text-xs text-brand-dark">{p.stemCount} × {typeName.get(p.flowerTypeId!)} + kemasan</span>
                      </td>
                      <td className={td}>{formatRupiah(p.price)}</td>
                      <td className={td}>{formatRupiah(cost)}</td>
                      <td className={td}><Margin price={p.price} cost={cost} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-4 pb-4 pt-1 text-sm font-semibold text-brand-dark sm:px-5">
            Isi jenis bunga dan jumlah tangkai tiap produk di{" "}
            <Link href="/admin/produk?tab=katalog" className="font-extrabold text-brand underline">Produk → Katalog</Link> supaya HPP-nya bisa dihitung.
          </p>
        )}
      </Card>
    </div>
  );
}
