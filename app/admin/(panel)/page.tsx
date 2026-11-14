import { count } from "drizzle-orm";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { getDb, hasDatabase, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata = { title: "Dashboard" };

type DbStatus =
  | { state: "missing" }
  | { state: "error"; message: string }
  | { state: "ok"; counts: { label: string; n: number }[] };

async function getDbStatus(): Promise<DbStatus> {
  if (!hasDatabase()) return { state: "missing" };
  try {
    const db = getDb();
    const [[types], [colors], [products]] = await Promise.all([
      db.select({ n: count() }).from(schema.flowerTypes),
      db.select({ n: count() }).from(schema.colors),
      db.select({ n: count() }).from(schema.products),
    ]);
    return {
      state: "ok",
      counts: [
        { label: "Jenis bunga", n: types.n },
        { label: "Warna", n: colors.n },
        { label: "Produk katalog", n: products.n },
      ],
    };
  } catch (e) {
    return { state: "error", message: e instanceof Error ? e.message : String(e) };
  }
}

export default async function DashboardPage() {
  await requireAdmin();
  const db = await getDbStatus();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-brand-deep">Dashboard</h1>

      {db.state === "ok" ? (
        <section className="rounded-2xl bg-white p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-bold text-leaf-dark">
            <CheckCircle2 className="h-5 w-5" aria-hidden /> Database terhubung
          </h2>
          <dl className="mt-4 grid grid-cols-3 gap-3">
            {db.counts.map((c) => (
              <div key={c.label} className="rounded-xl bg-sky-pale p-3 text-center">
                <dd className="font-display text-3xl font-extrabold text-brand-deep">{c.n}</dd>
                <dt className="text-sm font-bold text-brand-dark">{c.label}</dt>
              </div>
            ))}
          </dl>
          {db.counts.every((c) => c.n === 0) && (
            <p className="mt-4 text-sm font-semibold text-brand-dark">
              Tabel masih kosong. Jalankan <code className="rounded bg-cream px-1.5 py-0.5">npm run db:seed</code> untuk mengisi data awal.
            </p>
          )}
        </section>
      ) : (
        <section className="rounded-2xl bg-peach-soft p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-peach-deep">
            <TriangleAlert className="h-5 w-5" aria-hidden />
            {db.state === "missing" ? "Database belum terhubung" : "Database tidak bisa dibaca"}
          </h2>
          {db.state === "missing" ? (
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm font-semibold text-brand-deep">
              <li>Buat database Neon di dashboard Vercel (Storage) dan hubungkan ke proyek ini.</li>
              <li>
                Isi <code className="rounded bg-white px-1.5 py-0.5">DATABASE_URL</code> di <code className="rounded bg-white px-1.5 py-0.5">.env.local</code>.
              </li>
              <li>
                Jalankan <code className="rounded bg-white px-1.5 py-0.5">npm run db:migrate</code> lalu{" "}
                <code className="rounded bg-white px-1.5 py-0.5">npm run db:seed</code>.
              </li>
            </ol>
          ) : (
            <>
              <p className="mt-2 text-sm font-semibold text-brand-deep">
                Kemungkinan tabel belum dibuat. Jalankan <code className="rounded bg-white px-1.5 py-0.5">npm run db:migrate</code>.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-white p-3 text-xs text-brand-deep">{db.message}</pre>
            </>
          )}
        </section>
      )}
    </div>
  );
}
