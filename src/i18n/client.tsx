"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/types";
import { translate, type DictKey } from "./dictionaries";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useT() {
  const locale = useContext(LocaleContext);
  return useMemo(() => ({ locale, t: (key: DictKey) => translate(locale, key) }), [locale]);
}
