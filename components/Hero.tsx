"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Heart, Clock } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-surface via-surface-container-low/40 to-surface">
      {/* Soft Decorative Ambient Background */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary-container/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed-variant px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Handcrafted Balloon & Floral Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-[1.15]">
              Koleksi Buket Balon <span className="text-primary italic">Estetik & Ceria</span> untuk Momen Spesialmu
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Atelier kado balon bunga artistik untuk momen kelulusan wisuda, lamaran, ulang tahun, dan perayaan manis penuh sukacita dengan balon PVC tebal anti bocor.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <Link
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-container hover:text-on-primary-container px-6 py-3.5 rounded-full font-headline font-bold text-sm shadow-glow transition-all hover:scale-105 active:scale-95"
              >
                <span>Lihat Katalog Buket</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={createWhatsAppConsultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high px-6 py-3.5 rounded-full font-headline font-semibold text-sm border border-outline-variant shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-secondary" />
                <span>Konsultasi Kilat</span>
              </a>
            </div>

            {/* Key Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/60 w-full max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-headline font-bold text-xs text-on-surface">PVC Tebal</p>
                  <p className="text-[11px] text-on-surface-variant">Tahan 3-7 Hari</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-headline font-bold text-xs text-on-surface">Free Custom</p>
                  <p className="text-[11px] text-on-surface-variant">Tulisan & Kartu</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-headline font-bold text-xs text-on-surface">Fast Dispatch</p>
                  <p className="text-[11px] text-on-surface-variant">Bisa Sameday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Bouquet Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest bg-surface-container">
              <Image
                src="/images/hero-bouquet.jpg"
                alt="Pastel Bloom Handcrafted Balloon Flower Bouquet"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Showcase Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Signature Edition</span>
                    <h2 className="font-headline font-bold text-sm text-on-surface">The Pastel Dream Bouquet</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-on-surface-variant block">Mulai dari</span>
                    <span className="font-headline font-bold text-sm text-primary">Rp 175.000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Floating Pill 1 (Top Left) */}
            <div className="absolute -top-3 -left-3 sm:-left-6 bg-surface-container-lowest/95 backdrop-blur-md py-2 px-3.5 rounded-full border border-outline-variant shadow-lg flex items-center gap-2 animate-bounce [animation-duration:4s]">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs font-bold text-on-surface">Bisa Custom Nama & Gelar ✨</span>
            </div>

            {/* Floating Pill 2 (Bottom Right) */}
            <div className="absolute -bottom-3 -right-3 sm:-right-4 bg-surface-container-lowest/95 backdrop-blur-md py-2 px-3.5 rounded-full border border-outline-variant shadow-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="text-xs font-bold text-on-surface">Kemasan Box Proteksi Aman 📦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
