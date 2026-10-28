import type { Metadata } from "next";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pastelbloom.vercel.app"),
  title: "Pastel Bloom | Atelier Kado Buket Balon & Bunga Artistik",
  description:
    "Katalog buket balon estetik, balon PVC tebal tahan 3-7 hari, gratis custom tulisan nama/gelar wisuda & greeting card. Siap kirim aman wilayah Jabodetabek.",
  keywords: [
    "buket balon",
    "kado wisuda",
    "balloon bouquet jakarta",
    "buket balon estetik",
    "balon pvc transparan",
    "florist buket balon",
    "pastel bloom",
  ],
  authors: [{ name: "Pastel Bloom Atelier" }],
  openGraph: {
    title: "Pastel Bloom | Atelier Kado Buket Balon & Bunga Artistik",
    description:
      "Kado buket balon bunga estetik untuk momen wisuda, lamaran, ulang tahun, dan perayaan manis. Bisa custom nama & model secara instan.",
    url: "https://pastelbloom.vercel.app",
    siteName: "Pastel Bloom Atelier",
    images: [
      {
        url: "/images/hero-bouquet.jpg",
        width: 1200,
        height: 630,
        alt: "Pastel Bloom Handcrafted Bouquet",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pastel Bloom | Atelier Kado Buket Balon",
    description:
      "Buket balon estetik PVC tebal tahan 3-7 hari. Free lettering nama & greeting card.",
    images: ["/images/hero-bouquet.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${epilogue.variable} ${plusJakarta.variable}`}>
      <body className="font-body bg-background text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
      </body>
    </html>
  );
}
