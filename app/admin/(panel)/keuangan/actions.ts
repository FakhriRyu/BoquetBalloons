"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { invalid, ok, optionalText, refreshAdmin, requiredText, rupiah, type ActionState } from "@/lib/admin/action";
import { requireAdmin } from "@/lib/auth/dal";
import { isIsoDate } from "@/lib/dates";

const txnSchema = z.object({
  date: z.string({ error: "Tanggal wajib diisi." }).refine(isIsoDate, "Tanggal tidak valid."),
  type: z.enum(schema.transactionType.enumValues, { error: "Pilih masuk atau keluar." }),
  category: requiredText("Kategori", 40),
  amount: rupiah("Jumlah").pipe(z.number().min(1, "Jumlah harus lebih dari 0.")),
  note: optionalText("Catatan", 200),
});

export async function addTransaction(formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = txnSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error);
  await getDb().insert(schema.transactions).values({ id: crypto.randomUUID(), ...parsed.data });
  refreshAdmin();
  return ok;
}

export async function deleteTransaction(id: string): Promise<ActionState> {
  await requireAdmin();
  await getDb().delete(schema.transactions).where(eq(schema.transactions.id, id));
  refreshAdmin();
  return ok;
}
