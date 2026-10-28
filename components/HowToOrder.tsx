import React from "react";
import { MousePointerClick, MessageSquareText, Truck } from "lucide-react";

export default function HowToOrder() {
  const steps = [
    {
      num: "01",
      icon: MousePointerClick,
      title: "Pilih Model atau Request Custom",
      description:
        "Pilih buket favorit dari katalog atau gunakan Custom Order Calculator untuk menyesuaikan warna, ukuran balon, dan tema acara.",
    },
    {
      num: "02",
      icon: MessageSquareText,
      title: "Tentukan Teks Ucapan & Tanggal",
      description:
        "Kirim detail nama/gelar untuk tulisan di balon, pesan kartu ucapan, serta tanggal & waktu pengiriman yang diinginkan ke admin WhatsApp.",
    },
    {
      num: "03",
      icon: Truck,
      title: "Dirangkai & Dikirim Aman",
      description:
        "Florist kami merangkai kado spesialmu, memfotonya sebelum dikirim, dan mengantarkannya dengan stand box proteksi khusus via kurir instan.",
    },
  ];

  return (
    <section id="cara-pesan" className="w-full py-20 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary-fixed px-3 py-1 rounded-full">
            Alur Pemesanan
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            Cara Pesan Buket Balon dalam 3 Langkah
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant">
            Pemesanan kado tanpa ribet, cepat, dan transparan langsung ke florist atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-surface p-8 rounded-3xl border border-outline-variant/60 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-headline font-black text-3xl text-primary/30">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-headline font-bold text-lg text-on-surface mb-3">
                    {step.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/40 flex items-center text-[11px] font-bold text-primary">
                  <span>Langkah {idx + 1} dari 3</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
