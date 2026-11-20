/**
 * Persistence via Supabase's REST API (no extra dependency).
 * When env vars are missing nothing is saved and callers must report that honestly.
 */
export function storageConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function insertRow(table: string, data: Record<string, string>) {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ data }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
}
