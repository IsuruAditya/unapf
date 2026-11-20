"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { useT } from "@/i18n/client";
import type { DictKey } from "@/i18n/dictionaries";
import { Emblem } from "@/components/ui/Emblem";
import { LanguageSwitcher } from "./LanguageSwitcher";

function AvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[26px]">
      <circle cx="12" cy="12" r="12" fill="#035772" />
      <circle cx="12" cy="9.5" r="4" fill="#fff" />
      <path d="M4.8 19.2c1.4-3 4.1-4.6 7.2-4.6s5.8 1.6 7.2 4.6A10 10 0 0 1 12 22a10 10 0 0 1-7.2-2.8z" fill="#fff" />
    </svg>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  const { t } = useT();
  return (
    <form action="/search" role="search" className={`relative ${className}`}>
      <label htmlFor="site-search" className="sr-only">
        {t("search.label")}
      </label>
      <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#626462]" />
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder={t("search.placeholder")}
        className="h-9 w-full rounded-lg border border-[#8a8c8a] bg-white pl-9 pr-3 text-sm text-ink placeholder:text-[#8a8c8a] focus:border-nav focus:outline-none"
      />
    </form>
  );
}

export function Header() {
  const { t } = useT();
  const pathname = usePathname();
  // Menu is "open" only for the path it was opened on, so navigation closes it.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggle = () => setOpenPath(open ? null : pathname);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const navBtn = (active: boolean) =>
    `block rounded-[5px] border px-[11px] py-[10px] text-[16px] font-bold leading-[1.1] tracking-[-0.02em] transition-colors duration-200 ${
      active
        ? "border-nav bg-white text-nav"
        : "border-nav bg-nav text-white hover:bg-white hover:text-nav"
    }`;

  return (
    <header className="relative z-40 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.18)]">
      {/* Top bar */}
      <div className="border-b-[5px] border-nav">
        <div className="mx-auto flex h-8 max-w-header items-center justify-between px-5">
          <p className="text-[15px] font-semibold text-body">{t("hero.welcome")}</p>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Branding row */}
      <div className="mx-auto flex max-w-header items-start justify-between gap-4 px-5 pt-4 md:pt-5">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
            <Emblem priority className="h-16 w-16 shrink-0 md:h-[112px] md:w-[112px]" />
            <span className="leading-[1.05] text-black">
              <span className="block text-[20px] font-bold md:text-[28px]">U.N.</span>
              <span className="block text-[14px] font-semibold md:text-[20px]">
                Peace
                <span className="md:block"> Ambassador</span>
                <span className="md:block"> Foundation</span>
              </span>
              <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-nav md:text-[12px]">
                Sri Lanka
              </span>
            </span>
          </Link>
          <span aria-hidden className="mx-10 hidden h-[70px] w-[2px] bg-black lg:block" />
          <p className="hidden text-[20px] font-semibold leading-[1.4] text-muted lg:block">
            Prosperity, peace and equality
            <br />
            for a healthy planet
          </p>
        </div>

        <div className="hidden items-center gap-4 pt-2 md:flex">
          <SearchBox className="w-[200px] lg:w-[228px]" />
          <Link href="/admin/login" className="flex items-center gap-2 font-serif text-[16px] text-teal hover:underline">
            <AvatarIcon />
            {t("nav.login")}
          </Link>
        </div>

        <button
          type="button"
          className="mt-3 rounded-[5px] bg-nav p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={toggle}
        >
          <span className="sr-only">{t("nav.menu")}</span>
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      {/* Primary nav: wraps like the Wix "wrap" menu mode */}
      <nav aria-label="Primary" className="mx-auto hidden max-w-[1180px] px-3 pb-4 pt-6 md:block">
        <ul className="flex flex-wrap justify-center gap-y-2">
          {nav.map((item) => (
            <li key={item.href} className="mx-[4px]">
              <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navBtn(isActive(item.href))}>
                {t(`nav.${item.key}` as DictKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="px-5 pb-5 pt-3 md:hidden">
          <SearchBox className="mb-3" />
          <ul className="grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navBtn(isActive(item.href))}>
                  {t(`nav.${item.key}` as DictKey)}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/admin/login" className="mt-4 flex items-center gap-2 font-serif text-teal">
            <AvatarIcon />
            {t("nav.login")}
          </Link>
        </nav>
      )}
      <div className="h-3 md:hidden" />
    </header>
  );
}
