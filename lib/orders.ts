// Konstanta dan hitungan pesanan. Murni (dipakai server dan browser), diuji di lib/orders.test.ts.

export const ORDER_STATUSES = ["baru", "diproses", "siap", "selesai", "batal"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  baru: "Baru",
  diproses: "Diproses",
  siap: "Siap diambil",
  selesai: "Selesai",
  batal: "Batal",
};

export const STATUS_TONE: Record<OrderStatus, "blue" | "peach" | "green" | "gray"> = {
  baru: "blue",
  diproses: "peach",
  siap: "green",
  selesai: "gray",
  batal: "gray",
};

/** Pesanan yang masih perlu dikerjakan. */
export const ACTIVE_STATUSES: OrderStatus[] = ["baru", "diproses", "siap"];

export const orderNo = (n: number) => `#${String(n).padStart(4, "0")}`;

/** "0812-3456-7890" / "+62 812..." -> "6281234567890"; null bila terlalu pendek. */
export function waNumber(phone: string): string | null {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("0")) d = `62${d.slice(1)}`;
  return d.length >= 10 ? d : null;
}

export interface PricedLine {
  qty: number;
  unitPrice: number;
  /** HPP per unit */
  unitCost: number;
  /** biaya tambahan sekali per baris (kemasan buket) */
  extraCost: number;
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const lineSubtotal = (l: Pick<PricedLine, "qty" | "unitPrice">) => l.qty * l.unitPrice;
export const lineCost = (l: Pick<PricedLine, "qty" | "unitCost" | "extraCost">) => l.qty * l.unitCost + l.extraCost;
export const itemsSubtotal = (lines: Pick<PricedLine, "qty" | "unitPrice">[]) => sum(lines.map(lineSubtotal));
export const itemsCost = (lines: Pick<PricedLine, "qty" | "unitCost" | "extraCost">[]) => sum(lines.map(lineCost));

/** Total yang dibayar pelanggan. */
export const orderTotal = (subtotal: number, discount: number, shippingFee: number) => subtotal - discount + shippingFee;

/**
 * Laba kotor perkiraan: pendapatan dari item (setelah diskon) dikurangi HPP.
 * Ongkir tidak dihitung sebagai pendapatan karena biasanya diteruskan ke kurir.
 */
export const orderProfit = (o: { total: number; shippingFee: number }, cost: number) => o.total - o.shippingFee - cost;
