import "server-only";
import { and, asc, eq, gte, inArray, lt } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { monthRange } from "@/lib/dates";
import { summarize } from "@/lib/finance";

const { orders, orderItems, transactions } = schema;

/** Pesanan lunas dan transaksi di satu bulan ("YYYY-MM"), beserta ringkasannya. */
export async function loadMonth(ym: string) {
  const { start, end } = monthRange(ym);
  const db = getDb();
  const [paid, txns] = await Promise.all([
    db
      .select()
      .from(orders)
      .where(and(eq(orders.isPaid, true), gte(orders.paidAt, start), lt(orders.paidAt, end)))
      .orderBy(asc(orders.paidAt), asc(orders.no)),
    db
      .select()
      .from(transactions)
      .where(and(gte(transactions.date, start), lt(transactions.date, end)))
      .orderBy(asc(transactions.date), asc(transactions.createdAt)),
  ]);
  const items = paid.length
    ? await db.select().from(orderItems).where(inArray(orderItems.orderId, paid.map((o) => o.id)))
    : [];
  const paidOrders = paid.map((o) => ({ ...o, items: items.filter((i) => i.orderId === o.id) }));
  return { paidOrders, txns, summary: summarize(paidOrders, txns) };
}
