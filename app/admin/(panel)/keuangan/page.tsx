import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { ActionForm, ConfirmButton, SubmitButton } from "@/components/admin/forms";
import { Stat } from "@/components/admin/Stat";
import { Card, Field, PageHeader, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import { loadMonth } from "@/lib/admin/month";
import { requireAdmin } from "@/lib/auth/dal";
import { formatDate, formatMonth, isMonth, shiftMonth, todayWIB } from "@/lib/dates";
import { orderNo } from "@/lib/orders";
import { addTransaction, deleteTransaction } from "./actions";

export const metadata = { title: "Keuangan" };

const CATEGORIES = ["Belanja bahan", "Kemasan", "Transport", "Promosi", "Peralatan", "Penjualan lain", "Modal", "Lainnya"];

type Entry =
  | { kind: "order"; key: string; date: string; label: string; sub: string; amount: number; href: string }
  | { kind: "txn"; key: string; date: string; label: string; sub: string; amount: number; type: "masuk" | "keluar"; id: string };

export default async function KeuanganPage({ searchParams }: { searchParams: Promise<{ bulan?: string }> }) {
  await requireAdmin();
  const today = todayWIB();
  const thisMonth = today.slice(0, 7);
  const { bulan } = await searchParams;
  const ym = bulan && isMonth(bulan) ? bulan : thisMonth;
  const { paidOrders, txns, summary } = await loadMonth(ym);

  const entries: Entry[] = [
    ...paidOrders.map((o) => ({
      kind: "order" as const,
      key: o.id,
      date: o.paidAt!,
      label: `Pesanan ${orderNo(o.no)}`,
      sub: o.customerName,
      amount: o.total,
      href: `/admin/pesanan/${o.id}`,
    })),
    ...txns.map((t) => ({ kind: "txn" as const, key: t.id, id: t.id, date: t.date, label: t.category, sub: t.note, amount: t.amount, type: t.type })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const defaultDate = ym === thisMonth ? today : `${ym}-01`;

  return (
    <>
      <PageHeader title="Keuangan" />

      <nav aria-label="Pilih bulan" className="mb-4 flex items-center justify-between gap-2 rounded-2xl bg-white p-2 shadow-soft">
        <Link href={`/admin/keuangan?bulan=${shiftMonth(ym, -1)}`} aria-label="Bulan sebelumnya" className="flex h-11 w-11 items-center justify-center rounded-xl text-brand-deep hover:bg-sky-pale">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-xl font-extrabold text-brand-deep">{formatMonth(ym)}</span>
        {ym < thisMonth ? (
          <Link href={`/admin/keuangan?bulan=${shiftMonth(ym, 1)}`} aria-label="Bulan berikutnya" className="flex h-11 w-11 items-center justify-center rounded-xl text-brand-deep hover:bg-sky-pale">
            <ChevronRight className="h-5 w-5" />
          </Link>
        ) : (
          <span className="h-11 w-11" aria-hidden />
        )}
      </nav>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Pesanan lunas" value={summary.orderIncome} tone="in" hint={`${summary.paidOrders} pesanan`} />
        <Stat label="Pemasukan lain" value={summary.otherIncome} tone="in" />
        <Stat label="Pengeluaran" value={summary.expense} tone="out" />
        <Stat label="Arus kas bersih" value={summary.net} tone="net" />
      </dl>
      <p className="mt-3 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-brand-dark">
        Perkiraan laba kotor pesanan: <strong className="text-brand-deep">{formatRupiah(summary.grossProfit)}</strong> (harga jual dikurangi HPP).
        Angka ini terpisah dari arus kas: belanja bahan sudah tercatat di pengeluaran, jadi jangan dijumlahkan.
      </p>

      <Card className="mt-4">
        <details>
          <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-display text-lg font-extrabold text-brand-deep">
            <Plus className="h-5 w-5" aria-hidden /> Catat pemasukan / pengeluaran
          </summary>
          <ActionForm action={addTransaction} resetOnSuccess successText="Tercatat" className="mt-3">
            <datalist id="txn-categories">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Field label="Jenis">
                <select name="type" defaultValue="keluar" className={inputClass}>
                  <option value="keluar">Pengeluaran</option>
                  <option value="masuk">Pemasukan</option>
                </select>
              </Field>
              <Field label="Tanggal">
                <input name="date" type="date" required defaultValue={defaultDate} className={inputClass} />
              </Field>
              <Field label="Kategori" hint="Pilih atau ketik sendiri">
                <input name="category" required maxLength={40} list="txn-categories" placeholder="Belanja bahan" className={inputClass} />
              </Field>
              <Field label="Jumlah (Rp)">
                <input name="amount" required inputMode="numeric" className={inputClass} />
              </Field>
              <Field label="Catatan" className="col-span-2 sm:col-span-4">
                <input name="note" maxLength={200} placeholder="Mis. balon pentil 2 pack di Toko A" className={inputClass} />
              </Field>
            </div>
            <SubmitButton className="mt-4">Simpan</SubmitButton>
          </ActionForm>
        </details>
      </Card>

      <Card className="mt-4">
        <h2 className="text-lg font-extrabold text-brand-deep">Riwayat {formatMonth(ym)}</h2>
        {entries.length === 0 ? (
          <p className="mt-2 font-semibold text-brand-dark">Belum ada catatan di bulan ini.</p>
        ) : (
          <ul className="mt-2 divide-y-2 divide-sky-pale">
            {entries.map((e) => {
              const incoming = e.kind === "order" || e.type === "masuk";
              return (
                <li key={e.key} className="flex items-center gap-3 py-2.5">
                  <span className="w-14 shrink-0 text-sm font-bold text-brand-dark">{formatDate(e.date, { day: "numeric", month: "short" })}</span>
                  <span className="min-w-0 flex-1">
                    {e.kind === "order" ? (
                      <Link href={e.href} className="block truncate font-bold text-brand hover:text-brand-dark">{e.label}</Link>
                    ) : (
                      <span className="block truncate font-bold text-brand-deep">{e.label}</span>
                    )}
                    {e.sub && <span className="block truncate text-sm font-semibold text-brand-dark">{e.sub}</span>}
                  </span>
                  <span className={`shrink-0 font-extrabold ${incoming ? "text-leaf-dark" : "text-peach-deep"}`}>
                    {incoming ? "+" : "−"}{formatRupiah(e.amount)}
                  </span>
                  {e.kind === "txn" ? (
                    <ConfirmButton action={deleteTransaction.bind(null, e.id)} confirmText="Yakin?">Hapus</ConfirmButton>
                  ) : (
                    <span className="w-[4.5rem] shrink-0 text-right text-xs font-bold text-brand-dark">otomatis</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </>
  );
}
