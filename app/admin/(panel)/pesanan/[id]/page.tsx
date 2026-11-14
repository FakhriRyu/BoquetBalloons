import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { ActionForm, ConfirmButton, SubmitButton, ToggleButton } from "@/components/admin/forms";
import { Badge, Card, Field, inputClass } from "@/components/admin/ui";
import { formatRupiah } from "@/data/products";
import { getDb, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/dal";
import { formatDate } from "@/lib/dates";
import { ORDER_STATUSES, STATUS_LABEL, STATUS_TONE, itemsCost, itemsSubtotal, lineCost, orderNo, orderProfit, waNumber } from "@/lib/orders";
import { deleteOrder, setOrderPaid, setOrderStatus, updateOrder } from "../actions";
import StatusButton from "./StatusButton";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [o] = await getDb().select({ no: schema.orders.no }).from(schema.orders).where(eq(schema.orders.id, id));
  return { title: o ? `Pesanan ${orderNo(o.no)}` : "Pesanan" };
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const [[order], items] = await Promise.all([
    db.select().from(schema.orders).where(eq(schema.orders.id, id)),
    db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, id)).orderBy(asc(schema.orderItems.sortOrder)),
  ]);
  if (!order) notFound();

  const subtotal = itemsSubtotal(items);
  const cost = itemsCost(items);
  const wa = waNumber(order.customerPhone);

  return (
    <div className="space-y-4">
      <Link href="/admin/pesanan" className="inline-flex min-h-11 items-center gap-1.5 font-bold text-brand hover:text-brand-dark">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Semua pesanan
      </Link>

      <header>
        <p className="text-sm font-extrabold text-brand-dark">{orderNo(order.no)} · dipesan {formatDate(order.orderDate)}</p>
        <h1 className="text-3xl font-extrabold text-brand-deep">{order.customerName}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge tone={STATUS_TONE[order.status]}>{STATUS_LABEL[order.status]}</Badge>
          <Badge tone={order.isPaid ? "green" : "peach"}>{order.isPaid ? `Lunas ${order.paidAt ? formatDate(order.paidAt, { day: "numeric", month: "short" }) : ""}` : "Belum lunas"}</Badge>
          {order.pickupDate && <span className="text-sm font-bold text-brand-dark">Ambil {formatDate(order.pickupDate, { weekday: "long", day: "numeric", month: "long" })}</span>}
        </div>
        {wa && (
          <a href={`https://api.whatsapp.com/send?phone=${wa}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-leaf px-4 font-bold text-white hover:bg-leaf-dark">
            <MessageCircle className="h-4 w-4" aria-hidden /> Chat {order.customerPhone}
          </a>
        )}
      </header>

      <Card>
        <h2 className="mb-3 text-lg font-extrabold text-brand-deep">Status</h2>
        <div className="flex flex-wrap gap-2">
          {ORDER_STATUSES.map((s) => (
            <StatusButton key={s} action={setOrderStatus.bind(null, order.id, s)} active={order.status === s} label={STATUS_LABEL[s]} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 border-t-2 border-sky-pale pt-4">
          <span className="font-bold text-brand-deep">Pembayaran</span>
          <ToggleButton action={setOrderPaid.bind(null, order.id, !order.isPaid)} on={order.isPaid} onLabel="Lunas" offLabel="Belum lunas" label="Pembayaran" />
        </div>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-extrabold text-brand-deep">Item</h2>
        <ul className="divide-y-2 divide-sky-pale">
          {items.map((it) => (
            <li key={it.id} className="py-3">
              <div className="flex justify-between gap-3">
                <span className="font-bold text-brand-deep">{it.description}</span>
                <span className="shrink-0 font-extrabold text-brand-deep">{formatRupiah(it.qty * it.unitPrice)}</span>
              </div>
              <p className="text-sm font-semibold text-brand-dark">
                {it.qty} × {formatRupiah(it.unitPrice)}
                {it.petalColor && ` · kelopak ${it.petalColor}, tangkai ${it.stemColor}, pita ${it.ribbonColor}`}
              </p>
              <p className="text-xs font-semibold text-brand-dark">HPP {formatRupiah(lineCost(it))}{it.extraCost > 0 && ` (termasuk kemasan ${formatRupiah(it.extraCost)})`}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1 rounded-xl bg-cream p-4 font-semibold text-brand-deep">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatRupiah(subtotal)}</dd></div>
          {order.discount > 0 && <div className="flex justify-between"><dt>Diskon</dt><dd>−{formatRupiah(order.discount)}</dd></div>}
          {order.shippingFee > 0 && <div className="flex justify-between"><dt>Ongkir</dt><dd>{formatRupiah(order.shippingFee)}</dd></div>}
          <div className="flex justify-between border-t-2 border-dashed border-brand/30 pt-2 font-display text-2xl font-extrabold">
            <dt>Total</dt><dd className="text-peach-deep">{formatRupiah(order.total)}</dd>
          </div>
          <div className="flex justify-between text-sm text-brand-dark"><dt>HPP (saat dipesan)</dt><dd>{formatRupiah(cost)}</dd></div>
          <div className="flex justify-between text-sm text-brand-dark"><dt>Perkiraan laba</dt><dd>{formatRupiah(orderProfit(order, cost))}</dd></div>
        </dl>
        {order.note && <p className="mt-3 whitespace-pre-line rounded-xl bg-sky-pale p-3 text-sm font-semibold text-brand-deep">{order.note}</p>}
      </Card>

      <Card>
        <details>
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-display text-lg font-extrabold text-brand-deep">Ubah data pesanan</summary>
          <p className="mb-3 text-sm font-semibold text-brand-dark">Item tidak bisa diubah. Kalau isinya salah, hapus pesanan ini lalu buat ulang.</p>
          <ActionForm action={updateOrder}>
            <input type="hidden" name="id" value={order.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nama"><input name="customerName" required maxLength={80} defaultValue={order.customerName} className={inputClass} /></Field>
              <Field label="No. HP / WhatsApp"><input name="customerPhone" type="tel" maxLength={30} defaultValue={order.customerPhone} className={inputClass} /></Field>
              <Field label="Tanggal pesan"><input name="orderDate" type="date" required defaultValue={order.orderDate} className={inputClass} /></Field>
              <Field label="Tanggal ambil / kirim"><input name="pickupDate" type="date" defaultValue={order.pickupDate ?? ""} className={inputClass} /></Field>
              <Field label="Diskon (Rp)"><input name="discount" inputMode="numeric" defaultValue={order.discount} className={inputClass} /></Field>
              <Field label="Ongkir (Rp)"><input name="shippingFee" inputMode="numeric" defaultValue={order.shippingFee} className={inputClass} /></Field>
              <Field label="Catatan" className="sm:col-span-2"><textarea name="note" rows={2} maxLength={500} defaultValue={order.note} className={inputClass} /></Field>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <SubmitButton />
              <ConfirmButton action={deleteOrder.bind(null, order.id)} confirmText="Yakin hapus pesanan?">Hapus pesanan</ConfirmButton>
            </div>
          </ActionForm>
        </details>
      </Card>
    </div>
  );
}
