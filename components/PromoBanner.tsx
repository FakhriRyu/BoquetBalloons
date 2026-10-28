import React from "react";
import Image from "next/image";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function PromoBanner() {
  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 bg-inverse-surface">
          {/* Left Side: Artisan Atmospheric Visual */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] overflow-hidden">
            <Image
              src="/images/atelier-workshop.jpg"
              alt="Cozy artisan flower workshop scene with freshly cut pink roses, florist scissors on wooden table"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent flex items-end p-space-lg">
              <div className="max-w-md">
                <span className="text-[11px] font-semibold text-secondary-fixed tracking-widest uppercase block mb-1">
                  Atelier Story
                </span>
                <p className="text-xl sm:text-2xl font-semibold italic text-inverse-on-surface leading-snug">
                  &ldquo;More than gifts, we create moments that matter.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Deep Forest Green Delivery Callout Banner */}
          <div className="lg:col-span-5 bg-secondary p-8 lg:p-12 flex flex-col justify-between text-on-secondary gap-space-lg">
            <div className="flex flex-col gap-space-md">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="text-[11px] font-semibold text-secondary-fixed tracking-wider uppercase">
                  Prioritas Cepat
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-on-secondary leading-tight">
                  Same Day Delivery Jabodetabek
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-secondary-fixed opacity-90 leading-relaxed">
                Pesan pagi, kami antar dengan aman sore ini. Dilengkapi pelindung kemasan anti-guncang agar balon dan kelopak bunga tiba dalam kondisi sempurna dan siap mengejutkan orang terkasih.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-space-md">
              <a
                href={createWhatsAppConsultationLink("Pemesanan Same Day Delivery")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-container-lowest text-secondary text-xs font-semibold hover:bg-secondary-fixed transition-all shadow-md"
              >
                <span>Pesan Sekarang</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <div className="flex items-center gap-space-xs text-on-secondary">
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                  timer
                </span>
                <span className="text-xs font-medium">Batas order same-day 15.00 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
