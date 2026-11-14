// Tanggal toko selalu memakai WIB. Format ISO "YYYY-MM-DD" sama dengan kolom `date` Postgres.

const TZ = "Asia/Jakarta";

export function todayWIB(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T00:00:00Z`));
export const isMonth = (s: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(s);

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "2026-11" -> { start: "2026-11-01", end: "2026-12-01" } (end tidak termasuk) */
export function monthRange(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return { start: `${ym}-01`, end: new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10) };
}

export function shiftMonth(ym: string, n: number): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
}

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("id-ID", { timeZone: "UTC", ...opts });

export const formatMonth = (ym: string) => formatDate(`${ym}-01`, { month: "long", year: "numeric" });
