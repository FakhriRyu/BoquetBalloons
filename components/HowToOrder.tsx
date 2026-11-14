import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, createWhatsAppConsultationLink } from "@/lib/whatsapp";

type Step = { title: string; text?: string; chips?: string[]; filled: boolean; numberBg?: string };

const STEPS: Step[] = [
  { title: "PRE-ORDER H-1", text: "Pesan minimal 1 hari sebelum pengambilan/pengiriman", filled: true },
  { title: "ISI FORMAT ORDER", chips: ["NAMA", "PESANAN", "ALAMAT"], filled: false },
  { title: "PEMBAYARAN", chips: ["TRANSFER", "CASH", "QRIS"], filled: true, numberBg: "bg-peach-soft" },
  { title: "PENGIRIMAN", text: "GRATIS ONGKIR PAGAR DEWA DAN SEKITARNYA", filled: false },
];

/** Cincin spiral buku catatan: lubang hitam + kawat abu-abu yang melengkung ke kiri. */
function Ring({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 56 44" aria-hidden className={`absolute h-9 w-11 sm:h-11 sm:w-14 ${className}`}>
      <defs>
        <linearGradient id="htoRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6d6d6" />
          <stop offset="1" stopColor="#9e9e9e" />
        </linearGradient>
      </defs>
      <path d="M46 11 C 34 2, 10 2, 6 18 C 3 30, 14 39, 26 40" fill="none" stroke="url(#htoRing)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="47" cy="12" r="6.5" fill="#111" />
    </svg>
  );
}

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="scroll-mt-20 bg-cream-light px-3 py-12 sm:px-4 sm:py-20">
      <div className="bg-gingham-cream mx-auto max-w-2xl rounded-[2.25rem] border-8 border-[#a8c8e6] px-3 pb-8 pt-7 shadow-soft sm:rounded-[3rem] sm:border-[14px] sm:px-10 sm:pb-10">
        {/* Header */}
        <div className="relative text-center">
          <Image src="/images/logo.png" alt="Ada Balon Bengkulu" width={932} height={664} className="mx-auto h-16 w-auto sm:h-20" />
          <h2 className="mt-2 font-display font-extrabold leading-[0.85]">
            <span className="hto-outline block text-6xl sm:text-8xl">HOW TO</span>
            <span className="block text-7xl text-[#a8c8e6] sm:text-9xl" style={{ textShadow: "0 4px 0 #8bb3d8" }}>ORDER</span>
            <span className="sr-only">Cara pesan</span>
          </h2>
          {/* Coretan balon dekoratif */}
          <div aria-hidden className="absolute -right-1 top-10 flex scale-75 gap-1.5 sm:right-2 sm:top-16 sm:scale-100">
            <span className="block h-7 w-3 -rotate-12 rounded-full border-[3px] border-[#a8c8e6] bg-white/70 sm:h-9 sm:w-4" />
            <span className="block h-7 w-3 rotate-[25deg] rounded-full border-[3px] border-[#a8c8e6] bg-white/70 sm:h-9 sm:w-4" />
            <span className="mt-6 block h-3 w-7 -rotate-12 rounded-full border-[3px] border-[#a8c8e6] bg-white/70 sm:h-4 sm:w-9" />
          </div>
        </div>

        {/* Langkah, gaya buku spiral */}
        <ol className="mt-7 space-y-4 pl-6 sm:mt-10 sm:space-y-5 sm:pl-10">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={`relative flex items-center gap-3 rounded-[1.5rem] border-[3px] py-4 pl-5 pr-3 sm:gap-5 sm:rounded-[2.25rem] sm:py-6 sm:pl-10 sm:pr-6 ${
                s.filled ? "border-[#8bb8df] bg-[#8bb8df]" : "border-[#a8c8e6] bg-cream"
              }`}
            >
              <Ring className="-left-8 top-[10%] sm:-left-11" />
              <Ring className="-left-8 bottom-[6%] sm:-left-11" />

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-2xl font-extrabold sm:h-16 sm:w-16 sm:text-4xl ${
                  s.filled ? `${s.numberBg ?? "bg-cream"} text-[#8bb8df]` : "bg-[#8bb8df] text-cream"
                }`}
              >
                {i + 1}
              </span>

              <div className="min-w-0">
                <h3
                  className={`font-sans text-lg font-extrabold leading-tight sm:text-3xl sm:tracking-wide ${s.filled ? "text-cream-light" : "text-brand"}`}
                  style={s.filled ? { textShadow: "0 2px 0 #5f9ac4" } : undefined}
                >
                  {s.title}
                </h3>
                {s.text && (
                  <p className={`mt-1 text-[0.8rem] font-bold leading-snug sm:text-lg ${s.filled ? "text-white" : "text-brand"}`}>{s.text}</p>
                )}
                {s.chips && (
                  <ul className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                    {s.chips.map((c) => (
                      <li
                        key={c}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold sm:px-4 sm:py-1 sm:text-lg ${
                          s.filled ? "bg-cream text-brand" : "bg-[#8bb8df] text-white"
                        }`}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Kontak */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 font-sans text-lg font-bold text-brand sm:mt-10 sm:flex-row sm:text-xl">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-dark">
            <Instagram className="h-6 w-6" aria-hidden /> @{INSTAGRAM_HANDLE}
          </a>
          <a href={createWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-dark">
            <MessageCircle className="h-6 w-6" aria-hidden /> {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
