"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

interface BestSellerProduct {
  id: string;
  name: string;
  desc: string;
  price: string;
  originalPrice?: string;
  badge?: {
    text: string;
    variant: "primary" | "secondary";
  };
  note?: string;
  rating: string;
  reviews: string;
  image: string;
  alt: string;
}

export default function BestSellers() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const products: BestSellerProduct[] = [
    {
      id: "classic-velvet-rosy",
      name: "Classic Velvet Rosy",
      desc: "10 Tangkai Mawar Merah + Balon Pesan",
      price: "Rp 235.000",
      originalPrice: "Rp 265.000",
      badge: { text: "Same Day", variant: "secondary" },
      rating: "5.0",
      reviews: "142 ulasan",
      image: "/images/bestseller-classic-velvet.jpg",
      alt: "Classic red velvety roses nestled under a crystal clear balloon globe with golden ribbon bow",
    },
    {
      id: "blush-elegance-pink",
      name: "Blush Elegance Pink",
      desc: "Spray Rose Pastel & Balon Glitter",
      price: "Rp 195.000",
      badge: { text: "Best Seller", variant: "primary" },
      note: "Free Kartu Ucapan",
      rating: "4.9",
      reviews: "98 ulasan",
      image: "/images/bestseller-blush-elegance.jpg",
      alt: "Blush elegance bouquet with pastel pink spray roses, white carnations, lavender balloon dome",
    },
    {
      id: "sunshine-delight-bloom",
      name: "Sunshine Delight Bloom",
      desc: "Fresh Bunga Matahari + Pita Satin",
      price: "Rp 185.000",
      originalPrice: "Rp 210.000",
      rating: "5.0",
      reviews: "87 ulasan",
      image: "/images/bestseller-sunshine.jpg",
      alt: "Radiant sunflower flower arrangement with eucalyptus and round bubble balloon",
    },
    {
      id: "pure-pearl-seraphic",
      name: "Pure Pearl Seraphic",
      desc: "Casablanca Lily & Balon Mutiara",
      price: "Rp 280.000",
      note: "Bisa Custom Balon",
      rating: "4.9",
      reviews: "64 ulasan",
      image: "/images/bestseller-pure-pearl.jpg",
      alt: "Pure white lilies, cream preserved roses, and frosted pearl balloon arrangement",
    },
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-low" id="katalog-populer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-space-xl">
        {/* Split Catalog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <span className="text-[11px] font-semibold text-primary tracking-widest uppercase">
              Best Sellers
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-on-surface">
              Our Most Loved Bouquets
            </h2>
            <p className="text-sm text-on-surface-variant">
              Pilihan favorit pelanggan dengan rating tertinggi. Dirangkai dengan balon PVC berkualitas tinggi dan bunga segar pilihan.
            </p>
          </div>
          <Link
            href="#kustom-banner"
            className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-full bg-surface-container-highest text-on-surface text-xs font-semibold hover:bg-primary hover:text-on-primary transition-all self-start md:self-auto shadow-sm"
          >
            <span>Lihat Semua Katalog</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {products.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all p-3"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Simpan Favorit"
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center transition-colors ${
                      isFav ? "text-primary" : "text-on-surface hover:text-primary"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      favorite
                    </span>
                  </button>

                  {/* Optional Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white ${
                        product.badge.variant === "secondary" ? "bg-secondary" : "bg-primary"
                      }`}
                    >
                      {product.badge.text}
                    </span>
                  )}
                </div>

                <div className="pt-space-md pb-space-sm flex flex-col flex-1 justify-between gap-space-sm">
                  <div>
                    <div className="flex items-center gap-1 text-tertiary-container mb-1">
                      <span
                        className="material-symbols-outlined text-[16px] text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs font-semibold text-on-surface">
                        {product.rating}
                      </span>
                      <span className="text-[11px] text-outline">({product.reviews})</span>
                    </div>
                    <h3 className="text-base font-semibold text-on-surface">{product.name}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-1">{product.desc}</p>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="text-base font-semibold text-on-surface">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-outline line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      {product.note && (
                        <span className="text-[11px] text-secondary font-medium">
                          {product.note}
                        </span>
                      )}
                    </div>

                    <a
                      href={createWhatsAppOrderLink(product.name, product.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add_shopping_cart
                      </span>
                      <span>Pesan Sekarang</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
