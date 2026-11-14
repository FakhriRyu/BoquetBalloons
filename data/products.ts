export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  theme: "blue" | "pink" | "teal";
}

export const formatRupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

// Katalog Instagram @adabalonbengkulu
export const PRODUCTS: Product[] = [
  {
    id: "pink-simple",
    name: "Bunga Pink Simple",
    tagline: "Kelopak pink lembut + pita kecil, manis & simpel",
    price: 15000,
    image: "/images/catalog-15k.jpg",
    theme: "pink",
  },
  {
    id: "blue-curly",
    name: "Bunga Biru Keriting",
    tagline: "Kelopak biru pastel dengan pita besar",
    price: 20000,
    image: "/images/catalog-20k.jpg",
    theme: "blue",
  },
  {
    id: "chrome-premium",
    name: "Bunga Chrome Premium",
    tagline: "Balon chrome metalik, buket mewah banyak tangkai",
    price: 30000,
    image: "/images/catalog-30k.jpg",
    theme: "teal",
  },
];
