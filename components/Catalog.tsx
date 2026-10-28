"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, Eye, CheckCircle2, X, Sparkles } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { createWhatsAppOrderLink } from "@/lib/whatsapp";

type CategoryFilter = "Semua" | "Wisuda" | "Ulang Tahun" | "Anniversary" | "Opening Store";

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: CategoryFilter[] = [
    "Semua",
    "Wisuda",
    "Ulang Tahun",
    "Anniversary",
    "Opening Store",
  ];

  const filteredProducts =
    activeCategory === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="katalog" className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary-fixed px-3 py-1 rounded-full">
            Katalog Pilihan
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            Katalog Buket Balon Terpopuler
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant">
            Pilih desain favoritmu atau jadikan inspirasi untuk pemesanan kustom sesuai tema acara spesial.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-headline font-bold whitespace-nowrap transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-glow scale-105"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/60 shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <div className="absolute top-3.5 left-3.5 bg-primary text-white text-[10px] font-headline font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                    {product.badge}
                  </div>
                )}

                {/* Category Pill Overlay */}
                <div className="absolute top-3.5 right-3.5 bg-surface/90 backdrop-blur-md text-on-surface text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline font-bold text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-headline font-extrabold text-xl text-primary">
                      {product.formattedPrice}
                    </span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      / paket lengkap
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/30">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-headline font-bold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Detail</span>
                  </button>

                  <a
                    href={createWhatsAppOrderLink(product.name, product.formattedPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-headline font-bold bg-primary text-white hover:bg-primary-container hover:text-on-primary-container shadow-sm transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Pesan WA</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-xl bg-surface rounded-3xl overflow-hidden shadow-2xl border border-outline-variant max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors shadow-md"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Product Preview Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-surface-container">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <span className="text-xs uppercase font-extrabold text-secondary tracking-widest">
                  Kategori: {selectedProduct.category}
                </span>
                <h3 className="font-headline font-extrabold text-2xl text-on-surface mt-1">
                  {selectedProduct.name}
                </h3>
                <p className="font-headline font-black text-2xl text-primary mt-2">
                  {selectedProduct.formattedPrice}
                </p>
                <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2 bg-surface-container-low p-4 rounded-2xl">
                <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-on-surface">
                  Keunggulan Paket Ini:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedProduct.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="border border-outline-variant/60 rounded-2xl p-4 text-xs space-y-2">
                <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-on-surface">
                  Spesifikasi Teknis:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-on-surface-variant">
                  <div>
                    <span className="font-semibold block text-on-surface">Dimensi Buket:</span>
                    <span>{selectedProduct.specs.size}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-on-surface">Material Balon:</span>
                    <span>{selectedProduct.specs.balloonType}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-on-surface">Rangkaian Bunga:</span>
                    <span>{selectedProduct.specs.flowerType}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-on-surface">Ketahanan Bentuk:</span>
                    <span>{selectedProduct.specs.longevity}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={createWhatsAppOrderLink(selectedProduct.name, selectedProduct.formattedPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white hover:bg-primary-container hover:text-on-primary-container py-3.5 rounded-full font-headline font-bold text-sm shadow-glow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan Sekarang via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
