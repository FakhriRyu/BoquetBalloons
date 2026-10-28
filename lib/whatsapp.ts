/**
 * Helper to build formatted WhatsApp URLs
 */
export function getWhatsAppNumber(): string {
  const envNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";
  return envNumber.replace(/[^0-9]/g, "");
}

export function createWhatsAppOrderLink(productName: string, price: string): string {
  const phone = getWhatsAppNumber();
  const message = `Halo Pastel Bloom! 🌸\n\nSaya ingin memesan buket balon:\n✨ *Produk:* ${productName}\n💰 *Harga:* ${price}\n\nApakah slot tanggal acara saya masih tersedia? Terima kasih!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppConsultationLink(topic?: string): string {
  const phone = getWhatsAppNumber();
  const message = topic
    ? `Halo Pastel Bloom! 🌸\n\nSaya ingin konsultasi mengenai: *${topic}*. Apakah bisa dibantu?`
    : `Halo Pastel Bloom! 🌸\n\nSaya ingin konsultasi kado buket balon untuk momen spesial saya. Bisa minta info ketersediaan slot dan rekomendasinya?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppCustomCalculatorLink(details: {
  size: string;
  balloonType: string;
  flowers: string;
  accessories: string[];
  customText: string;
  estimatedPrice: string;
}): string {
  const phone = getWhatsAppNumber();
  const accList = details.accessories.length > 0 ? details.accessories.join(", ") : "Tidak ada";
  const customText = details.customText.trim() ? `"${details.customText.trim()}"` : "(Belum diisi/Konsultasi)";

  const message = `Halo Pastel Bloom! 🌸\n\nSaya sudah mencoba *Custom Order Calculator* di website dan ingin memesan rangkaian ini:\n\n🎈 *Ukuran Balon:* ${details.size}\n🔮 *Jenis Balon:* ${details.balloonType}\n💐 *Rangkaian Bunga:* ${details.flowers}\n🎀 *Aksesoris Tambahan:* ${accList}\n✍️ *Tulisan di Balon:* ${customText}\n\n💵 *Estimasi Total:* ${details.estimatedPrice}\n\nMohon info ketersediaan slot tanggal acara dan detail pemesanannya ya, terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
