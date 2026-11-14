import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import BouquetBuilder from "@/components/BouquetBuilder";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        <Catalog />
        <BouquetBuilder />
        <HowToOrder />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
