"use client";

import React from "react";
import Link from "next/link";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function CustomCta() {
  return (
    <section id="kustom-banner" className="w-full pb-space-xl pt-space-md bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-surface-container p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm border border-outline-variant/30">
          <div className="flex flex-col gap-space-xs text-center md:text-left z-10">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-widest">
              Kustom Sesuai Selera Anda
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-on-surface">
              Punya Desain atau Tema Spesial?
            </h3>
            <p className="text-sm text-on-surface-variant max-w-lg leading-relaxed">
              Kami menerima pesanan kustom untuk tema corporate, bridesmaid gift box, foto wisuda grup, hingga dekorasi meja lamaran.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-sm z-10">
            <a
              href={createWhatsAppConsultationLink("Pesanan Kustom Khusus")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-primary text-on-primary text-xs sm:text-sm font-semibold shadow-md hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat WhatsApp Florist</span>
            </a>
            <Link
              href="#katalog-populer"
              className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-container-lowest text-on-surface text-xs sm:text-sm font-semibold hover:bg-surface-variant transition-all shadow-sm"
            >
              <span>Buka Katalog Lengkap</span>
            </Link>
          </div>

          {/* Ambient flower watermark decoration */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-primary">
            <span className="material-symbols-outlined text-[240px]">filter_vintage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
