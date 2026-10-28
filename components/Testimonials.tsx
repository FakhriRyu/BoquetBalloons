import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimoni" className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary-fixed px-3 py-1 rounded-full">
            Kisah Bahagia
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            Apa Kata Mereka yang Sudah Menerima Buket?
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant">
            Lebih dari 1.000+ buket balon terkirim untuk mewarnai senyum di hari paling berharga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-surface-container-lowest p-7 rounded-3xl border border-outline-variant/60 shadow-card flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-tertiary-container">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-tertiary text-tertiary" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/20" />
                </div>

                {/* Comment */}
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 border-t border-outline-variant/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-headline font-bold text-xs flex items-center justify-center shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-on-surface leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-primary font-medium">{t.occasion}</p>
                  <p className="text-[10px] text-on-surface-variant">{t.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
