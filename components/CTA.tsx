"use client";

import React from "react";
import { MessageCircle, Sparkles, Heart } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function CTA() {
  return (
    <section className="w-full py-20 bg-gradient-to-tr from-primary via-primary-container to-primary text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-white" />
          <span>Konsultasi Gratis Tanpa Minimum Pembelian</span>
        </div>

        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Siap Hadirkan Kejutan Manis Tak Terlupakan?
        </h2>

        <p className="font-body text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
          Konsultasikan ide kado buket balonmu sekarang. Tim florist Pastel Bloom siap membantu mewujudkan rangkaian impian sesuai budget, warna, dan tema acaramu.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={createWhatsAppConsultationLink("Pemesanan Cepat via Website")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-white text-primary hover:bg-surface hover:text-on-primary-container px-8 py-4 rounded-full font-headline font-extrabold text-sm sm:text-base shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat Florist via WhatsApp Sekarang</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-white/80 pt-4">
          <Heart className="w-3.5 h-3.5 fill-white text-white" />
          <span>Respons cepat setiap hari pukul 08.00 - 21.00 WIB</span>
        </div>
      </div>
    </section>
  );
}
