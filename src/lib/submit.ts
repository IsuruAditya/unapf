import { NextResponse } from "next/server";
import { forms, validate, type FormDef } from "./forms";
import { insertRow, storageConfigured } from "./storage";

const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 10 * 60_000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > LIMIT;
}

/** Shared POST handler for the public forms. */
export async function handleSubmission(req: Request, id: FormDef["id"]) {
  const def = forms[id];
  // Same-origin check against CSRF-style cross-site posts.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  // Honeypot: bots fill this hidden field. Pretend success without storing.
  if (typeof body.company_fax === "string" && body.company_fax) return NextResponse.json({ ok: true });

  const { errors, clean } = validate(def, body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "Please correct the highlighted fields.", fields: errors }, { status: 422 });

  if (!storageConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Submissions are not available yet because storage is not configured. Nothing was saved." },
      { status: 503 },
    );
  }
  try {
    await insertRow(def.table, clean);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "We could not save your submission. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
