import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import BouquetBuilder from "@/components/BouquetBuilder";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { formatRupiah } from "@/data/products";
import { canBuildBouquet, getStorefront, type Storefront } from "@/lib/storefront";
import { createWhatsAppConsultationLink } from "@/lib/whatsapp";

// Halaman dirender statis. Admin memicu revalidatePath("/") setiap menyimpan perubahan;
// revalidasi per jam hanya jaring pengaman bila data diubah langsung di database.
export const revalidate = 3600;

const minOf = (prices: number[]) => (prices.length ? Math.min(...prices) : null);
const minStemPrice = (s: Storefront) => (canBuildBouquet(s) ? minOf(s.flowerTypes.map((t) => t.pricePerStem)) : null);

export async function generateMetadata(): Promise<Metadata> {
  const price = minStemPrice(await getStorefront());
  const description = `Buket bunga dari balon handmade di Bengkulu. Pilih jenis bunga, jumlah, warna kelopak & tangkai, lihat harganya langsung, lalu pesan via WhatsApp.${
    price !== null ? ` Mulai ${formatRupiah(price)}.` : ""
  }`;
  return { description, openGraph: { description }, twitter: { description } };
}

export default async function Home() {
  const store = await getStorefront();

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero minStemPrice={minStemPrice(store)} minProductPrice={minOf(store.products.map((p) => p.price))} />
        <Catalog products={store.products} />
        {canBuildBouquet(store) ? (
          <BouquetBuilder
            flowerTypes={store.flowerTypes}
            pastelPetals={store.pastelPetals}
            chromePetals={store.chromePetals}
            stemColors={store.stemColors}
            ribbonColors={store.ribbonColors}
            minQty={store.minQty}
            maxQty={store.maxQty}
          />
        ) : (
          <section id="rakit" className="scroll-mt-20 bg-sky-pale py-16 text-center">
            <div className="mx-auto max-w-xl px-4">
              <h2 className="text-4xl font-extrabold text-brand-deep">Bikin Bunga Balon-mu</h2>
              <p className="mt-2 text-lg font-semibold text-brand-dark">Perakit bunga sedang kami perbarui. Chat kami untuk pesan bunga custom.</p>
              <a href={createWhatsAppConsultationLink()} target="_blank" rel="noopener noreferrer" className="btn-peach mt-6">
                <MessageCircle className="h-5 w-5" aria-hidden /> Chat WhatsApp
              </a>
            </div>
          </section>
        )}
        <HowToOrder />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
