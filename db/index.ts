import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL belum diset. Hubungkan database Neon lalu isi .env.local.");
  return drizzle({ client: neon(url), schema });
}

let db: ReturnType<typeof createDb> | undefined;

// Dibuat saat pertama dipakai, bukan saat modul dimuat, supaya `next build` tidak gagal tanpa env.
export function getDb() {
  return (db ??= createDb());
}

export { schema };
