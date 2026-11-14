import Link from "next/link";
import { and, asc, count, eq, inArray, lte, sum } from "drizzle-orm";
import { ArrowRight, Plus, TriangleAlert } from "lucide-react";
import { Stat } from "@/components/admin/Stat";
import { Badge, Card } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import { getDb, hasDatabase, schema } from "@/db";
import { loadMonth } from "@/lib/admin/month";
import { requireAdmin } from "@/lib/auth/dal";
import { addDays, formatDate, formatMonth, todayWIB } from "@/lib/dates";
import { ACTIVE_STATUSES, STATUS_LABEL, STATUS_TONE, orderNo } from "@/lib/orders";

export const metadata = { title: "Dashboard" };

function SetupNotice({ message }: { message?: string }) {
  return (
    <section className="rounded-2xl bg-peach-soft p-5">
      <h2 className="flex items-center gap-2 text-lg font-bold text-peach-deep">
        <TriangleAlert className="h-5 w-5" aria-hidden />
        {message ? "Database tidak bisa dibaca" : "Database belum terhubung"}
      </h2>
      <p className="mt-2 text-sm font-semibold text-brand-deep">
        {message ? "Kemungkinan tabel belum dibuat." : "Isi DATABASE_URL di .env.local."} Jalankan{" "}
        <code className="rounded bg-white px-1.5 py-0.5">npm run db:migrate</code> lalu <code className="rounded bg-white px-1.5 py-0.5">npm run db:seed</code>.
      </p>
      {message && <pre className="mt-3 overflow-x-auto rounded-xl bg-white p-3 text-xs text-brand-deep">{message}</pre>}
    </section>
  );
}

async function loadDashboard() {
  const db = getDb();
  const { orders } = schema;
  const today = todayWIB();
  const tomorrow = addDays(today, 1);
  const [byStatus, upcoming, [unpaid], month] = await Promise.all([
    db.select({ status: orders.status, n: count() }).from(orders).where(inArray(orders.status, ACTIVE_STATUSES)).groupBy(orders.status),
    // termasuk yang tanggal ambilnya sudah lewat tapi belum selesai
    db
      .select()
      .from(orders)
      .where(and(inArray(orders.status, ACTIVE_STATUSES), lte(orders.pickupDate, tomorrow)))
      .orderBy(asc(orders.pickupDate), asc(orders.no)),
    db
      .select({ n: count(), total: sum(orders.total) })
      .from(orders)
      .where(and(eq(orders.isPaid, false), inArray(orders.status, ["baru", "diproses", "siap", "selesai"]))),
    loadMonth(today.slice(0, 7)),
  ]);
  return { today, tomorrow, byStatus, upcoming, unpaid: { n: unpaid.n, total: Number(unpaid.total ?? 0) }, month };
}

export default async function DashboardPage() {
  await requireAdmin();
  if (!hasDatabase()) return <SetupNotice />;

  let data: Awaited<ReturnType<typeof loadDashboard>>;
  try {
    data = await loadDashboard();
  } catch (e) {
    return <SetupNotice message={e instanceof Error ? e.message : String(e)} />;
  }
  const { today, tomorrow, byStatus, upcoming, unpaid, month } = data;
  const countOf = (s: string) => byStatus.find((r) => r.status === s)?.n ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl font-extrabold text-brand-deep">Dashboard</h1>
        <Link href="/admin/pesanan/baru" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 font-display font-extrabold text-white hover:bg-brand-dark">
          <Plus className="h-5 w-5" aria-hidden /> Pesanan baru
        </Link>
      </div>

      <section aria-labelledby="active-heading">
        <h2 id="active-heading" className="mb-2 text-lg font-extrabold text-brand-deep">Pesanan aktif</h2>
        <div className="grid grid-cols-3 gap-3">
          {ACTIVE_STATUSES.map((s) => (
            <Link key={s} href={`/admin/pesanan?status=${s}`} className="rounded-2xl bg-white p-4 text-center shadow-soft hover:bg-cream-light">
              <span className="block font-display text-3xl font-extrabold text-brand-deep">{countOf(s)}</span>
              <span className="text-sm font-bold text-brand-dark">{STATUS_LABEL[s]}</span>
            </Link>
          ))}
        </div>
      </section>

      <Card>
        <h2 className="text-lg font-extrabold text-brand-deep">Diambil hari ini & besok</h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 font-semibold text-brand-dark">Tidak ada pesanan yang perlu diambil hari ini atau besok.</p>
        ) : (
          <ul className="mt-2 divide-y-2 divide-sky-pale">
            {upcoming.map((o) => {
              const when = o.pickupDate === today ? "Hari ini" : o.pickupDate === tomorrow ? "Besok" : `Lewat (${formatDate(o.pickupDate!, { day: "numeric", month: "short" })})`;
              return (
                <li key={o.id}>
                  <Link href={`/admin/pesanan/${o.id}`} className="flex items-center gap-3 py-2.5 hover:bg-cream-light">
                    <span className={`w-24 shrink-0 text-sm font-extrabold ${o.pickupDate! < today ? "text-peach-deep" : "text-brand-dark"}`}>{when}</span>
                    <span className="min-w-0 flex-1 truncate font-bold text-brand-deep">{orderNo(o.no)} {o.customerName}</span>
                    <Badge tone={STATUS_TONE[o.status]}>{STATUS_LABEL[o.status]}</Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {unpaid.n > 0 && (
        <Link href="/admin/pesanan?status=semua" className="flex items-center justify-between gap-3 rounded-2xl bg-peach-soft p-4 font-bold text-peach-deep hover:bg-peach/40">
          <span>{unpaid.n} pesanan belum lunas, total {formatRupiah(unpaid.total)}</span>
          <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
        </Link>
      )}

      <section aria-labelledby="month-heading">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h2 id="month-heading" className="text-lg font-extrabold text-brand-deep">{formatMonth(today.slice(0, 7))}</h2>
          <Link href="/admin/keuangan" className="text-sm font-bold text-brand hover:text-brand-dark">Detail keuangan</Link>
        </div>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Pemasukan" value={month.summary.orderIncome + month.summary.otherIncome} tone="in" hint={`${month.summary.paidOrders} pesanan lunas`} />
          <Stat label="Pengeluaran" value={month.summary.expense} tone="out" />
          <Stat label="Arus kas bersih" value={month.summary.net} tone="net" />
          <Stat label="Laba kotor (perkiraan)" value={month.summary.grossProfit} hint="Harga jual − HPP" />
        </dl>
      </section>
    </div>
  );
}
