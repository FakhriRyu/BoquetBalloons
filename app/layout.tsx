import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buketbalon.vercel.app"),
  title: "Pastel Bloom Atelier | Handcrafted Floral & Balloon E-Commerce",
  description:
    "Rangkaian buket balon estetik dan bunga segar premium tahan 3-6 bulan. Same day delivery Jabodetabek, bebas custom tulisan nama & kartu ucapan.",
  keywords: [
    "Pastel Bloom",
    "Buket Balon",
    "Buket Balon Jakarta",
    "Hot Air Balloon Bouquet",
    "Kado Wisuda",
    "Kado Anniversary",
    "Florist Balon Jakarta",
  ],
  authors: [{ name: "Pastel Bloom Atelier" }],
  openGraph: {
    title: "Pastel Bloom Atelier | Handcrafted Floral & Balloon E-Commerce",
    description:
      "Say It Better With Balloons & Flowers. Rangkaian buket balon estetik dan bunga segar premium tahan 3-6 bulan. Same Day Delivery Jabodetabek.",
    url: "https://buketbalon.vercel.app",
    siteName: "Pastel Bloom Atelier",
    images: [
      {
        url: "/images/hero-main.jpg",
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
    title: "Pastel Bloom Atelier | Handcrafted Floral & Balloon E-Commerce",
    description:
      "Buket balon estetik tahan 3-6 bulan. Same Day Delivery Jabodetabek. Free custom lettering.",
    images: ["/images/hero-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`light ${montserrat.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface font-sans text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
        {children}
      </body>
    </html>
  );
}
