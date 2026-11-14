"use server";

import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { emptyToNull, fail, invalid, ok, positiveDecimal, refreshAdmin, requiredText, rupiah, type ActionState } from "@/lib/admin/action";
import { requireAdmin } from "@/lib/auth/dal";

const { materials, recipeItems } = schema;

// ---------- Bahan baku ----------

const materialSchema = z.object({
  id: z.preprocess(emptyToNull, z.string().nullable().default(null)),
  name: requiredText("Nama bahan", 60),
  unit: requiredText("Satuan", 20),
  packPrice: rupiah("Harga beli"),
  packQty: positiveDecimal("Isi per kemasan", 1_000_000),
});

export async function saveMaterial(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = materialSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  const { id, ...values } = parsed.data;
  const db = getDb();
  if (id) await db.update(materials).set(values).where(eq(materials.id, id));
  else await db.insert(materials).values({ id: crypto.randomUUID(), ...values });
  refreshAdmin();
  return ok;
}

export async function setMaterialActive(id: string, isActive: boolean): Promise<ActionState> {
  await requireAdmin();
  await getDb().update(materials).set({ isActive }).where(eq(materials.id, id));
  refreshAdmin();
  return ok;
}

export async function deleteMaterial(id: string): Promise<ActionState> {
  await requireAdmin();
  const db = getDb();
  const [{ used }] = await db.select({ used: count() }).from(recipeItems).where(eq(recipeItems.materialId, id));
  if (used > 0) return fail(`Bahan ini masih dipakai di ${used} baris resep. Hapus dari resep dulu, atau nonaktifkan saja.`);
  await db.delete(materials).where(eq(materials.id, id));
  refreshAdmin();
  return ok;
}

// ---------- Resep ----------

const recipeSchema = z
  .object({
    scope: z.enum(schema.recipeScope.enumValues),
    flowerTypeId: z.preprocess(emptyToNull, z.string().nullable().default(null)),
    materialId: z.string({ error: "Pilih bahan." }).min(1, "Pilih bahan."),
    qty: positiveDecimal("Jumlah pemakaian"),
  })
  .refine((v) => (v.scope === "stem") === Boolean(v.flowerTypeId), "Resep per tangkai harus terkait satu jenis bunga.");

export async function addRecipeItem(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = recipeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  await getDb().insert(recipeItems).values({ id: crypto.randomUUID(), ...parsed.data });
  refreshAdmin();
  return ok;
}

const qtySchema = z.object({ id: z.string().min(1), qty: positiveDecimal("Jumlah pemakaian") });

export async function updateRecipeQty(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = qtySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  await getDb().update(recipeItems).set({ qty: parsed.data.qty }).where(eq(recipeItems.id, parsed.data.id));
  refreshAdmin();
  return ok;
}

export async function deleteRecipeItem(id: string): Promise<ActionState> {
  await requireAdmin();
  await getDb().delete(recipeItems).where(eq(recipeItems.id, id));
  refreshAdmin();
  return ok;
}
