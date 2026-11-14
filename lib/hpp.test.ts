import assert from "node:assert/strict";
import { test } from "node:test";
import { bouquetCost, buildCostTable, marginPct, unitCost } from "./hpp.ts";

const materials = [
  { id: "balon", packPrice: 25000, packQty: 100 }, // Rp 250/pcs
  { id: "pita", packPrice: 10000, packQty: 25 }, // Rp 400/meter
  { id: "plastik", packPrice: 15000, packQty: 50 }, // Rp 300/lembar
  { id: "rusak", packPrice: 5000, packQty: 0 },
];

test("unitCost membagi harga kemasan dengan isinya", () => {
  assert.equal(unitCost(materials[0]), 250);
  assert.equal(unitCost(materials[1]), 400);
  assert.equal(unitCost(materials[3]), 0, "isi 0 tidak boleh menghasilkan Infinity");
});

test("buildCostTable memisahkan biaya per tangkai dan per buket", () => {
  const t = buildCostTable(materials, [
    { scope: "stem", flowerTypeId: "simple", materialId: "balon", qty: 6 }, // 1500
    { scope: "stem", flowerTypeId: "simple", materialId: "pita", qty: 0.5 }, // 200
    { scope: "stem", flowerTypeId: "curly", materialId: "balon", qty: 10 }, // 2500
    { scope: "bouquet", flowerTypeId: null, materialId: "plastik", qty: 2 }, // 600
    { scope: "bouquet", flowerTypeId: null, materialId: "pita", qty: 1 }, // 400
  ]);
  assert.equal(t.stemCost("simple"), 1700);
  assert.equal(t.stemCost("curly"), 2500);
  assert.equal(t.stemCost("chrome"), 0);
  assert.equal(t.hasRecipe("simple"), true);
  assert.equal(t.hasRecipe("chrome"), false);
  assert.equal(t.bouquetCost, 1000);
  assert.equal(bouquetCost(t, "simple", 5), 1700 * 5 + 1000);
});

test("bahan yang sudah dihapus dihitung 0, bukan error", () => {
  const t = buildCostTable(materials, [{ scope: "stem", flowerTypeId: "simple", materialId: "hilang", qty: 3 }]);
  assert.equal(t.stemCost("simple"), 0);
});

test("bouquetCost dibulatkan ke rupiah", () => {
  const t = buildCostTable([{ id: "x", packPrice: 10000, packQty: 3 }], [{ scope: "stem", flowerTypeId: "a", materialId: "x", qty: 1 }]);
  assert.equal(bouquetCost(t, "a", 1), 3333);
});

test("marginPct", () => {
  assert.equal(marginPct(5000, 1500), 70);
  assert.equal(marginPct(0, 100), null);
  assert.ok(marginPct(1000, 1500)! < 0, "rugi menghasilkan margin negatif");
});
