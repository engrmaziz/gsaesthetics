import { NextResponse } from "next/server";
import { adminSecret, readSession, SESSION_COOKIE } from "@/lib/session";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const token = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`))?.split("=")[1];
  const ok = await readSession(token ? decodeURIComponent(token) : undefined, adminSecret());

  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login" && !ok) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if ((url.pathname.startsWith("/api/save-content") || url.pathname.startsWith("/api/upload")) && !ok) {
    return NextResponse.json({ success: false, error: "Sign in required" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/save-content", "/api/upload"] };
