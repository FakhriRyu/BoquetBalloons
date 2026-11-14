// Impor per-modul: barrel "jose" ikut menarik kode kompresi JWE yang tidak didukung runtime middleware.
import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

// Dipakai juga oleh middleware, jadi file ini tidak boleh mengimpor API khusus Node.

export const SESSION_COOKIE = "abb_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari, dalam detik

export function authConfigError(): string | null {
  if (!process.env.ADMIN_PASSWORD) return "ADMIN_PASSWORD belum diset di environment.";
  if ((process.env.SESSION_SECRET ?? "").length < 32) return "SESSION_SECRET belum diset (minimal 32 karakter).";
  return null;
}

// Password ikut jadi bagian kunci, sehingga mengganti ADMIN_PASSWORD otomatis mengeluarkan semua sesi lama.
function key() {
  if (authConfigError()) return null;
  return new TextEncoder().encode(`${process.env.SESSION_SECRET}:${process.env.ADMIN_PASSWORD}`);
}

export async function signSession(): Promise<string> {
  const k = key();
  if (!k) throw new Error(authConfigError()!);
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(k);
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const k = key();
  if (!k || !token) return false;
  try {
    const { payload } = await jwtVerify(token, k, { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false; // token kedaluwarsa, rusak, atau ditandatangani kunci lain
  }
}
