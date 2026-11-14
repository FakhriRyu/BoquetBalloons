import assert from "node:assert/strict";
import { test } from "node:test";
import { CHROME_PETALS, PASTEL_PETALS, RIBBON_COLORS, STEM_COLORS, FLOWER_TYPES, calcTotal } from "../data/builder.ts";
import { formatK, isLightHex, parseRupiah } from "./format.ts";

test("parseRupiah menerima berbagai cara mengetik harga", () => {
  assert.equal(parseRupiah("5000"), 5000);
  assert.equal(parseRupiah("Rp 12.500"), 12500);
  assert.equal(parseRupiah("12,500"), 12500);
  assert.equal(parseRupiah("0"), 0);
  assert.equal(parseRupiah(""), null);
  assert.equal(parseRupiah("abc"), null);
  assert.equal(parseRupiah(undefined), null);
});

test("formatK untuk badge harga", () => {
  assert.equal(formatK(15000), "15K");
  assert.equal(formatK(12500), "12,5K");
  assert.equal(formatK(5000), "5K");
  assert.equal(formatK(800), "800");
});

test("isLightHex cocok dengan tanda `light` di data awal", () => {
  for (const c of [...PASTEL_PETALS, ...CHROME_PETALS, ...STEM_COLORS, ...RIBBON_COLORS]) {
    assert.equal(isLightHex(c.hex), c.light ?? false, `${c.name} ${c.hex}`);
  }
  assert.equal(isLightHex("bukan-hex"), false);
});

test("calcTotal menjumlahkan harga tangkai dan surcharge warna", () => {
  const type = FLOWER_TYPES[0];
  const plain = { id: "a", name: "A", hex: "#000000" };
  assert.deepEqual(calcTotal({ type, qty: 3, stem: plain, petal: plain }), {
    perStem: type.pricePerStem,
    flowers: type.pricePerStem * 3,
    total: type.pricePerStem * 3,
  });
  const total = calcTotal({ type, qty: 2, stem: { ...plain, surcharge: 2000 }, petal: { ...plain, surcharge: 500 } });
  assert.equal(total.perStem, type.pricePerStem + 2500);
  assert.equal(total.total, (type.pricePerStem + 2500) * 2);
});
