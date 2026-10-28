"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, MessageCircle, Check, Info } from "lucide-react";
import { createWhatsAppCustomCalculatorLink } from "@/lib/whatsapp";

interface BalloonOption {
  id: string;
  label: string;
  desc: string;
  price: number;
}

export default function CustomCalculator() {
  const sizeOptions: BalloonOption[] = [
    { id: "18", label: "18 inch (Compact)", desc: "Cocok untuk meja & foto personal", price: 150000 },
    { id: "24", label: "24 inch (Favorit)", desc: "Ukuran standar buket paling proporsional", price: 185000 },
    { id: "36", label: "36 inch (Jumbo)", desc: "Mewah & megah untuk momen akbar", price: 275000 },
  ];

  const typeOptions: BalloonOption[] = [
    { id: "pvc", label: "PVC Crystal Clear", desc: "Bening transparan elegan", price: 0 },
    { id: "pastel", label: "Pastel Matte Latex", desc: "Warna pastel doff lembut", price: 10000 },
    { id: "chrome", label: "Chrome Foil Metallic", desc: "Kilau metalik modern", price: 25000 },
  ];

  const flowerOptions: BalloonOption[] = [
    { id: "artificial", label: "Artificial Silk Pastel", desc: "Tahan selamanya & awet", price: 0 },
    { id: "fresh", label: "Fresh Flowers Asli", desc: "Aroma segar alami momen spesial", price: 45000 },
    { id: "preserved", label: "Dried & Preserved Mix", desc: "Bunga kering estetik bernuansa earthy", price: 35000 },
  ];

  const accessoryOptions = [
    { id: "led", label: "Fairy Lights LED (Warm Glow)", price: 20000 },
    { id: "teddy", label: "Boneka Wisuda Mini Teddy", price: 35000 },
    { id: "foil-stars", label: "Balon Mini Bintang/Hati", price: 15000 },
    { id: "satin-ribbon", label: "Pita Satin Bordir Nama Eksklusif", price: 20000 },
  ];

  const [selectedSize, setSelectedSize] = useState<BalloonOption>(sizeOptions[1]);
  const [selectedType, setSelectedType] = useState<BalloonOption>(typeOptions[0]);
  const [selectedFlower, setSelectedFlower] = useState<BalloonOption>(flowerOptions[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(["led"]);
  const [customText, setCustomText] = useState("");

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate Total
  const accessoriesTotal = selectedAccessories.reduce((sum, accId) => {
    const acc = accessoryOptions.find((a) => a.id === accId);
    return sum + (acc ? acc.price : 0);
  }, 0);

  const totalPrice =
    selectedSize.price + selectedType.price + selectedFlower.price + accessoriesTotal;

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const accessoryLabels = selectedAccessories.map(
    (id) => accessoryOptions.find((a) => a.id === id)?.label || ""
  );

  const whatsappLink = createWhatsAppCustomCalculatorLink({
    size: selectedSize.label,
    balloonType: selectedType.label,
    flowers: selectedFlower.label,
    accessories: accessoryLabels,
    customText,
    estimatedPrice: formattedTotal,
  });

  return (
    <section id="kalkulator" className="w-full py-20 bg-gradient-to-b from-surface via-surface-container-low to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed-variant px-3.5 py-1 rounded-full text-xs font-bold">
            <Calculator className="w-3.5 h-3.5 text-secondary" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface">
            Custom Order Calculator
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant">
            Rakit buket impianmu sendiri! Pilih ukuran balon, jenis bunga, serta aksesori tambahan dan lihat kalkulasi estimasi harganya secara transparan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configurator Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/60 shadow-card space-y-8">
            {/* Step 1: Size */}
            <div>
              <label className="font-headline font-bold text-sm text-on-surface flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-xs flex items-center justify-center font-extrabold">
                  1
                </span>
                <span>Pilih Ukuran Balon:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSize(opt)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedSize.id === opt.id
                        ? "border-primary bg-primary-fixed/30 ring-2 ring-primary/30"
                        : "border-outline-variant/60 hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="font-headline font-bold text-xs text-on-surface">{opt.label}</div>
                    <div className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-1">{opt.desc}</div>
                    <div className="text-xs font-bold text-primary mt-2">
                      Rp {opt.price.toLocaleString("id-ID")}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Balloon Type */}
            <div>
              <label className="font-headline font-bold text-sm text-on-surface flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-xs flex items-center justify-center font-extrabold">
                  2
                </span>
                <span>Pilih Material & Gaya Balon:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedType(opt)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedType.id === opt.id
                        ? "border-primary bg-primary-fixed/30 ring-2 ring-primary/30"
                        : "border-outline-variant/60 hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="font-headline font-bold text-xs text-on-surface">{opt.label}</div>
                    <div className="text-[11px] text-on-surface-variant mt-0.5">{opt.desc}</div>
                    <div className="text-xs font-bold text-primary mt-2">
                      {opt.price === 0 ? "Termasuk" : `+Rp ${opt.price.toLocaleString("id-ID")}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Flowers */}
            <div>
              <label className="font-headline font-bold text-sm text-on-surface flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-xs flex items-center justify-center font-extrabold">
                  3
                </span>
                <span>Rangkaian Bunga & Isian:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {flowerOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedFlower(opt)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedFlower.id === opt.id
                        ? "border-primary bg-primary-fixed/30 ring-2 ring-primary/30"
                        : "border-outline-variant/60 hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="font-headline font-bold text-xs text-on-surface">{opt.label}</div>
                    <div className="text-[11px] text-on-surface-variant mt-0.5">{opt.desc}</div>
                    <div className="text-xs font-bold text-primary mt-2">
                      {opt.price === 0 ? "Termasuk" : `+Rp ${opt.price.toLocaleString("id-ID")}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Accessories */}
            <div>
              <label className="font-headline font-bold text-sm text-on-surface flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-xs flex items-center justify-center font-extrabold">
                  4
                </span>
                <span>Aksesori & Sentuhan Tambahan:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {accessoryOptions.map((acc) => {
                  const isChecked = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? "border-secondary bg-secondary-fixed/30 ring-1 ring-secondary/30"
                          : "border-outline-variant/50 hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked ? "bg-secondary border-secondary text-white" : "border-outline"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-medium text-on-surface">{acc.label}</span>
                      </div>
                      <span className="text-[11px] font-bold text-secondary">
                        +Rp {acc.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Custom Lettering */}
            <div>
              <label className="font-headline font-bold text-sm text-on-surface flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary text-xs flex items-center justify-center font-extrabold">
                    5
                  </span>
                  <span>Tulisan / Lettering di Balon (Gratis):</span>
                </span>
                <span className="text-[11px] text-primary font-bold">Free Request</span>
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Contoh: Happy Graduation Jessica, S.Ked 🎓"
                className="w-full px-4 py-3 rounded-2xl border border-outline-variant bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Real-time Order Summary Card */}
          <div className="lg:col-span-5 sticky top-24 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/50 pb-4">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Ringkasan Desain Custom
              </h3>
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>

            {/* Config List */}
            <div className="space-y-3 text-xs text-on-surface-variant">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span>Ukuran Balon</span>
                <span className="font-bold text-on-surface">{selectedSize.label}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span>Jenis Balon</span>
                <span className="font-bold text-on-surface">{selectedType.label}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span>Pilihan Bunga</span>
                <span className="font-bold text-on-surface">{selectedFlower.label}</span>
              </div>
              <div className="py-1.5 border-b border-outline-variant/30">
                <div className="flex justify-between mb-1">
                  <span>Aksesori Tambahan</span>
                  <span className="font-bold text-secondary">
                    {selectedAccessories.length} Dipilih
                  </span>
                </div>
                {selectedAccessories.length > 0 && (
                  <ul className="list-disc list-inside text-[11px] text-on-surface-variant/80 pl-1">
                    {accessoryLabels.map((lbl, i) => (
                      <li key={i}>{lbl}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span>Custom Tulisan</span>
                <span className="font-bold text-primary truncate max-w-[180px]">
                  {customText.trim() ? customText : "(Bisa konsultasikan di WA)"}
                </span>
              </div>
            </div>

            {/* Total Price Display */}
            <div className="bg-primary-fixed/30 p-5 rounded-2xl border border-primary/20 text-center">
              <span className="text-[11px] uppercase tracking-wider text-on-primary-fixed-variant font-bold block mb-1">
                Estimasi Total Biaya
              </span>
              <span className="font-headline font-black text-3xl sm:text-4xl text-primary">
                {formattedTotal}
              </span>
              <span className="text-[10px] text-on-surface-variant block mt-1">
                *Sudah termasuk kartu ucapan & kemasan box proteksi
              </span>
            </div>

            {/* WhatsApp Direct Order CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-white hover:bg-primary-container hover:text-on-primary-container py-4 rounded-full font-headline font-bold text-sm shadow-glow transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pesan Desain Ini ke WhatsApp</span>
            </a>

            <div className="flex items-center gap-2 text-[11px] text-on-surface-variant justify-center">
              <Info className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>Format pesanan akan otomatis terisi di chat WhatsApp.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
