import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

// Pemeriksaan cepat di depan. Halaman dan Server Action tetap memanggil requireAdmin() sendiri.
export async function middleware(req: NextRequest) {
  const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = req.nextUrl.pathname === "/admin/login";

  if (!authed && !isLogin) return NextResponse.redirect(new URL("/admin/login", req.url));
  if (authed && isLogin) return NextResponse.redirect(new URL("/admin", req.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
