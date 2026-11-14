import { asc } from "drizzle-orm";
import { PageHeader } from "@/components/admin/ui";
import { getDb, schema } from "@/db";
import { loadCostTable } from "@/lib/admin/costs";
import { requireAdmin } from "@/lib/auth/dal";
import { todayWIB } from "@/lib/dates";
import { bouquetCost } from "@/lib/hpp";
import { createOrder } from "../actions";
import OrderForm from "./OrderForm";

export const metadata = { title: "Pesanan baru" };

export default async function NewOrderPage() {
  await requireAdmin();
  const db = getDb();
  const { flowerTypes, colors, products } = schema;
  const [{ table }, typeRows, colorRows, productRows] = await Promise.all([
    loadCostTable(),
    db.select().from(flowerTypes).orderBy(asc(flowerTypes.sortOrder), asc(flowerTypes.createdAt)),
    db.select().from(colors).orderBy(asc(colors.sortOrder), asc(colors.createdAt)),
    db.select().from(products).orderBy(asc(products.sortOrder), asc(products.createdAt)),
  ]);

  return (
    <>
      <PageHeader title="Pesanan baru" description="Catat pesanan yang sudah deal di WhatsApp. Harga terisi otomatis dan masih bisa diubah." />
      <OrderForm
        action={createOrder}
        today={todayWIB()}
        packagingCost={table.bouquetCost}
        types={typeRows
          .filter((t) => t.isActive)
          .map((t) => ({ id: t.id, name: t.name, pricePerStem: t.pricePerStem, chrome: t.palette === "chrome", stemCost: table.stemCost(t.id) }))}
        colors={colorRows.map((c) => ({ id: c.id, name: c.name, hex: c.hex, surcharge: c.surcharge, group: c.group, isReady: c.isReady }))}
        products={productRows.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          cost: p.flowerTypeId && p.stemCount ? bouquetCost(table, p.flowerTypeId, p.stemCount) : 0,
        }))}
      />
    </>
  );
}
