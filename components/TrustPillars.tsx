import React from "react";

export default function TrustPillars() {
  const pillars = [
    {
      icon: "eco",
      iconBg: "bg-primary-fixed text-primary",
      title: "Premium Quality",
      desc: "Bahan balon tebal impor anti bocor & bunga segar terawat harian.",
    },
    {
      icon: "stylus_note",
      iconBg: "bg-secondary-fixed text-secondary",
      title: "Bebas Custom Teks",
      desc: "Free stiker nama berkilau, pesan khusus, dan kartu ucapan estetik.",
    },
    {
      icon: "inventory_2",
      iconBg: "bg-tertiary-fixed text-tertiary",
      title: "Kemasan Box Aman",
      desc: "Pengiriman dilindungi carrier box khusus anti guncang & tahan angin.",
    },
    {
      icon: "support_agent",
      iconBg: "bg-primary-fixed-dim text-primary",
      title: "Konsultasi Ramah",
      desc: "Tim florist responsif siap membantu memilih kombinasi warna terbaik.",
    },
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="flex items-start gap-space-md p-space-md bg-surface-container rounded-2xl"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.iconBg}`}
              >
                <span className="material-symbols-outlined text-[24px]">{p.icon}</span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base font-semibold text-on-surface">{p.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
