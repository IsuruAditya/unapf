"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { locales } from "@/i18n/dictionaries";
import { useT } from "@/i18n/client";
import type { Locale } from "@/types";

export function LanguageSwitcher() {
  const { locale, t } = useT();
  const router = useRouter();

  function change(code: Locale) {
    document.cookie = `unpaf-locale=${code}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <label className="flex items-center gap-1 text-[13px] font-semibold text-body">
      <Globe aria-hidden className="size-3.5 text-nav" />
      <span className="sr-only">{t("nav.language")}</span>
      <select
        value={locale}
        onChange={(e) => change(e.target.value as Locale)}
        className="cursor-pointer bg-transparent py-0.5 hover:text-nav"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
