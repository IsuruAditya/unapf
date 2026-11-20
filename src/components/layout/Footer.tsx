import Link from "next/link";
import { site } from "@/data/site";
import { getT } from "@/i18n/server";
import { Emblem } from "@/components/ui/Emblem";

/** Centered emblem + wordmark on a paper texture, as on the reference. */
export async function Footer() {
  const { t } = await getT();
  return (
    <footer className="bg-paper">
      <div className="mx-auto flex max-w-site flex-col items-center px-5 pb-8 pt-12">
        <Link href="/" className="flex items-center gap-4" aria-label={`${site.name} home`}>
          <Emblem className="h-20 w-20 md:h-[112px] md:w-[112px]" />
          <span className="text-black">
            <span className="block text-[30px] font-bold leading-none md:text-[38px]">U.N.</span>
            <span className="mt-3 block text-[16px] font-semibold md:text-[20px]">Peace Ambassador Foundation — Sri Lanka</span>
          </span>
        </Link>
        <p className="mt-8 text-center text-[11px] font-semibold text-black">{t("footer.ngo")}</p>
        <p className="mt-2 max-w-2xl text-center text-[11px] text-muted">
          © {new Date().getFullYear()} {site.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
