"use client";

import React, { useState } from "react";
import { Minus, Plus, MessageCircle, Sparkles } from "lucide-react";
import BouquetPreview from "@/components/BouquetPreview";
import { createWhatsAppBouquetLink } from "@/lib/whatsapp";
import { formatRupiah } from "@/data/products";
import { calcTotal, type ColorOption, type FlowerType } from "@/data/builder";

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
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5 sm:gap-3">
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
            className={`h-9 w-9 rounded-full sm:h-11 sm:w-11 border-2 transition-transform ${
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
    <section className="space-y-2.5 sm:space-y-3">
      <h3 className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-base font-bold sm:text-lg text-brand-deep">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">{n}</span>
        {title}
        {hint && <span className="text-sm font-semibold text-brand-dark">{hint}</span>}
      </h3>
      {children}
    </section>
  );
}

export interface BouquetBuilderProps {
  flowerTypes: FlowerType[];
  pastelPetals: ColorOption[];
  chromePetals: ColorOption[];
  stemColors: ColorOption[];
  ribbonColors: ColorOption[];
  minQty: number;
  maxQty: number;
}

/** Data datang dari admin (lib/storefront.ts). Pemanggil menjamin tiap daftar tidak kosong (canBuildBouquet). */
export default function BouquetBuilder({ flowerTypes, pastelPetals, chromePetals, stemColors, ribbonColors, minQty, maxQty }: BouquetBuilderProps) {
  const [typeId, setTypeId] = useState((flowerTypes[1] ?? flowerTypes[0]).id);
  const [qty, setQty] = useState(Math.min(maxQty, Math.max(minQty, 5)));
  const [petalId, setPetalId] = useState("");
  const [stemId, setStemId] = useState("");
  const [ribbonId, setRibbonId] = useState("");
  const [note, setNote] = useState("");

  // Pilihan yang tersimpan bisa hilang saat admin menonaktifkannya, jadi selalu jatuh ke pilihan pertama.
  const type = flowerTypes.find((t) => t.id === typeId) ?? flowerTypes[0];
  const petals = type.chrome ? chromePetals : pastelPetals;
  const petal = petals.find((p) => p.id === petalId) ?? petals[0];
  const stem = stemColors.find((s) => s.id === stemId) ?? stemColors[0];
  const ribbon = ribbonColors.find((r) => r.id === ribbonId) ?? ribbonColors[0];
  const price = calcTotal({ type, qty, stem, petal });

  const setQ = (n: number) => setQty(Math.min(maxQty, Math.max(minQty, n)));

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
    <section id="rakit" className="scroll-mt-20 bg-sky-pale py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-4 py-1 text-sm font-extrabold text-leaf-dark">
            <Sparkles className="h-4 w-4" aria-hidden /> Rakit Sendiri
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-deep sm:text-5xl">Bikin Bunga Balon-mu</h2>
          <p className="mt-2 text-base font-semibold text-brand-dark sm:text-lg">
            Pilih jenis, jumlah, dan warna. Tampilan & harga langsung berubah.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Preview besar (desktop). Di mobile diganti bar pratinjau sticky di dalam kartu opsi. */}
          <div className="hidden lg:sticky lg:top-24 lg:block">
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
          <div className="space-y-6 rounded-[2rem] bg-white p-4 shadow-soft sm:space-y-8 sm:p-8">
            {/* Pratinjau ringkas yang ikut menempel saat menggulir opsi, supaya perubahan langsung terlihat di HP. */}
            <div className="sticky top-[80px] z-10 -mx-1 flex items-center gap-3 rounded-2xl border-2 border-sky-soft bg-white/95 p-2 shadow-soft backdrop-blur sm:top-[88px] sm:gap-5 sm:p-3 lg:hidden">
              <div
                className="aspect-[300/380] w-24 shrink-0 overflow-hidden rounded-xl transition-colors duration-300 sm:w-32"
                style={{ backgroundColor: `${petal.hex}55` }}
              >
                <BouquetPreview type={type} qty={qty} petal={petal} stem={stem} ribbon={ribbon} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-extrabold leading-tight text-brand-deep sm:text-xl">
                  {qty} tangkai · {type.name}
                </p>
                <p className="mt-1 text-xs font-semibold leading-snug text-brand-dark sm:text-sm">
                  Kelopak {petal.name} · Tangkai {stem.name} · Pita {ribbon.name}
                </p>
                <p className="mt-1.5 font-display text-2xl font-extrabold leading-none text-peach-deep sm:text-3xl" aria-live="polite">
                  {formatRupiah(price.total)}
                </p>
              </div>
            </div>

            <Step n={1} title="Jenis bunga">
              <div role="radiogroup" aria-label="Jenis bunga" className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {flowerTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={t.id === type.id}
                    onClick={() => setTypeId(t.id)}
                    className={`rounded-2xl border-2 p-2.5 text-left sm:p-3 transition-colors ${
                      t.id === type.id ? "border-brand bg-sky-soft" : "border-sky-soft bg-cream-light hover:bg-sky-pale"
                    }`}
                  >
                    <span className="block font-display text-base font-bold leading-tight text-brand-deep">{t.name}</span>
                    <span className="hidden text-xs font-semibold text-brand-dark sm:block">{t.desc}</span>
                    <span className="mt-1 block text-xs font-extrabold sm:mt-1.5 sm:text-sm text-peach-deep">{formatRupiah(t.pricePerStem)}/tangkai</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n={2} title="Jumlah tangkai" hint={`(${minQty}–${maxQty})`}>
              <div className="inline-flex items-center gap-4 rounded-full bg-sky-pale p-1.5">
                <button type="button" aria-label="Kurangi jumlah" disabled={qty <= minQty} onClick={() => setQ(qty - 1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-deep shadow-soft disabled:opacity-40">
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-10 text-center font-display text-2xl sm:text-3xl font-extrabold text-brand-deep" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Tambah jumlah" disabled={qty >= maxQty} onClick={() => setQ(qty + 1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-soft disabled:opacity-40">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </Step>

            <Step n={3} title="Warna kelopak" hint={`— ${petal.name}`}>
              <Swatches label="Warna kelopak" options={petals} value={petal.id} onChange={setPetalId} />
            </Step>

            <Step n={4} title="Warna tangkai" hint={`— ${stem.name}`}>
              <Swatches label="Warna tangkai" options={stemColors} value={stem.id} onChange={setStemId} />
            </Step>

            <Step n={5} title="Warna pita" hint={`— ${ribbon.name} (gratis)`}>
              <Swatches label="Warna pita" options={ribbonColors} value={ribbon.id} onChange={setRibbonId} />
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
            <div className="rounded-2xl bg-cream p-4 sm:p-5">
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
        <div className="sticky bottom-3 z-20 mt-6 flex justify-center sm:mt-8">
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn-peach w-full max-w-md !text-base sm:!text-lg">
            <MessageCircle className="h-5 w-5" aria-hidden />
            Pesan via WhatsApp · {formatRupiah(price.total)}
          </a>
        </div>
      </div>
    </section>
  );
}
