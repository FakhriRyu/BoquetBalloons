import { asc } from "drizzle-orm";
import { PageHeader, Tabs } from "@/components/admin/ui";
import { getDb, schema } from "@/db";
import { loadCostTable } from "@/lib/admin/costs";
import { requireAdmin } from "@/lib/auth/dal";
import MarginTab from "./MarginTab";
import MaterialsTab from "./MaterialsTab";
import RecipeTab from "./RecipeTab";

export const metadata = { title: "HPP" };

const TABS = [
  { id: "bahan", label: "Bahan baku" },
  { id: "resep", label: "Resep" },
  { id: "margin", label: "Margin" },
];

export default async function HppPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const { tab } = await searchParams;
  const current = TABS.some((t) => t.id === tab) ? tab! : "bahan";

  const db = getDb();
  const [{ table, materials, recipe }, types, products] = await Promise.all([
    loadCostTable(),
    db.select().from(schema.flowerTypes).orderBy(asc(schema.flowerTypes.sortOrder), asc(schema.flowerTypes.createdAt)),
    db.select().from(schema.products).orderBy(asc(schema.products.sortOrder), asc(schema.products.createdAt)),
  ]);
  materials.sort((a, b) => a.name.localeCompare(b.name, "id"));

  return (
    <>
      <PageHeader title="HPP" description="Harga pokok dihitung dari harga bahan dan resep. Ubah harga bahan, HPP ikut berubah." />
      <Tabs tabs={TABS} current={current} basePath="/admin/hpp" />
      {current === "bahan" && <MaterialsTab materials={materials} recipe={recipe} />}
      {current === "resep" && <RecipeTab types={types} materials={materials} recipe={recipe} table={table} />}
      {current === "margin" && <MarginTab types={types} products={products} table={table} />}
    </>
  );
}
