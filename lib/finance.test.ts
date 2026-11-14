import assert from "node:assert/strict";
import { test } from "node:test";
import { summarize } from "./finance.ts";

test("arus kas dan laba kotor dihitung terpisah", () => {
  const s = summarize(
    [
      { total: 100000, shippingFee: 0, items: [{ qty: 5, unitCost: 3000, extraCost: 2000 }] }, // HPP 17.000
      { total: 60000, shippingFee: 10000, items: [{ qty: 2, unitCost: 5000, extraCost: 0 }] }, // HPP 10.000
    ],
    [
      { type: "keluar", amount: 75000 }, // belanja balon
      { type: "masuk", amount: 20000 },
      { type: "keluar", amount: 5000 },
    ],
  );
  assert.equal(s.orderIncome, 160000);
  assert.equal(s.otherIncome, 20000);
  assert.equal(s.expense, 80000);
  assert.equal(s.net, 100000);
  // belanja bahan tidak ikut mengurangi laba kotor, supaya tidak terhitung dua kali dengan HPP
  assert.equal(s.grossProfit, 100000 - 17000 + (60000 - 10000 - 10000));
  assert.equal(s.paidOrders, 2);
});

test("bulan kosong", () => {
  assert.deepEqual(summarize([], []), { orderIncome: 0, otherIncome: 0, expense: 0, net: 0, grossProfit: 0, paidOrders: 0 });
});
