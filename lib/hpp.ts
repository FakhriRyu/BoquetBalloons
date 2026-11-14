// Perhitungan HPP (harga pokok) dari bahan baku dan resep. Murni, diuji di lib/hpp.test.ts.

export interface MaterialCost {
  id: string;
  /** harga beli satu kemasan */
  packPrice: number;
  /** isi satu kemasan dalam satuan pakai */
  packQty: number;
}

export interface RecipeLine {
  scope: "stem" | "bouquet";
  flowerTypeId: string | null;
  materialId: string;
  qty: number;
}

/** Harga bahan per satuan pakai (boleh pecahan rupiah). */
export const unitCost = (m: MaterialCost) => (m.packQty > 0 ? m.packPrice / m.packQty : 0);

export interface CostTable {
  /** HPP satu tangkai jenis bunga ini (0 bila resepnya kosong) */
  stemCost(flowerTypeId: string): number;
  /** biaya kemasan yang dipakai sekali per buket */
  bouquetCost: number;
  hasRecipe(flowerTypeId: string): boolean;
}

export function buildCostTable(materials: MaterialCost[], recipe: RecipeLine[]): CostTable {
  const price = new Map(materials.map((m) => [m.id, unitCost(m)]));
  const stem = new Map<string, number>();
  let bouquetCost = 0;
  for (const r of recipe) {
    const cost = (price.get(r.materialId) ?? 0) * r.qty;
    if (r.scope === "bouquet") bouquetCost += cost;
    else if (r.flowerTypeId) stem.set(r.flowerTypeId, (stem.get(r.flowerTypeId) ?? 0) + cost);
  }
  return {
    stemCost: (id) => stem.get(id) ?? 0,
    bouquetCost,
    hasRecipe: (id) => stem.has(id),
  };
}

/** HPP satu buket berisi `stems` tangkai, dibulatkan ke rupiah. */
export const bouquetCost = (t: CostTable, flowerTypeId: string, stems: number) =>
  Math.round(t.stemCost(flowerTypeId) * stems + t.bouquetCost);

/** Margin dalam persen dari harga jual; null bila harga 0. */
export const marginPct = (price: number, cost: number) => (price > 0 ? ((price - cost) / price) * 100 : null);
