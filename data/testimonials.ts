export interface Testimonial {
  id: string;
  name: string;
  occasion: string;
  avatar: string;
  rating: number;
  comment: string;
  product: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Clarissa Aurelia",
    occasion: "Wisuda Sarjana UI",
    avatar: "CA",
    rating: 5,
    comment: "Buket balonnya cantik banget! Balonnya super jernih dan tulisan namanya rapi presisi. Teman-teman wisudawan pada salfok dan minta kontaknya. Recommended banget buat kado wisuda!",
    product: "Buket Balon 'Rosy Blossom'",
  },
  {
    id: "t2",
    name: "Dimas Pratama",
    occasion: "Anniversary 3rd Year",
    avatar: "DP",
    rating: 5,
    comment: "Pesan yang Blushing Heart Box buat pacar saya. Pas dibuka ada lampu LED-nya hangat banget. Pacar saya suka banget sampai terharu. Pengiriman pakai mobil juga on time dan aman.",
    product: "Buket Balon 'Blushing Heart Box'",
  },
  {
    id: "t3",
    name: "Nabila Saraswati",
    occasion: "Grand Opening Studio",
    avatar: "NS",
    rating: 5,
    comment: "Pesan custom buket putih dengan logo brand saya di balon. Hasil jadinya sangat mewah dan estetik di ruangan store. Udah hari ke-5 masih berdiri tegak balonnya. Puas banget!",
    product: "Buket Balon 'Pure White Elegance'",
  },
];
