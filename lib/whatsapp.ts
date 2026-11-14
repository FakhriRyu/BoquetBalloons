export const STORE_NAME = "Ada Balon Bengkulu";
export const INSTAGRAM_HANDLE = "adabalonbengkulu";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
export const WHATSAPP_DISPLAY = "0823-7312-8064";

export function getWhatsAppNumber(): string {
  const envNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6282373128064";
  return envNumber.replace(/[^0-9]/g, "");
}

function wa(message: string) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppOrderLink(productName: string, price: string): string {
  return wa(`Halo ${STORE_NAME}! 🌼\n\nSaya mau pesan:\n🌸 *${productName}*\n💰 Harga: ${price}\n\nApakah masih tersedia? Terima kasih!`);
}

export function createWhatsAppConsultationLink(): string {
  return wa(`Halo ${STORE_NAME}! 🌼\n\nSaya mau tanya-tanya soal buket bunga balon. Bisa dibantu?`);
}

export function createWhatsAppBouquetLink(d: {
  type: string;
  qty: number;
  petalColor: string;
  stemColor: string;
  ribbon: string;
  note: string;
  total: string;
}): string {
  const note = d.note.trim() ? `"${d.note.trim()}"` : "-";
  return wa(
    `Halo ${STORE_NAME}! 🌼\n\nSaya sudah rakit bunga balon di website dan mau pesan:\n\n🌸 *Jenis bunga:* ${d.type}\n🔢 *Jumlah:* ${d.qty} tangkai\n🎨 *Warna kelopak:* ${d.petalColor}\n🌿 *Warna tangkai:* ${d.stemColor}\n🎀 *Pita:* ${d.ribbon}\n📝 *Catatan:* ${note}\n\n💵 *Total:* ${d.total}\n\nMohon info ketersediaan & cara pembayarannya ya. Terima kasih!`
  );
}
