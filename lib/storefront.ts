import "server-only";
import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { getDb, hasDatabase, schema } from "@/db";
import {
  CHROME_PETALS,
  FLOWER_TYPES,
  MAX_QTY,
  MIN_QTY,
  PASTEL_PETALS,
  RIBBON_COLORS,
  STEM_COLORS,
  type ColorOption,
  type FlowerType,
} from "@/data/builder";
import { PRODUCTS, type Product } from "@/data/products";

export interface Storefront {
  flowerTypes: FlowerType[];
  pastelPetals: ColorOption[];
  chromePetals: ColorOption[];
  stemColors: ColorOption[];
  ribbonColors: ColorOption[];
  products: Product[];
  minQty: number;
  maxQty: number;
}

const FALLBACK: Storefront = {
  flowerTypes: FLOWER_TYPES,
  pastelPetals: PASTEL_PETALS,
  chromePetals: CHROME_PETALS,
  stemColors: STEM_COLORS,
  ribbonColors: RIBBON_COLORS,
  products: PRODUCTS,
  minQty: MIN_QTY,
  maxQty: MAX_QTY,
};

/**
 * Data yang tampil ke pelanggan: hanya jenis bunga aktif, warna ready, dan produk yang ditampilkan.
 * Tanpa DATABASE_URL (pengembangan lokal sebelum database dihubungkan) memakai data awal di data/.
 */
export const getStorefront = cache(async (): Promise<Storefront> => {
  if (!hasDatabase()) return FALLBACK;

  const db = getDb();
  const { flowerTypes, colors, products, settings } = schema;
  const [typeRows, colorRows, productRows, settingRows] = await Promise.all([
    db.select().from(flowerTypes).where(eq(flowerTypes.isActive, true)).orderBy(asc(flowerTypes.sortOrder), asc(flowerTypes.createdAt)),
    db.select().from(colors).where(eq(colors.isReady, true)).orderBy(asc(colors.sortOrder), asc(colors.createdAt)),
    db.select().from(products).where(eq(products.isActive, true)).orderBy(asc(products.sortOrder), asc(products.createdAt)),
    db.select().from(settings),
  ]);

  const group = (g: (typeof colorRows)[number]["group"]): ColorOption[] =>
    colorRows
      .filter((c) => c.group === g)
      .map((c) => ({ id: c.id, name: c.name, hex: c.hex, light: c.light, surcharge: c.surcharge }));
  const pastelPetals = group("petal_pastel");
  const chromePetals = group("petal_chrome");

  const setting = (key: string, fallback: number) => {
    const n = Number(settingRows.find((s) => s.key === key)?.value);
    return Number.isInteger(n) && n > 0 ? n : fallback;
  };
  const minQty = setting("min_qty", MIN_QTY);

  return {
    flowerTypes: typeRows
      .map((t) => ({
        id: t.id,
        name: t.name,
        desc: t.description,
        pricePerStem: t.pricePerStem,
        style: t.petalStyle,
        chrome: t.palette === "chrome",
      }))
      // jenis bunga yang semua warna kelopaknya habis tidak bisa dirakit, jadi tidak ditawarkan
      .filter((t) => (t.chrome ? chromePetals : pastelPetals).length > 0),
    pastelPetals,
    chromePetals,
    stemColors: group("stem"),
    ribbonColors: group("ribbon"),
    products: productRows.map((p) => ({ id: p.id, name: p.name, tagline: p.tagline, price: p.price, image: p.image, theme: p.theme })),
    minQty,
    maxQty: Math.max(minQty, setting("max_qty", MAX_QTY)),
  };
});

export const canBuildBouquet = (s: Storefront) => s.flowerTypes.length > 0 && s.stemColors.length > 0 && s.ribbonColors.length > 0;
