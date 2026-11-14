import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";
import { INSTAGRAM_URL, createWhatsAppConsultationLink } from "@/lib/whatsapp";

const LINKS = [
  { name: "Katalog", href: "#katalog" },
  { name: "Rakit Bunga", href: "#rakit" },
  { name: "Cara Pesan", href: "#cara-pesan" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-sky bg-cream-light/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <a href="#" aria-label="Ada Balon Bengkulu, ke atas">
          <Image src="/images/logo.png" alt="Ada Balon Bengkulu" width={932} height={664} priority className="h-14 w-auto sm:h-16" />
        </a>
        <nav aria-label="Menu utama" className="hidden items-center gap-7 font-display text-lg font-bold text-brand-deep md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand">{l.name}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram @adabalonbengkulu" className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-soft text-brand-deep hover:bg-sky">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={createWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center gap-2 rounded-full bg-peach px-4 font-display font-extrabold text-white shadow-soft hover:bg-peach-dark">
            <MessageCircle className="h-5 w-5" aria-hidden />
            <span className="hidden sm:inline">Chat WA</span>
          </a>
        </div>
      </div>
    </header>
  );
}
