"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function AnnouncementHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Katalog", href: "#katalog-populer" },
    { name: "Custom Buket", href: "#kustom-banner" },
    { name: "Momen Acara", href: "#momen-section" },
    { name: "Ulasan", href: "#katalog-populer" },
    { name: "Kontak", href: "#kontak-footer" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Secondary Announcement Bar */}
      <div className="bg-secondary text-on-secondary px-gutter py-space-xs text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-space-sm text-[11px] font-semibold tracking-wider uppercase">
          <span className="material-symbols-outlined text-[14px]">local_shipping</span>
          <span>Same Day Delivery Jabodetabek • Kualitas Premium Balon Tahan 3-6 Bulan</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-space-md">
          {/* Brand Logo */}
          <Link href="#" className="flex items-center gap-space-sm group">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">filter_vintage</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg tracking-tight text-on-surface leading-tight">
                Pastel Bloom
              </span>
              <span className="text-[11px] tracking-widest text-outline uppercase font-medium">
                Atelier Bunga &amp; Balon
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-space-md font-medium text-sm text-on-surface-variant">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors px-space-sm py-space-xs"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Cari Produk"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              aria-label="Keranjang Belanja"
              href={createWhatsAppConsultationLink("Cek Keranjang Belanja")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center px-1 shadow-sm">
                2
              </span>
            </a>

            <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant px-6 py-4 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-semibold text-on-surface hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-outline-variant/40">
              <a
                href={createWhatsAppConsultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-full text-sm font-bold shadow-md"
              >
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
