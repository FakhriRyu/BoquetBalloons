"use client";

import React, { useState } from "react";
import { Minus, Plus, MessageCircle, Sparkles } from "lucide-react";
import BouquetPreview from "@/components/BouquetPreview";
import { createWhatsAppBouquetLink } from "@/lib/whatsapp";
import { formatRupiah } from "@/data/products";
import {
  CHROME_PETALS,
  FLOWER_TYPES,
  MAX_QTY,
  MIN_QTY,
  PASTEL_PETALS,
  RIBBON_COLORS,
  STEM_COLORS,
  calcTotal,
} from "@/data/builder";

function Swatches({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; name: string; hex: string; light?: boolean }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-3">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            aria-label={o.name}
            title={o.name}
            onClick={() => onChange(o.id)}
            className={`h-11 w-11 rounded-full border-2 transition-transform ${
              active ? "scale-110 border-brand-deep ring-4 ring-sky" : o.light ? "border-brand/40" : "border-white"
            } shadow-soft`}
            style={{ backgroundColor: o.hex }}
          />
        );
      })}
    </div>
  );
}

function Step({ n, title, children, hint }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-lg font-bold text-brand-deep">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">{n}</span>
        {title}
        {hint && <span className="ml-1 text-sm font-semibold text-brand-dark">{hint}</span>}
      </h3>
      {children}
    </section>
  );
}

