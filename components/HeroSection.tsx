"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-surface-bright overflow-hidden">
      {/* Soft Decorative Ambient Glows */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-lg pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 flex flex-col items-start gap-space-md z-10">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[16px]">celebration</span>
              <span className="text-[11px] font-semibold tracking-widest uppercase">
                Handcrafted Floral &amp; Balloon Atelier
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] lg:leading-[54px] font-semibold tracking-tight text-on-surface">
              Say It Better With <span className="text-primary">Balloons &amp; Flowers</span>
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Rangkaian buket balon estetik dan bunga segar premium tahan 3-6 bulan. Dibuat penuh kehangatan tangan artisan untuk wisuda, ulang tahun, dan perayaan kasih Anda.
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <Link
                href="#katalog-populer"
                className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-md hover:bg-primary-container transition-all hover:scale-[1.02]"
              >
                <span>Pesan Sekarang</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <a
                href={createWhatsAppConsultationLink("Konsultasi Desain Buket")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-container text-secondary text-sm font-semibold hover:bg-secondary-fixed transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Konsultasi Desain</span>
              </a>
            </div>

            {/* Quick Trust Badges Strip Under Copy */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-lg w-full max-w-lg">
              <div className="flex flex-col items-start gap-1 p-space-sm bg-surface-container-low rounded-xl">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
                <span className="text-xs font-semibold text-on-surface">Jabodetabek Express</span>
                <span className="text-[11px] text-on-surface-variant">Same day siap kirim</span>
              </div>
              <div className="flex flex-col items-start gap-1 p-space-sm bg-surface-container-low rounded-xl">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <span className="text-xs font-semibold text-on-surface">PVC Tahan Lama</span>
                <span className="text-[11px] text-on-surface-variant">Awet hingga 3–6 bulan</span>
              </div>
              <div className="flex flex-col items-start gap-1 p-space-sm bg-surface-container-low rounded-xl">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                </div>
                <span className="text-xs font-semibold text-on-surface">Foto Buket Siap</span>
                <span className="text-[11px] text-on-surface-variant">Preview sebelum antar</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Collage */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-xl bg-surface-container">
              <div className="relative w-full h-[520px]">
                <Image
                  src="/images/hero-main.jpg"
                  alt="Editorial photograph of a pastel pink blossom balloon bouquet and imported roses wrapped in soft blush craft silk paper"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>

              {/* Floating Artisan Tag Card */}
              <div className="absolute bottom-6 left-6 right-6 p-space-md bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-md flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-semibold">
                    <span className="material-symbols-outlined text-[20px]">loyalty</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-on-surface">
                      Serenade Rose Hot Air
                    </h4>
                    <p className="text-[11px] text-outline">Balon Crystal + Fresh Hydrangea</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
                    Edisi Terbatas
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-on-surface">Rp 265.000</p>
                </div>
              </div>

              {/* Hand Lettering Bubble Badge */}
              <div className="absolute top-6 right-6 bg-surface/90 backdrop-blur-sm px-3.5 py-2 rounded-full shadow-sm flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[16px]">draw</span>
                <span className="text-xs font-semibold">Gratis Custom Tulisan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
