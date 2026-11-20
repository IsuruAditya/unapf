import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlagBadge } from "@/components/ambassadors/FlagBadge";
import { Placeholder } from "@/components/ui/Placeholder";
import { StripeBanner } from "@/components/ui/StripeBanner";
import { allAmbassadors } from "@/data/ambassadors";
import { getT } from "@/i18n/server";

export function generateStaticParams() {
  return allAmbassadors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = allAmbassadors.find((x) => x.slug === slug);
  return { title: a ? a.name : "Ambassador", robots: { index: Boolean(a?.bio) } };
}

export default async function AmbassadorProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = allAmbassadors.find((x) => x.slug === slug);
  if (!a) notFound();
  const { t } = await getT();
  return (
    <>
      <StripeBanner as="h1" title={a.name} lead={a.credentials} leadPosition="after" />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-[922px] gap-10 md:grid-cols-[258px_1fr]">
          <div className="relative aspect-[238/233] w-full overflow-hidden">
            {a.photo ? (
              <Image src={a.photo} alt={a.name} fill sizes="258px" className="object-cover object-top" />
            ) : (
              <Placeholder label="Photo to be supplied" className="h-full w-full" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              {a.flag && <FlagBadge flag={a.flag} />}
              <ul className="font-serif text-[15px] text-muted">
                {a.roles.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-[15px] leading-[1.85] text-body">{a.bio ?? t("amb.bioPending")}</p>
            <Link
              href="/ambassadors"
              className="mt-8 inline-flex items-center rounded-[5px] bg-nav px-4 py-2 text-[15px] font-extrabold text-white transition-colors hover:bg-accent"
            >
              ← {t("amb.back")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
