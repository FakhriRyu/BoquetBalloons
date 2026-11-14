import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const TITLE = "Ada Balon Bengkulu | Buket Bunga Balon Handmade";
const DESCRIPTION =
  "Buket bunga dari balon handmade di Bengkulu. Pilih jenis bunga, jumlah, warna kelopak & tangkai, lihat harganya langsung, lalu pesan via WhatsApp. Mulai Rp 15.000.";

export const metadata: Metadata = {
  metadataBase: new URL("https://buketbalon.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Ada Balon Bengkulu",
    "buket balon Bengkulu",
    "bunga balon",
    "balon pentil",
    "kado bunga balon",
    "adabalonbengkulu",
  ],
  authors: [{ name: "Ada Balon Bengkulu" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://buketbalon.vercel.app",
    siteName: "Ada Balon Bengkulu",
    images: [{ url: "/images/catalog-20k.jpg", width: 900, height: 1125, alt: "Buket bunga balon Ada Balon Bengkulu" }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/catalog-20k.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col selection:bg-sky selection:text-brand-deep">{children}</body>
    </html>
  );
}
