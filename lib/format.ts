// Fungsi murni tanpa dependensi, dipakai toko dan admin. Diuji di lib/format.test.ts.

/** "Rp 12.500" / "12500" / "12,500" -> 12500. Mengembalikan null bila tidak ada angka. */
export function parseRupiah(input: unknown): number | null {
  const digits = String(input ?? "").replace(/\D/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isSafeInteger(n) ? n : null;
}

/** 15000 -> "15K", 12500 -> "12,5K", 800 -> "800" (untuk badge harga) */
export function formatK(n: number): string {
  if (n < 1000) return String(n);
  return `${(Math.round(n / 100) / 10).toLocaleString("id-ID")}K`;
}

const HEX = /^#[0-9a-f]{6}$/i;
export const isHex = (s: string) => HEX.test(s);

/** Warna terang butuh garis kontras di swatch. Ambang dipilih agar cocok dengan data awal toko. */
export function isLightHex(hex: string): boolean {
  if (!isHex(hex)) return false;
  const n = parseInt(hex.slice(1), 16);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return luminance > 0.65;
}
