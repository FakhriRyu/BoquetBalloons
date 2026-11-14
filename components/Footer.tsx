import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-cream-light">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="rounded-2xl bg-cream-light p-2">
            <Image src="/images/logo.png" alt="Ada Balon Bengkulu" width={932} height={664} className="h-20 w-auto" />
          </div>
          <p className="max-w-xs font-semibold text-sky-soft">Buket bunga balon handmade dari Bengkulu.</p>
        </div>
        <div className="flex flex-col gap-3 font-display text-xl font-bold">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 hover:text-sun md:justify-start">
            <Instagram className="h-6 w-6" aria-hidden /> @{INSTAGRAM_HANDLE}
          </a>
          <a href={createWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 hover:text-sun md:justify-start">
            <MessageCircle className="h-6 w-6" aria-hidden /> {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
      <p className="border-t border-white/15 py-4 text-center text-sm font-semibold text-sky-soft">© {new Date().getFullYear()} Ada Balon Bengkulu</p>
    </footer>
  );
}
