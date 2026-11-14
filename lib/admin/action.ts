import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { parseDecimal, parseRupiah } from "@/lib/format";

/** Hasil Server Action untuk form admin. */
export type ActionState = { ok?: boolean; error?: string };

export const ok: ActionState = { ok: true };
export const fail = (error: string): ActionState => ({ error });

/** Ambil pesan pertama dari kegagalan validasi zod. */
export const invalid = (e: z.ZodError): ActionState => fail(e.issues[0]?.message ?? "Data tidak valid.");

/** Segarkan halaman toko (statis) dan semua halaman admin setelah data yang tampil ke pelanggan berubah. */
export function refresh() {
  revalidatePath("/");
  refreshAdmin();
}

/** Segarkan halaman admin saja (pesanan, HPP, keuangan tidak tampil di toko). */
export function refreshAdmin() {
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

/** Angka pecahan positif, menerima "1,5" atau "1.5". */
export const positiveDecimal = (label: string, max = 100_000) =>
  z.preprocess(
    parseDecimal,
    z.number({ error: `${label} harus berupa angka.` }).positive(`${label} harus lebih dari 0.`).max(max, `${label} terlalu besar.`),
  );

/** Rupiah opsional: kosong berarti 0. */
export const rupiahOrZero = (label: string, max?: number) =>
  z.preprocess((v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? "0" : v), rupiah(label, max));
