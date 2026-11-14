import assert from "node:assert/strict";
import { test } from "node:test";
import { itemsCost, itemsSubtotal, orderNo, orderProfit, orderTotal, waNumber } from "./orders.ts";

const lines = [
  { qty: 5, unitPrice: 20000, unitCost: 2500, extraCost: 1000 }, // buket 5 tangkai + kemasan
  { qty: 2, unitPrice: 15000, unitCost: 4000, extraCost: 0 }, // 2 produk katalog
];

test("subtotal, HPP, total, dan laba pesanan", () => {
  assert.equal(itemsSubtotal(lines), 130000);
  assert.equal(itemsCost(lines), 5 * 2500 + 1000 + 2 * 4000);
  const total = orderTotal(130000, 10000, 15000);
  assert.equal(total, 135000);
  assert.equal(orderProfit({ total, shippingFee: 15000 }, itemsCost(lines)), 120000 - 21500);
});

test("orderNo diberi nol di depan", () => {
  assert.equal(orderNo(12), "#0012");
  assert.equal(orderNo(12345), "#12345");
});

test("waNumber menormalkan nomor Indonesia", () => {
  assert.equal(waNumber("0812-3456-7890"), "6281234567890");
  assert.equal(waNumber("+62 812 3456 7890"), "6281234567890");
  assert.equal(waNumber("123"), null);
  assert.equal(waNumber(""), null);
});
