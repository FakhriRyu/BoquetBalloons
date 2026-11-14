import { defineConfig } from "drizzle-kit";

// Jalankan lewat `npm run db:*` supaya .env.local ikut dimuat.
// Migrasi memakai koneksi langsung (unpooled) bila tersedia.
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "",
  },
});
