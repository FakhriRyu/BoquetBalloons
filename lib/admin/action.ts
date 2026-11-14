import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { parseRupiah } from "@/lib/format";

/** Hasil Server Action untuk form admin. */
export type ActionState = { ok?: boolean; error?: string };

export const ok: ActionState = { ok: true };
export const fail = (error: string): ActionState => ({ error });

/** Ambil pesan pertama dari kegagalan validasi zod. */
export const invalid = (e: z.ZodError): ActionState => fail(e.issues[0]?.message ?? "Data tidak valid.");

/** Segarkan halaman toko (statis) dan semua halaman admin setelah data berubah. */
export function refresh() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}

// ---- potongan skema yang dipakai berulang ----

export const requiredText = (label: string, max = 80) =>
  z.string({ error: `${label} wajib diisi.` }).trim().min(1, `${label} wajib diisi.`).max(max, `${label} maksimal ${max} karakter.`);

export const optionalText = (label: string, max = 200) =>
  z.string().trim().max(max, `${label} maksimal ${max} karakter.`).default("");

/** Menerima "5000", "5.000", "Rp 5.000". */
export const rupiah = (label: string, max = 100_000_000) =>
  z.preprocess(
    parseRupiah,
    z.number({ error: `${label} harus berupa angka.` }).int().min(0).max(max, `${label} terlalu besar.`),
  );

/** String kosong dari <select>/<input> opsional menjadi null. */
export const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);
