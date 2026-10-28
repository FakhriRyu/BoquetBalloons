import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OccasionRail() {
  const occasions = [
    {
      title: "Ulang Tahun",
      image: "/images/occasion-birthday.jpg",
      alt: "Vibrant luxury scarlet rose bouquet with round clear balloon in red packaging for romantic birthday gifts",
    },
    {
      title: "Anniversary",
      image: "/images/occasion-anniversary.jpg",
      alt: "Elegant pastel pink and creamy white flower bouquet inside balloon box wrapped in soft lilac satin ribbon",
    },
    {
      title: "Wisuda & Lulus",
      image: "/images/occasion-graduation.jpg",
      alt: "Graduation celebration bouquet with mini teddy bear, graduation cap topper, sage eucalyptus and yellow baby breath balloons",
    },
    {
      title: "Grand Opening",
      image: "/images/occasion-opening.jpg",
      alt: "Grand opening congratulatory balloon standing arrangement with white lilies and emerald green foliage",
    },
    {
      title: "Welcoming Baby",
      image: "/images/occasion-baby.jpg",
      alt: "Soft baby blue and cream balloon bouquet with cute pastel stars and baby breath for welcoming newborn baby",
    },
    {
      title: "Just Because",
      image: "/images/occasion-justbecause.jpg",
      alt: "Sunflowers and daisy flower bouquet tied with rustic hemp cord and crystal confetti balloon",
    },
  ];

  return (
    <section id="momen-section" className="w-full py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-space-xs">
          <span className="text-[11px] font-semibold text-primary tracking-widest uppercase">
            Shop By Occasion
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-on-surface">
            Buket Balon untuk Setiap Momen
          </h2>
          <div className="w-12 h-1 bg-primary-fixed-dim rounded-full mt-1" />
        </div>

        {/* 6 Modular Occasion Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-md">
          {occasions.map((occ, idx) => (
            <Link
              key={idx}
              href="#katalog-populer"
              className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container">
                <Image
                  src={occ.image}
                  alt={occ.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              <div className="p-space-sm flex items-center justify-between text-on-surface group-hover:text-primary transition-colors">
                <span className="text-xs sm:text-sm font-semibold">{occ.title}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
