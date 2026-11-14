import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySessionToken } from "./session";

export const isAuthenticated = cache(async () => verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value));

/** Panggil di awal setiap halaman admin DAN setiap Server Action: action bisa dipanggil langsung tanpa lewat middleware. */
export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

export async function createSession() {
  (await cookies()).set(SESSION_COOKIE, await signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
