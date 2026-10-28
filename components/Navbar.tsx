"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, Sparkles } from "lucide-react";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "#beranda" },
    { name: "Keunggulan", href: "#keunggulan" },
    { name: "Katalog Buket", href: "#katalog" },
    { name: "Kalkulator Custom", href: "#kalkulator" },
    { name: "Cara Pesan", href: "#cara-pesan" },
    { name: "Testimoni", href: "#testimoni" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-sm border-b border-outline-variant/40 py-3"
          : "bg-surface/75 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#beranda" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary-fixed">
              <Image
                src="/images/logo.png"
                alt="Pastel Bloom Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-primary tracking-tight group-hover:text-primary-container transition-colors">
                Pastel Bloom
              </span>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/80 -mt-1 font-medium">
                Balloon Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-lowest/80 px-4 py-1.5 rounded-full border border-outline-variant/50 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-primary-fixed/50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={createWhatsAppConsultationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-container hover:text-on-primary-container px-4 py-2 rounded-full text-xs font-bold transition-all shadow-glow hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi WA</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-on-surface hover:bg-surface-container lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-outline-variant px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-outline-variant/50">
              <a
                href={createWhatsAppConsultationLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-full text-sm font-bold shadow-glow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
