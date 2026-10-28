import React from "react";
import { ShieldCheck, HeartHandshake, PenTool, PackageCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Latex & PVC Tebal Anti Bocor",
      description:
        "Material balon impor elastisitas tinggi dan sistem double-seal khusus yang membuat balon tetap kencang dan berkilau 3 hingga 7+ hari.",
      badge: "Kualitas Premium",
      accent: "primary",
    },
    {
      icon: HeartHandshake,
      title: "100% Handcrafted with Love",
      description:
        "Setiap tangkai bunga dan ornamen balon dirangkai satu per satu secara teliti dan artistik oleh florist bersertifikat kami.",
      badge: "Artisan Florist",
      accent: "secondary",
    },
    {
      icon: PenTool,
      title: "Free Lettering & Greeting Card",
      description:
        "Bebas request nama wisudawan, gelar sarjana, atau kalimat ucapan cinta di permukaan balon plus kartu ucapan tanpa biaya tambahan.",
      badge: "Gratis Desain",
      accent: "tertiary",
    },
    {
      icon: PackageCheck,
      title: "Packaging Kotak Khusus Aman",
      description:
        "Dikemas rapi dalam stand box kokoh eksklusif dengan alas penahan balon sehingga aman dibawa maupun dikirim via kurir instan mobil.",
      badge: "Garansi Aman",
      accent: "primary",
    },
  ];

  return (
    <section id="keunggulan" className="w-full py-20 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary-fixed px-3 py-1 rounded-full">
            Kenapa Pastel Bloom?
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            Keunggulan Buket Balon Kami Dibanding Yang Lain
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant">
            Dibuat dengan standar atelier kado seni, memperhatikan detail estetika, durabilitas, dan kebahagiaan penerima kado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-surface p-7 rounded-3xl border border-outline-variant/60 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-on-surface-variant/80 bg-surface-container px-2.5 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-base text-on-surface mb-2.5 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center gap-1.5 text-[11px] font-bold text-primary">
                  <span>Standar Atelier</span>
                  <span>•</span>
                  <span>Teruji Rapi</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
