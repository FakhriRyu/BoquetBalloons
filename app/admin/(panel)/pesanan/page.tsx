import Link from "next/link";
import { and, desc, eq, ilike, inArray, or, type SQL } from "drizzle-orm";
import { Plus, Search } from "lucide-react";
import { Badge, Card, PageHeader, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import { getDb, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/dal";
import { formatDate, todayWIB } from "@/lib/dates";
import { ACTIVE_STATUSES, ORDER_STATUSES, STATUS_LABEL, STATUS_TONE, orderNo, type OrderStatus } from "@/lib/orders";

export const metadata = { title: "Pesanan" };

const FILTERS = [{ id: "aktif", label: "Aktif" }, ...ORDER_STATUSES.map((s) => ({ id: s, label: STATUS_LABEL[s] })), { id: "semua", label: "Semua" }];

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const filter = FILTERS.some((f) => f.id === sp.status) ? sp.status! : "aktif";
  const q = (sp.q ?? "").trim().slice(0, 60);
  const { orders } = schema;

  const where: SQL[] = [];
  if (filter === "aktif") where.push(inArray(orders.status, ACTIVE_STATUSES));
  else if (filter !== "semua") where.push(eq(orders.status, filter as OrderStatus));
  if (q) {
    const no = Number(q.replace(/^#/, ""));
    const match = [ilike(orders.customerName, `%${q}%`), ilike(orders.customerPhone, `%${q}%`)];
    if (Number.isInteger(no) && no > 0) match.push(eq(orders.no, no));
    where.push(or(...match)!);
  }

  const rows = await getDb()
    .select()
    .from(orders)
    .where(where.length ? and(...where) : undefined)
    .orderBy(desc(orders.createdAt))
    .limit(100);
  const today = todayWIB();

  const href = (status: string) => `/admin/pesanan?status=${status}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <PageHeader title="Pesanan" />
        <Link href="/admin/pesanan/baru" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-5 font-display font-extrabold text-white hover:bg-brand-dark">
          <Plus className="h-5 w-5" aria-hidden /> Pesanan baru
        </Link>
      </div>

      <form role="search" className="mb-3 flex gap-2">
        <input type="hidden" name="status" value={filter} />
        <label className="sr-only" htmlFor="q">Cari pesanan</label>
        <input id="q" name="q" defaultValue={q} placeholder="Cari nama, no. HP, atau #nomor" className={inputClass} />
        <button type="submit" aria-label="Cari" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-deep text-white">
          <Search className="h-5 w-5" />
        </button>
      </form>

      <nav aria-label="Filter status" className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {FILTERS.map((f) => (
          <Link
            key={f.id}
            href={href(f.id)}
            aria-current={f.id === filter ? "page" : undefined}
            className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-bold ${f.id === filter ? "bg-brand-deep text-white" : "bg-white text-brand-deep hover:bg-sky-soft"}`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <Card>
          <p className="font-semibold text-brand-dark">{q ? `Tidak ada pesanan yang cocok dengan "${q}".` : "Belum ada pesanan di sini."}</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {rows.map((o) => {
            const late = o.pickupDate && o.pickupDate < today && ACTIVE_STATUSES.includes(o.status);
            return (
              <li key={o.id}>
                <Link href={`/admin/pesanan/${o.id}`} className="block rounded-2xl bg-white p-4 shadow-soft transition-colors hover:bg-cream-light">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-brand-dark">{orderNo(o.no)} · {formatDate(o.orderDate)}</p>
                      <p className="truncate text-lg font-extrabold text-brand-deep">{o.customerName}</p>
                    </div>
                    <p className="shrink-0 font-display text-lg font-extrabold text-brand-deep">{formatRupiah(o.total)}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge tone={STATUS_TONE[o.status]}>{STATUS_LABEL[o.status]}</Badge>
                    <Badge tone={o.isPaid ? "green" : "peach"}>{o.isPaid ? "Lunas" : "Belum lunas"}</Badge>
                    {o.pickupDate && (
                      <span className={`text-sm font-bold ${late ? "text-peach-deep" : "text-brand-dark"}`}>
                        Ambil {o.pickupDate === today ? "hari ini" : formatDate(o.pickupDate, { day: "numeric", month: "short" })}
                        {late ? " (lewat)" : ""}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {rows.length === 100 && <p className="mt-3 text-sm font-semibold text-brand-dark">Menampilkan 100 pesanan terbaru. Gunakan pencarian untuk yang lebih lama.</p>}
    </>
  );
}
