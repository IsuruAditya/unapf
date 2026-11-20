import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readSession, SESSION_COOKIE, sections } from "@/lib/auth";
import { storageConfigured } from "@/lib/storage";

export default async function AdminDashboard() {
  const session = await readSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  const persistence = storageConfigured();

  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Dashboard</h1>
        <form action="/api/admin/logout" method="post">
          <button className="border border-brand px-5 py-2 text-brand hover:bg-brand hover:text-white">Sign out</button>
        </form>
      </div>
      <p className="mt-2 text-muted">Signed in as <strong>{session.role}</strong>.</p>
      {!persistence && (
        <p role="status" className="mt-6 border-l-4 border-amber-600 bg-amber-50 p-4 text-amber-900">
          Persistence is not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY). Management screens are
          read-only placeholders and nothing can be saved yet.
        </p>
      )}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => {
          const allowed = (s.roles as readonly string[]).includes(session.role);
          return (
            <li key={s.key} className={`bg-white p-6 shadow-sm ${allowed ? "" : "opacity-50"}`}>
              <h2 className="text-lg">{s.label}</h2>
              <p className="mt-1 text-sm text-muted">
                {allowed ? (persistence ? "Management UI pending." : "Awaiting database configuration.") : "Not available for your role."}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
