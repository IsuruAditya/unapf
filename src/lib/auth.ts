/** Minimal signed-cookie session (Web Crypto, works in proxy and route handlers). */
export const SESSION_COOKIE = "unpaf-admin";
export type Role = "admin" | "editor" | "viewer";

export const sections = [
  { key: "ambassadors", label: "Ambassadors", roles: ["admin", "editor"] },
  { key: "youth", label: "Youth ambassadors", roles: ["admin", "editor"] },
  { key: "events", label: "Events", roles: ["admin", "editor"] },
  { key: "gallery", label: "Gallery", roles: ["admin", "editor"] },
  { key: "membership_applications", label: "Membership applications", roles: ["admin", "viewer"] },
  { key: "partnership_applications", label: "Partnership applications", roles: ["admin", "viewer"] },
  { key: "contact_inquiries", label: "Contact inquiries", roles: ["admin", "viewer"] },
  { key: "content", label: "Website content", roles: ["admin", "editor"] },
] as const satisfies readonly { key: string; label: string; roles: readonly Role[] }[];

const enc = new TextEncoder();

export function authConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32);
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(process.env.ADMIN_SESSION_SECRET ?? ""), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

/** Constant-time credential comparison (compares HMACs of both values). */
export async function checkSecret(a: string, b: string) {
  return safeEqual(await hmac(`c:${a}`), await hmac(`c:${b}`));
}

export async function createSession(role: Role) {
  const exp = Date.now() + 8 * 3600_000;
  const payload = `${role}.${exp}`;
  return `${payload}.${await hmac(payload)}`;
}

export async function readSession(token: string | undefined): Promise<{ role: Role } | null> {
  if (!token || !authConfigured()) return null;
  const [role, exp, sig] = token.split(".");
  if (!role || !exp || !sig) return null;
  if (!safeEqual(sig, await hmac(`${role}.${exp}`))) return null;
  if (Number(exp) < Date.now()) return null;
  if (role !== "admin" && role !== "editor" && role !== "viewer") return null;
  return { role };
}
