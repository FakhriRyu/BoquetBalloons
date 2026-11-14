import "server-only";
import { getDb, schema } from "@/db";
import { buildCostTable } from "@/lib/hpp";

/** Tabel HPP dari isi database saat ini. Bahan nonaktif tetap dihitung: resep yang memakainya masih berlaku. */
export async function loadCostTable() {
  const db = getDb();
  const [materials, recipe] = await Promise.all([db.select().from(schema.materials), db.select().from(schema.recipeItems)]);
  return { table: buildCostTable(materials, recipe), materials, recipe };
}
