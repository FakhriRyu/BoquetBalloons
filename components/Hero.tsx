import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gingham relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="text-center md:text-left">
          <p className="inline-block rounded-full bg-white/90 px-4 py-1 font-display text-base font-bold text-brand-dark shadow-soft">
            @adabalonbengkulu · Bengkulu
          </p>
          <h1 className="text-sticker mt-5 text-6xl font-extrabold leading-[0.95] sm:text-7xl">
            Buket Bunga
            <br />
            Balon
          </h1>
          <p className="mx-auto mt-6 max-w-md rounded-2xl bg-white/90 p-4 text-lg font-semibold text-brand-deep md:mx-0">
            Bunga dari balon yang dibuat handmade. Cantik buat kado, dekor, atau sekadar hadiah kecil. Mulai dari Rp 15.000 per tangkai.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start sm:justify-center">
            <a href="#rakit" className="btn-peach">Rakit Bunga-mu</a>
            <a href="#katalog" className="btn-blue">Lihat Katalog</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="polaroid animate-floaty p-3">
            <Image src="/images/catalog-20k.jpg" alt="Bunga balon biru dengan pita besar" width={900} height={1125} priority sizes="(max-width:768px) 80vw, 380px" className="rounded-3xl" />
          </div>
          <div className="badge-scallop absolute -right-4 -top-6 h-28 w-28 rotate-6 text-center text-2xl leading-none">
            <span><span className="block text-xs font-bold">Mulai</span>15K</span>
          </div>
        </div>
      </div>
    </section>
  );
}
