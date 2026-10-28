"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="kontak-footer" className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl">
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                <span className="material-symbols-outlined text-[18px]">filter_vintage</span>
              </div>
              <span className="text-base font-semibold text-on-surface">Pastel Bloom</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Boutique artisan floral &amp; balon estetik handcrafted untuk perayaan paling berkesan. Menghadirkan kehangatan dan kebahagiaan di setiap momen.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <a
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                href={createWhatsAppConsultationLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
              <a
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                href="mailto:hello@pastelbloom.id"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>

          {/* Col 2: Atelier & Workshop */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-base font-semibold text-on-surface">Atelier &amp; Workshop</h3>
            <div className="flex items-start gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                location_on
              </span>
              <p className="text-xs sm:text-sm">
                Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190
              </p>
            </div>
            <div className="flex items-start gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                schedule
              </span>
              <div className="text-xs sm:text-sm">
                <p>Senin – Sabtu: 08.00 – 20.00 WIB</p>
                <p>Minggu &amp; Libur: 09.00 – 17.00 WIB</p>
              </div>
            </div>
            <div className="pt-space-xs">
              <a
                className="inline-flex items-center gap-space-xs bg-secondary text-on-secondary px-space-md py-space-xs rounded-full text-xs font-semibold hover:bg-on-secondary-container transition-colors shadow-sm"
                href={createWhatsAppConsultationLink("Quick Order")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                <span>Quick Order WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 3: Jelajahi Momen */}
          <div className="flex flex-col gap-space-sm">
            <h3 className="text-base font-semibold text-on-surface">Jelajahi Momen</h3>
            <ul className="flex flex-col gap-space-xs text-xs sm:text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="#katalog-populer">
                  Koleksi Bunga Segar &amp; Preserved
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#katalog-populer">
                  Hot Air Balloon Buket
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#kustom-banner">
                  Kustom Warna &amp; Tulisan Balon
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#momen-section">
                  Hampers Ulang Tahun &amp; Wisuda
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="#momen-section">
                  Dekorasi Meja &amp; Engagement
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Warta & Diskon VIP */}
          <div className="flex flex-col gap-space-md">
            <h3 className="text-base font-semibold text-on-surface">Warta &amp; Diskon VIP</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Daftarkan email untuk katalog koleksi seasonal terbaru dan voucher Rp50.000 pertama.
            </p>
            {subscribed ? (
              <div className="bg-secondary-fixed/50 text-secondary p-3 rounded-full text-center text-xs font-semibold">
                ✓ Terima kasih! Kode voucher telah dikirim.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-space-xs">
                <div className="flex items-center rounded-full bg-surface p-1 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-outline-variant/40">
                  <input
                    className="w-full bg-transparent px-space-sm py-space-xs text-xs text-on-surface placeholder:text-outline focus:outline-none"
                    placeholder="Alamat email Anda..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    aria-label="Langganan"
                    className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 hover:bg-primary-container transition-colors shadow-sm"
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
                <span className="text-[11px] text-outline">Privasi terjaga, tanpa spam.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Trust & Guarantee Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container rounded-2xl p-space-md border border-outline-variant/30">
          <div className="flex flex-wrap items-center gap-space-lg text-on-surface">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span className="text-xs font-semibold">100% Fresh Guarantee</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
              <span className="text-xs font-semibold">Pembayaran Aman QRIS &amp; Bank</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-tertiary text-[20px]">local_shipping</span>
              <span className="text-xs font-semibold">Instant Jabodetabek Delivery</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs text-[10px] font-semibold text-on-surface-variant">
            <span className="px-2 py-1 bg-surface rounded shadow-sm">BCA</span>
            <span className="px-2 py-1 bg-surface rounded shadow-sm">MANDIRI</span>
            <span className="px-2 py-1 bg-surface rounded shadow-sm">QRIS</span>
            <span className="px-2 py-1 bg-surface rounded shadow-sm">VISA</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-space-md text-center text-on-surface-variant text-xs">
          <p>© 2025 Pastel Bloom Atelier. Handcrafted with love in Jakarta.</p>
        </div>
      </div>
    </footer>
  );
}
