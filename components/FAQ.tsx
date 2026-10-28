"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/data/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("ketahanan");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="w-full py-20 bg-surface-container-low">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3.5 py-1 rounded-full text-xs font-bold text-on-surface">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Pusat Bantuan</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant">
            Punya pertanyaan mengenai ketahanan, proses kustomisasi, atau sistem pengiriman buket balon kami?
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-headline font-bold text-sm sm:text-base text-on-surface hover:text-primary transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-primary-fixed text-primary" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-on-surface-variant font-body leading-relaxed border-t border-outline-variant/30 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
