import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSecret, SESSION_COOKIE, signSession } from "@/lib/session";

export async function POST(request: Request) {
  const secret = adminSecret();
  if (!secret) {
    return NextResponse.json(
      { success: false, error: "Set ADMIN_PASSWORD in the environment before signing in." },
      { status: 500 },
    );
  }
  const { password } = await request.json();
  if (password !== secret) {
    return NextResponse.json({ success: false, error: "Wrong password" }, { status: 401 });
  }
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const token = await signSession(exp, secret);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return NextResponse.json({ success: true });
}
