import { MousePointerClick, MessageCircle, Gift } from "lucide-react";

const STEPS = [
  { icon: MousePointerClick, title: "Pilih & rakit", text: "Pilih dari katalog atau rakit bunga sendiri sampai harganya pas." },
  { icon: MessageCircle, title: "Kirim ke WhatsApp", text: "Tekan tombol pesan, detail pilihanmu terisi otomatis di chat." },
  { icon: Gift, title: "Konfirmasi & terima", text: "Kami konfirmasi ketersediaan dan pembayaran, lalu bunga siap diambil/dikirim." },
];

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="scroll-mt-20 bg-gingham py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-sticker mb-10 text-center text-5xl font-extrabold">Cara Pesan</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="polaroid p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-soft text-brand-dark">
                <s.icon className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="mt-4 text-2xl font-extrabold text-brand-deep">{i + 1}. {s.title}</h3>
              <p className="mt-1 font-semibold text-brand-dark">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
