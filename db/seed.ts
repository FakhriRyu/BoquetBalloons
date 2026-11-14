// Mengisi database dengan data awal dari data/builder.ts dan data/products.ts.
// Aman dijalankan berulang: tabel yang sudah berisi dilewati.
// Jalankan: npm run db:seed
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { count } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import {
  CHROME_PETALS,
  FLOWER_TYPES,
  MAX_QTY,
  MIN_QTY,
  PASTEL_PETALS,
  RIBBON_COLORS,
  STEM_COLORS,
  type ColorOption,
} from "../data/builder.ts";
import { PRODUCTS } from "../data/products.ts";
import * as schema from "./schema.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL belum diset. Isi .env.local lalu jalankan lagi: npm run db:seed");
  process.exit(1);
}

const db = drizzle({ client: neon(url) });

async function isEmpty(table: PgTable) {
  const [row] = await db.select({ n: count() }).from(table);
  return row.n === 0;
}

type Group = (typeof schema.colorGroup.enumValues)[number];
const colorRows = (group: Group, list: ColorOption[]) =>
  list.map((c, i) => ({
    id: `${group}-${c.id}`,
    group,
    name: c.name,
    hex: c.hex,
    light: c.light ?? false,
    surcharge: c.surcharge ?? 0,
    sortOrder: i,
  }));

if (await isEmpty(schema.flowerTypes)) {
  await db.insert(schema.flowerTypes).values(
    FLOWER_TYPES.map((t, i) => ({
      id: t.id,
      name: t.name,
      description: t.desc,
      pricePerStem: t.pricePerStem,
      petalStyle: t.style,
      palette: t.chrome ? ("chrome" as const) : ("pastel" as const),
      sortOrder: i,
    })),
  );
  console.log(`+ ${FLOWER_TYPES.length} jenis bunga`);
} else console.log("= jenis bunga sudah ada, dilewati");

if (await isEmpty(schema.colors)) {
  const rows = [
    ...colorRows("petal_pastel", PASTEL_PETALS),
    ...colorRows("petal_chrome", CHROME_PETALS),
    ...colorRows("stem", STEM_COLORS),
    ...colorRows("ribbon", RIBBON_COLORS),
  ];
  await db.insert(schema.colors).values(rows);
  console.log(`+ ${rows.length} warna`);
} else console.log("= warna sudah ada, dilewati");

if (await isEmpty(schema.products)) {
  await db.insert(schema.products).values(
    PRODUCTS.map((p, i) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      price: p.price,
      image: p.image,
      theme: p.theme,
      sortOrder: i,
    })),
  );
  console.log(`+ ${PRODUCTS.length} produk katalog`);
} else console.log("= produk katalog sudah ada, dilewati");

if (await isEmpty(schema.settings)) {
  await db.insert(schema.settings).values([
    { key: "min_qty", value: String(MIN_QTY) },
    { key: "max_qty", value: String(MAX_QTY) },
  ]);
  console.log("+ pengaturan jumlah tangkai");
} else console.log("= pengaturan sudah ada, dilewati");

console.log("Seed selesai.");
