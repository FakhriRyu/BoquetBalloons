import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { PRODUCTS, formatRupiah } from "@/data/products";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

const BG = { blue: "bg-sky-soft", pink: "bg-[#fbdbe6]", teal: "bg-[#cfe7e3]" } as const;

export default function Catalog() {
  return (
    <section id="katalog" className="scroll-mt-20 bg-cream-light py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold text-brand-deep sm:text-5xl">Katalog Bunga</h2>
          <p className="mt-2 text-lg font-semibold text-brand-dark">Pilihan siap pesan dari Instagram kami.</p>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <li key={p.id} className={`${BG[p.theme]} flex flex-col rounded-[2.25rem] p-4 shadow-soft`}>
              <Image src={p.image} alt={`${p.name}, ${formatRupiah(p.price)}`} width={900} height={1125} sizes="(max-width:640px) 90vw, 360px" className="rounded-3xl" />
              <div className="flex flex-1 flex-col px-2 pb-2 pt-4 text-center">
                <h3 className="text-2xl font-extrabold text-brand-deep">{p.name}</h3>
                <p className="mt-1 flex-1 font-semibold text-brand-dark">{p.tagline}</p>
                <a href={createWhatsAppOrderLink(p.name, formatRupiah(p.price))} target="_blank" rel="noopener noreferrer" className="btn-peach mt-4">
                  <ShoppingCart className="h-5 w-5" aria-hidden /> Beli {formatRupiah(p.price)}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-lg font-bold text-brand-dark">
          Mau warna lain? <a href="#rakit" className="underline decoration-peach decoration-4 underline-offset-4 hover:text-brand">Rakit sendiri di bawah ↓</a>
        </p>
      </div>
    </section>
  );
}
