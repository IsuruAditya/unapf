import { cookies } from "next/headers";
import type { Locale } from "@/types";
import { isLocale, translate, type DictKey } from "./dictionaries";

export const LOCALE_COOKIE = "unpaf-locale";

export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(v) ? v : "en";
}

/** Server-side translator. */
export async function getT() {
  const locale = await getLocale();
  return { locale, t: (key: DictKey) => translate(locale, key) };
}
