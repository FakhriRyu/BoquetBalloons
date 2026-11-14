// Data awal perakit bunga. Setelah database terhubung, data ini hanya dipakai sebagai seed
// (npm run db:seed) dan cadangan saat DATABASE_URL belum diset; harga diubah lewat /admin.

export type PetalStyle = "simple" | "curly" | "plain";

export interface FlowerType {
  id: string;
  name: string;
  desc: string;
  pricePerStem: number;
  /** bentuk garis kelopak di pratinjau */
  style: PetalStyle;
  /** true = memakai palet warna chrome + kilau metalik */
  chrome: boolean;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  /** warna terang butuh kontras garis di swatch */
  light?: boolean;
  /** tambahan harga per tangkai */
  surcharge?: number;
}

export const MIN_QTY = 1;
export const MAX_QTY = 12;

export const FLOWER_TYPES: FlowerType[] = [
  { id: "simple", name: "Kelopak Simple", desc: "Manis & ringan", pricePerStem: 5000, style: "simple", chrome: false },
  { id: "curly", name: "Kelopak Keriting", desc: "Lebih tebal & penuh", pricePerStem: 20000, style: "curly", chrome: false },
  { id: "chrome", name: "Chrome Premium", desc: "Kilau metalik mewah", pricePerStem: 30000, style: "plain", chrome: true },
];

export const PASTEL_PETALS: ColorOption[] = [
  { id: "baby-blue", name: "Biru Pastel", hex: "#a9b9ee" },
  { id: "sky", name: "Biru Langit", hex: "#8fcbe3" },
  { id: "pink", name: "Pink", hex: "#f7b2bd" },
  { id: "peach", name: "Peach", hex: "#f9c6a8" },
  { id: "lilac", name: "Lilac", hex: "#cdb4e6" },
  { id: "butter", name: "Kuning Butter", hex: "#fbe27a", light: true },
  { id: "white", name: "Putih", hex: "#fbfaf6", light: true },
];

export const CHROME_PETALS: ColorOption[] = [
  { id: "copper", name: "Copper", hex: "#c98a64" },
  { id: "rose-gold", name: "Rose Gold", hex: "#e1a091" },
  { id: "gold", name: "Gold", hex: "#e3be5a" },
  { id: "silver", name: "Silver", hex: "#cfd5db", light: true },
  { id: "chrome-teal", name: "Teal", hex: "#4f9f9a" },
  { id: "chrome-blue", name: "Biru Chrome", hex: "#5c8fd0" },
];

export const STEM_COLORS: ColorOption[] = [
  { id: "mint", name: "Hijau Mint", hex: "#d2e8c6", light: true },
  { id: "green", name: "Hijau Daun", hex: "#5cb85a" },
  { id: "white", name: "Putih", hex: "#f6f5ef", light: true },
  { id: "blue", name: "Biru", hex: "#8fb8dd" },
  { id: "pink", name: "Pink", hex: "#f3c1cb" },
  { id: "chrome-teal", name: "Teal Chrome", hex: "#3f8f8a", surcharge: 2000 },
];

// Pita gratis, satu ukuran, tinggal pilih warna.
export const RIBBON_COLORS: ColorOption[] = [
  { id: "pink", name: "Pink", hex: "#f3a6b8" },
  { id: "blue", name: "Biru", hex: "#7fa6e0" },
  { id: "white", name: "Putih", hex: "#fbfaf6", light: true },
  { id: "lilac", name: "Lilac", hex: "#b9a0dc" },
  { id: "butter", name: "Kuning", hex: "#f6d45e", light: true },
  { id: "mint", name: "Hijau Mint", hex: "#9fd6a8" },
  { id: "red", name: "Merah", hex: "#d9546a" },
  { id: "gold", name: "Gold", hex: "#d9b04a" },
];

export function calcTotal(opts: {
  type: FlowerType;
  qty: number;
  stem: ColorOption;
  petal: ColorOption;
}) {
  const perStem = opts.type.pricePerStem + (opts.petal.surcharge ?? 0) + (opts.stem.surcharge ?? 0);
  return { perStem, flowers: perStem * opts.qty, total: perStem * opts.qty };
}
