import type { Metadata } from "next";
import Link from "next/link";
import { allAmbassadors } from "@/data/ambassadors";
import { albums } from "@/data/gallery";
import { nav } from "@/data/site";
import { getT } from "@/i18n/server";
import type { DictKey } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

/** Simple site search across pages, ambassadors and gallery albums. */
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { t } = await getT();
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const needle = q.toLowerCase();

  const index = [
    ...nav.map((n) => ({ href: n.href, title: t(`nav.${n.key}` as DictKey), kind: t("search.page") })),
    ...allAmbassadors.map((a) => ({ href: `/ambassadors/${a.slug}`, title: a.name, kind: a.roles.join(", ") })),
    ...albums.map((a) => ({ href: "/gallery", title: a.title, kind: t("nav.gallery") })),
  ];
  const results = needle ? index.filter((r) => `${r.title} ${r.kind}`.toLowerCase().includes(needle)) : [];

  return (
    <section className="mx-auto max-w-site px-5 py-14">
      <h1 className="text-[36px] text-muted">{t("search.title")}</h1>
      <form action="/search" role="search" className="mt-6 flex max-w-md gap-2">
        <label htmlFor="q" className="sr-only">
          {t("search.label")}
        </label>
        <input id="q" name="q" type="search" defaultValue={q} className="field-line bg-white" />
        <button className="rounded-[5px] bg-nav px-4 py-2 font-extrabold text-white hover:bg-accent">{t("search.label")}</button>
      </form>
      {q && (
        <p className="mt-6 text-[14px] text-muted" role="status">
          {results.length} {t("search.results")} “{q}”
        </p>
      )}
      <ul className="mt-4 divide-y divide-line">
        {results.map((r, i) => (
          <li key={`${r.href}-${i}`} className="py-3">
            <Link href={r.href} className="text-[17px] font-bold text-nav hover:underline">
              {r.title}
            </Link>
            <p className="font-serif text-[13px] text-muted">{r.kind}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
