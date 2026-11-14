import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { formatRupiah, type Product } from "@/data/products";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

const BG = { blue: "bg-sky-soft", pink: "bg-[#fbdbe6]", teal: "bg-[#cfe7e3]" } as const;

export default function Catalog({ products }: { products: Product[] }) {
  return (
    <section id="katalog" className="scroll-mt-20 bg-cream-light py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-4 max-w-2xl text-center sm:mb-12">
          <h2 className="text-3xl font-extrabold text-brand-deep sm:text-5xl">Katalog Bunga</h2>
          <p className="mt-2 text-base font-semibold text-brand-dark sm:text-lg">Pilihan siap pesan dari Instagram kami.</p>
        </div>
        {products.length === 0 && (
          <p className="text-center text-lg font-semibold text-brand-dark">Katalog sedang diperbarui. Rakit bunga sendiri di bawah, ya!</p>
        )}
        {products.length > 0 && (
          <p className="mb-3 text-center text-sm font-bold text-brand-dark sm:hidden" aria-hidden>
            Geser untuk lihat lainnya →
          </p>
        )}
        {/* Mobile: geser kiri-kanan (±2 kartu terlihat). sm ke atas: grid. */}
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id} className={`${BG[p.theme]} flex w-[44%] shrink-0 snap-start flex-col rounded-3xl p-2 shadow-soft sm:w-auto sm:rounded-[2.25rem] sm:p-4`}>
              <Image src={p.image} alt={`${p.name}, ${formatRupiah(p.price)}`} width={900} height={1125} sizes="(max-width:640px) 45vw, 360px" className="rounded-2xl sm:rounded-3xl" />
              <div className="flex flex-1 flex-col px-1 pb-1 pt-2.5 text-center sm:px-2 sm:pb-2 sm:pt-4">
                <h3 className="text-base font-extrabold leading-tight text-brand-deep sm:text-2xl">{p.name}</h3>
                <p className="mt-1 line-clamp-2 flex-1 text-xs font-semibold text-brand-dark sm:line-clamp-none sm:text-base">{p.tagline}</p>
                <p className="mt-1.5 font-display text-base font-extrabold text-peach-deep sm:hidden">{formatRupiah(p.price)}</p>
                <a href={createWhatsAppOrderLink(p.name, formatRupiah(p.price))} target="_blank" rel="noopener noreferrer" className="btn-peach mt-2 !gap-1.5 !px-3 !py-2 !text-sm sm:mt-4 sm:!gap-2 sm:!px-7 sm:!py-3.5 sm:!text-lg" aria-label={`Beli ${p.name} ${formatRupiah(p.price)}`}>
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden /> Beli<span className="hidden sm:inline"> {formatRupiah(p.price)}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-base font-bold sm:mt-10 sm:text-lg text-brand-dark">
          Mau warna lain? <a href="#rakit" className="underline decoration-peach decoration-4 underline-offset-4 hover:text-brand">Rakit sendiri di bawah ↓</a>
        </p>
      </div>
    </section>
  );
}
