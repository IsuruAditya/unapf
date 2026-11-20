import { NextResponse } from "next/server";
import { authConfigured, checkSecret, createSession, SESSION_COOKIE, type Role } from "@/lib/auth";

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }
  if (!authConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin sign-in is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET (32+ chars)." },
      { status: 503 },
    );
  }
  const { email = "", password = "" } = (await req.json().catch(() => ({}))) as Record<string, string>;
  const okEmail = await checkSecret(String(email), process.env.ADMIN_EMAIL!);
  const okPass = await checkSecret(String(password), process.env.ADMIN_PASSWORD!);
  if (!okEmail || !okPass) return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });

  const configured = process.env.ADMIN_ROLE;
  const role: Role = configured === "editor" || configured === "viewer" ? configured : "admin";
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSession(role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 8 * 3600,
  });
  return res;
}
