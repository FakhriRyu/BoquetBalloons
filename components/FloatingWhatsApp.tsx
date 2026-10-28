"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={createWhatsAppConsultationLink("Chat Cepat via Tombol Mengambang")}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-primary text-white hover:bg-primary-container hover:text-on-primary-container px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/60"
        aria-label="Chat Florist via WhatsApp"
      >
        {/* Online Indicator Badge */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>

        <MessageCircle className="w-5 h-5 text-white" />
        <span className="font-headline font-bold text-xs sm:text-sm tracking-wide">
          Chat Florist
        </span>
      </a>
    </aside>
  );
}
