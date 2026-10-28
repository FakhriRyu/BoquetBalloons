import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Instagram, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant border-t border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary-fixed">
                <Image
                  src="/images/logo.png"
                  alt="BloomBalloon Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-headline font-bold text-lg text-primary">
                Pastel Bloom
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Atelier kado balon bunga artistik untuk momen kelulusan wisuda, lamaran, ulang tahun, dan perayaan manis penuh sukacita.
            </p>
            <div className="flex items-center gap-2 text-primary pt-1">
              <Heart className="w-4 h-4 fill-primary text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                Handcrafted with Love
              </span>
            </div>
          </div>

          {/* Col 2: Workshop Hours */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm text-on-surface flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Jam Buka Workshop</span>
            </h4>
            <div className="text-xs space-y-1.5 text-on-surface-variant">
              <p>Senin - Jumat: 08.00 - 18.00 WIB</p>
              <p>Sabtu - Minggu: 09.00 - 16.00 WIB</p>
              <p className="text-primary font-bold pt-1">*Order custom minimal H-2 acara</p>
              <p className="text-[11px] text-on-surface-variant/80">Slot kilat same-day tergantung ketersediaan</p>
            </div>
          </div>

          {/* Col 3: Studio & Location */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm text-on-surface flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              <span>Studio & Lokasi</span>
            </h4>
            <p className="font-body text-xs text-on-surface-variant">
              Jl. Kemang Bunga No. 24, Jakarta Selatan
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4 text-secondary" />
                <span>@pastelbloom.id</span>
              </a>
              <a
                href="mailto:hello@pastelbloom.id"
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-secondary" />
                <span>hello@pastelbloom.id</span>
              </a>
            </div>
          </div>

          {/* Col 4: Quick Action */}
          <div className="space-y-3">
            <h4 className="font-headline font-bold text-sm text-on-surface">
              Konsultasi Kilat
            </h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Punya ide tema atau budget tertentu? Diskusikan langsung dengan florist kami via WhatsApp.
            </p>
            <a
              href={createWhatsAppConsultationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-secondary text-white hover:bg-secondary-container hover:text-on-secondary-container px-4 py-3 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-outline-variant/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant/80">
          <p>© 2026 Pastel Bloom Atelier. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="#faq" className="hover:text-primary transition-colors">
              Pusat Bantuan
            </Link>
            <Link href="#cara-pesan" className="hover:text-primary transition-colors">
              Syarat Pemesanan
            </Link>
            <Link href="#beranda" className="hover:text-primary transition-colors">
              Kembali ke Atas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
