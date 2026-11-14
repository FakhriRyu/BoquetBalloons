// Ringkasan keuangan bulanan. Murni, diuji di lib/finance.test.ts.
import { itemsCost, orderProfit, type PricedLine } from "./orders.ts";

export interface PaidOrder {
  total: number;
  shippingFee: number;
  items: Pick<PricedLine, "qty" | "unitCost" | "extraCost">[];
}

export interface Txn {
  type: "masuk" | "keluar";
  amount: number;
}

export interface MonthSummary {
  /** pesanan yang lunas di bulan ini */
  orderIncome: number;
  otherIncome: number;
  expense: number;
  /** arus kas bersih: semua masuk dikurangi semua keluar */
  net: number;
  /** laba kotor perkiraan dari pesanan lunas (harga jual - HPP). Bukan bagian dari arus kas. */
  grossProfit: number;
  paidOrders: number;
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export function summarize(paidOrders: PaidOrder[], txns: Txn[]): MonthSummary {
  const orderIncome = sum(paidOrders.map((o) => o.total));
  const otherIncome = sum(txns.filter((t) => t.type === "masuk").map((t) => t.amount));
  const expense = sum(txns.filter((t) => t.type === "keluar").map((t) => t.amount));
  return {
    orderIncome,
    otherIncome,
    expense,
    net: orderIncome + otherIncome - expense,
    grossProfit: sum(paidOrders.map((o) => orderProfit(o, itemsCost(o.items)))),
    paidOrders: paidOrders.length,
  };
}
