export interface Product {
  id: string;
  name: string;
  category: "Wisuda" | "Ulang Tahun" | "Anniversary" | "Opening Store";
  price: number;
  formattedPrice: string;
  badge?: string;
  image: string;
  description: string;
  features: string[];
  specs: {
    size: string;
    balloonType: string;
    flowerType: string;
    longevity: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "rosy-blossom",
    name: "Buket Balon 'Rosy Blossom'",
    category: "Wisuda",
    price: 185000,
    formattedPrice: "Rp 185.000",
    badge: "Terlaris",
    image: "/images/rosy-blossom.jpg",
    description: "Balon PVC transparan berhias mawar pastel, pita satin premium warna rose, dan lettering ucapan custom elegan.",
    features: [
      "Gratis custom tulisan/lettering nama",
      "Balon PVC premium anti kempis (3-7 hari)",
      "Bunga artificial pastel grade A",
      "Free greeting card eksklusif"
    ],
    specs: {
      size: "Tinggi ±55 cm, Diameter ±35 cm",
      balloonType: "PVC Crystal Clear 24 inch",
      flowerType: "Silk Pastel Roses & Baby's Breath",
      longevity: "3 - 7 Hari di suhu ruangan",
    },
  },
  {
    id: "pastel-blue-cloud",
    name: "Buket Balon 'Pastel Blue Cloud'",
    category: "Wisuda",
    price: 195000,
    formattedPrice: "Rp 195.000",
    badge: "Favorit Wisuda",
    image: "/images/pastel-blue.jpg",
    description: "Perpaduan balon nuansa biru pastel, hydrangeas awet, dan balon mini foil metalik untuk momen kelulusan berkesan.",
    features: [
      "Kombinasi warna soft sky blue & ivory",
      "Termasuk aksesoris mini foil star",
      "Bunga hydrangea silk premium",
      "Bisa request kartu ucapan custom"
    ],
    specs: {
      size: "Tinggi ±60 cm, Diameter ±40 cm",
      balloonType: "PVC Crystal + Latex Pastel Mini",
      flowerType: "Premium Silk Hydrangea",
      longevity: "4 - 7 Hari",
    },
  },
  {
    id: "sunny-garden-daisy",
    name: "Buket Balon 'Sunny Garden Daisy'",
    category: "Ulang Tahun",
    price: 175000,
    formattedPrice: "Rp 175.000",
    badge: "Ceria & Estetik",
    image: "/images/sunny-daisy.jpg",
    description: "Rangkaian balon daisy ceria dipadukan bunga chamomile artificial dan balon transparan bercahaya hangat.",
    features: [
      "Bentuk bunga daisy unik & menggemaskan",
      "Warna ceria kuning pastel & soft cream",
      "Cocok untuk ulang tahun sahabat & adik",
      "Bisa tambah lampu LED fairy lights"
    ],
    specs: {
      size: "Tinggi ±50 cm, Diameter ±35 cm",
      balloonType: "Latex Daisy Shape + PVC Base",
      flowerType: "Artificial Chamomile & Daisy",
      longevity: "3 - 5 Hari",
    },
  },
  {
    id: "sweet-graduation-teddy",
    name: "Buket Balon 'Sweet Graduation Teddy'",
    category: "Wisuda",
    price: 225000,
    formattedPrice: "Rp 225.000",
    badge: "Spesial Wisuda",
    image: "/images/graduation-teddy.jpg",
    description: "Buket balon wisuda spesial dengan boneka beruang mini berbalut toga wisuda eksklusif dan bunga segar artificial.",
    features: [
      "Termasuk boneka teddy bear toga wisuda",
      "Custom nama & gelar sarjana di balon",
      "Pita bordir wisuda khusus",
      "Packaging box kokoh aman dibawa"
    ],
    specs: {
      size: "Tinggi ±65 cm, Diameter ±42 cm",
      balloonType: "PVC Crystal Ball 24 inch",
      flowerType: "Graduation Mix Flowers & Teddy",
      longevity: "5 - 7 Hari",
    },
  },
  {
    id: "blushing-heart-box",
    name: "Buket Balon 'Blushing Heart Box'",
    category: "Anniversary",
    price: 250000,
    formattedPrice: "Rp 250.000",
    badge: "Romantis Premium",
    image: "/images/blushing-heart.jpg",
    description: "Balon hati melayang di atas round bloom box mewah dengan taburan bunga mawar merah muda dan LED fairy lights hangat.",
    features: [
      "Dilengkapi lampu LED fairy lights baterai",
      "Round bloom box kokoh velvet finish",
      "Bunga mawar nuansa blush pink & peach",
      "Sempurna untuk kado anniversary & lamaran"
    ],
    specs: {
      size: "Tinggi ±70 cm, Diameter Box 20 cm",
      balloonType: "Foil Heart Balloon + PVC Bubble",
      flowerType: "Velvet Blush Roses & Foliage",
      longevity: "5 - 10 Hari",
    },
  },
  {
    id: "pure-white-elegance",
    name: "Buket Balon 'Pure White Elegance'",
    category: "Opening Store",
    price: 210000,
    formattedPrice: "Rp 210.000",
    badge: "Minimalist Chic",
    image: "/images/white-elegance.jpg",
    description: "Konsep monokrom ivory & white minimalis untuk ucapan selamat peresmian toko, bridal shower, atau kado berkelas.",
    features: [
      "Palet warna ivory, white & gold foil touch",
      "Cocok sebagai properti foto studio",
      "Kesan clean, mewah, dan berkelas",
      "Bisa custom logo usaha di balon"
    ],
    specs: {
      size: "Tinggi ±58 cm, Diameter ±38 cm",
      balloonType: "Matte Latex & PVC Pearl White",
      flowerType: "White Peony & Baby's Breath",
      longevity: "4 - 7 Hari",
    },
  },
];
