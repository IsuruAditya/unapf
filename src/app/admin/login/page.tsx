"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: f.get("email"), password: f.get("password") }),
    });
    const json = await res.json().catch(() => ({ error: "Unexpected error." }));
    setBusy(false);
    if (json.ok) router.replace("/admin");
    else setError(json.error);
  }

  const cls = "w-full border border-line bg-white px-3 py-2.5";
  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4 bg-white p-8 shadow-sm">
      <h1 className="text-2xl">Admin sign in</h1>
      <div>
        <label htmlFor="email" className="mb-1 block font-bold">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className={cls} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block font-bold">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={cls} />
      </div>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <button disabled={busy} className="w-full bg-brand py-3 font-bold uppercase text-white hover:bg-brand-dark disabled:opacity-60">
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
