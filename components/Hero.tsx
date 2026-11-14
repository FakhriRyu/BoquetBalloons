import Image from "next/image";
import { formatRupiah } from "@/data/products";
import { formatK } from "@/lib/format";

const OCCASIONS = ["Wisuda", "Sidang", "Anniversary", "Baby Gift", "Birthday"];

/** Harga `null` berarti belum ada yang dijual di bagian itu, jadi teks/badge harganya disembunyikan. */
export default function Hero({ minStemPrice, minProductPrice }: { minStemPrice: number | null; minProductPrice: number | null }) {
  return (
    <section className="bg-gingham relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 sm:py-14 md:grid-cols-2 md:gap-10 md:py-20">
        <div className="text-center md:text-left">
          <p className="inline-block rounded-full bg-white/90 px-4 py-1 font-display text-sm font-bold text-brand-dark shadow-soft sm:text-base">
            @adabalonbengkulu · Bengkulu
          </p>
          <h1 className="text-sticker mt-4 text-5xl font-extrabold leading-[0.95] sm:mt-5 sm:text-7xl">
            Buket Bunga
            <br />
            Balon
          </h1>

          <div className="mx-auto mt-5 max-w-md rounded-2xl bg-white/90 p-4 text-left font-semibold text-brand-deep shadow-soft sm:mt-6 sm:p-5 md:mx-0">
            <p className="inline-block rounded-full bg-peach px-3 py-0.5 font-display text-base font-extrabold tracking-wide text-white sm:text-lg">
              SISTEM PO H-1
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.95rem] leading-snug sm:text-lg">
              <li className="flex gap-2"><span aria-hidden>📍</span><span>Pagar Dewa</span></li>
              <li className="flex gap-2"><span aria-hidden>🎈</span><span>Handmade Balloon Bouquet</span></li>
              <li className="flex gap-2">
                <span aria-hidden>🎉</span>
                <span>{OCCASIONS.join(" | ")}</span>
              </li>
            </ul>
            {minStemPrice !== null && (
              <p className="mt-3 border-t-2 border-dashed border-brand/25 pt-2.5 font-display text-lg font-extrabold sm:text-xl">
                Mulai dari <span className="text-peach-deep">{formatRupiah(minStemPrice)}</span> per tangkai
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-row sm:justify-center sm:gap-4 md:justify-start">
            <a href="#rakit" className="btn-peach !px-4 !text-base sm:!px-7 sm:!text-lg">Rakit Bunga-mu</a>
            <a href="#katalog" className="btn-blue !px-4 !text-base sm:!px-7 sm:!text-lg">Lihat Katalog</a>
          </div>

        </div>

        <div className="relative mx-auto hidden w-full max-w-sm md:block">
          <div className="polaroid animate-floaty p-3">
            <Image src="/images/catalog-20k.jpg" alt="Bunga balon biru dengan pita besar" width={900} height={1125} priority sizes="380px" className="rounded-3xl" />
          </div>
          {minProductPrice !== null && (
            <div className="badge-scallop absolute -right-4 -top-6 h-28 w-28 rotate-6 text-center text-2xl leading-none">
              <span><span className="block text-xs font-bold">Mulai</span>{formatK(minProductPrice)}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