export default function BouquetBuilder() {
  const [typeId, setTypeId] = useState(FLOWER_TYPES[1].id);
  const [qty, setQty] = useState(5);
  const [petalId, setPetalId] = useState(PASTEL_PETALS[0].id);
  const [stemId, setStemId] = useState(STEM_COLORS[0].id);
  const [ribbonId, setRibbonId] = useState(RIBBON_COLORS[0].id);
  const [note, setNote] = useState("");

  const type = FLOWER_TYPES.find((t) => t.id === typeId)!;
  const petals = type.chrome ? CHROME_PETALS : PASTEL_PETALS;
  const petal = petals.find((p) => p.id === petalId) ?? petals[0];
  const stem = STEM_COLORS.find((s) => s.id === stemId)!;
  const ribbon = RIBBON_COLORS.find((r) => r.id === ribbonId)!;
  const price = calcTotal({ type, qty, stem, petal });

  const pickType = (id: (typeof FLOWER_TYPES)[number]["id"]) => {
    const next = FLOWER_TYPES.find((t) => t.id === id)!;
    if (next.chrome !== type.chrome) setPetalId((next.chrome ? CHROME_PETALS : PASTEL_PETALS)[0].id);
    setTypeId(id);
  };
  const setQ = (n: number) => setQty(Math.min(MAX_QTY, Math.max(MIN_QTY, n)));

  const link = createWhatsAppBouquetLink({
    type: type.name,
    qty,
    petalColor: petal.name,
    stemColor: stem.name,
    ribbon: `Warna ${ribbon.name}`,
    note,
    total: formatRupiah(price.total),
  });

  return (
    <section id="rakit" className="scroll-mt-20 bg-sky-pale py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-4 py-1 text-sm font-extrabold text-leaf-dark">
            <Sparkles className="h-4 w-4" aria-hidden /> Rakit Sendiri
          </span>
          <h2 className="mt-3 text-4xl font-extrabold text-brand-deep sm:text-5xl">Bikin Bunga Balon-mu</h2>
          <p className="mt-2 text-lg font-semibold text-brand-dark">
            Pilih jenis, jumlah, dan warna. Tampilan & harga langsung berubah.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="polaroid relative p-4 pb-6">
              <div
                className="aspect-[300/380] w-full overflow-hidden rounded-2xl transition-colors duration-300"
                style={{ backgroundColor: `${petal.hex}55` }}
              >
                <BouquetPreview type={type} qty={qty} petal={petal} stem={stem} ribbon={ribbon} />
              </div>
              <div className="badge-scallop absolute -right-3 -top-5 h-28 w-28 rotate-6 text-center text-xl leading-tight sm:-right-5 sm:h-32 sm:w-32" aria-live="polite">
                <span>
                  <span className="block text-xs font-bold opacity-90">Total</span>
                  {formatRupiah(price.total)}
                </span>
              </div>
              <p className="mt-4 text-center font-display text-lg font-bold text-brand-deep">
                {qty} tangkai · {type.name}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-8 rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
            <Step n={1} title="Jenis bunga">
              <div role="radiogroup" aria-label="Jenis bunga" className="grid gap-3 sm:grid-cols-3">
                {FLOWER_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={t.id === typeId}
                    onClick={() => pickType(t.id)}
                    className={`rounded-2xl border-2 p-3 text-left transition-colors ${
                      t.id === typeId ? "border-brand bg-sky-soft" : "border-sky-soft bg-cream-light hover:bg-sky-pale"
                    }`}
                  >
                    <span className="block font-display text-base font-bold leading-tight text-brand-deep">{t.name}</span>
                    <span className="block text-xs font-semibold text-brand-dark">{t.desc}</span>
                    <span className="mt-1.5 block text-sm font-extrabold text-peach-deep">{formatRupiah(t.pricePerStem)}/tangkai</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n={2} title="Jumlah tangkai" hint={`(${MIN_QTY}–${MAX_QTY})`}>
              <div className="inline-flex items-center gap-4 rounded-full bg-sky-pale p-1.5">
                <button type="button" aria-label="Kurangi jumlah" disabled={qty <= MIN_QTY} onClick={() => setQ(qty - 1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-deep shadow-soft disabled:opacity-40">
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-10 text-center font-display text-3xl font-extrabold text-brand-deep" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Tambah jumlah" disabled={qty >= MAX_QTY} onClick={() => setQ(qty + 1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-soft disabled:opacity-40">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </Step>

            <Step n={3} title="Warna kelopak" hint={`— ${petal.name}`}>
              <Swatches label="Warna kelopak" options={petals} value={petal.id} onChange={setPetalId} />
            </Step>

            <Step n={4} title="Warna tangkai" hint={`— ${stem.name}`}>
              <Swatches label="Warna tangkai" options={STEM_COLORS} value={stemId} onChange={setStemId} />
            </Step>

            <Step n={5} title="Warna pita" hint={`— ${ribbon.name} (gratis)`}>
              <Swatches label="Warna pita" options={RIBBON_COLORS} value={ribbonId} onChange={setRibbonId} />
            </Step>

            <Step n={6} title="Catatan">
              <label className="block">
                <span className="sr-only">Catatan atau tulisan ucapan</span>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={80}
                  placeholder="Catatan (opsional): nama penerima, ucapan, tanggal ambil"
                  className="w-full rounded-2xl border-2 border-sky-soft bg-cream-light px-4 py-3 font-semibold text-brand-deep placeholder:text-brand-dark/60 focus:border-brand focus:outline-none"
                />
              </label>
            </Step>

            {/* Summary */}
            <div className="rounded-2xl bg-cream p-5">
              <dl className="space-y-1.5 text-base font-semibold text-brand-deep">
                <div className="flex justify-between"><dt>{qty} × {formatRupiah(price.perStem)}</dt><dd>{formatRupiah(price.flowers)}</dd></div>
                <div className="flex justify-between border-t-2 border-dashed border-brand/30 pt-2 font-display text-2xl font-extrabold">
                  <dt>Total</dt><dd className="text-peach-deep">{formatRupiah(price.total)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* CTA (sticky on mobile) */}
        <div className="sticky bottom-3 z-20 mt-8 flex justify-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-peach w-full max-w-md">
            <MessageCircle className="h-5 w-5" aria-hidden />
            Pesan via WhatsApp · {formatRupiah(price.total)}
          </a>
        </div>
      </div>
    </section>
  );
}
