"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { and, count, eq, gt, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb, hasDatabase, schema } from "@/db";
import { createSession, destroySession } from "@/lib/auth/dal";
import { authConfigError } from "@/lib/auth/session";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export type LoginState = { error?: string };

const digest = (s: string) => createHash("sha256").update(s).digest();

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const configError = authConfigError();
  if (configError) return { error: configError };

  // Tanpa database, pembatasan percobaan tidak bisa jalan: hanya diizinkan saat pengembangan lokal.
  const track = hasDatabase();
  if (!track && process.env.NODE_ENV === "production") return { error: "Database belum terhubung (DATABASE_URL)." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const since = new Date(Date.now() - LOCK_MINUTES * 60_000);
  const { loginAttempts } = schema;

  if (track) {
    const [{ n }] = await getDb()
      .select({ n: count() })
      .from(loginAttempts)
      .where(and(eq(loginAttempts.ip, ip), gt(loginAttempts.createdAt, since)));
    if (n >= MAX_ATTEMPTS) return { error: `Terlalu banyak percobaan. Coba lagi ${LOCK_MINUTES} menit lagi.` };
  }

  const password = String(formData.get("password") ?? "");
  const ok = timingSafeEqual(digest(password), digest(process.env.ADMIN_PASSWORD!));

  if (!ok) {
    if (track) await getDb().insert(loginAttempts).values({ ip });
    return { error: "Password salah." };
  }

  if (track) {
    await getDb().delete(loginAttempts).where(eq(loginAttempts.ip, ip));
    await getDb().delete(loginAttempts).where(lt(loginAttempts.createdAt, since));
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
