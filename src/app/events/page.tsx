import type { Metadata } from "next";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { events } from "@/data/gallery";
import { getT } from "@/i18n/server";
import type { DictKey } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "Events & Campaigns", description: "Upcoming and recent UNPAF events in Sri Lanka and worldwide." };

/** Same visual language as the reference youth event page, with the published event posters. */
export default async function EventsPage() {
  const { t, locale } = await getT();
  const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-LK" : locale, { dateStyle: "long", timeZone: "Asia/Colombo" });
  const when = (e: (typeof events)[number]) =>
    e.dateLabel ??
    (!e.date ? t("events.tbc") : e.endDate ? fmt.formatRange(new Date(e.date), new Date(e.endDate)) : fmt.format(new Date(e.date)));

  return (
    <div className="font-futura">
      <section className="bg-white px-5 pb-10 pt-10">
        <h1 className="text-center text-[38px] font-light text-muted md:text-[48px]">{t("events.title")}</h1>
        <p className="mt-2 text-center font-serif text-[14px] text-muted">{t("events.intro")}</p>
      </section>

      <section className="space-y-10 bg-[#d3d3d1] py-10 md:px-[4.75%] md:py-[57px]">
        {events.map((e) => (
          <article key={e.slug} className="grid md:grid-cols-[731fr_355fr]">
            <div className="bg-sand px-6 py-10 text-[15px] text-[#555] md:px-[103px] md:py-14">
              <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-olive">{t(`events.status.${e.status}` as DictKey)}</p>
              <h2 className="mt-2 text-[26px] font-light text-muted md:text-[34px]">{when(e)}</h2>
              <p className="mt-1 text-[21px] font-medium text-olive md:text-[24px]">{e.title}</p>
              <p className="mt-6 font-serif text-[15px] italic text-muted">{e.location}</p>
              <p className="mt-4 leading-[2]">{e.description}</p>
              {e.gallery?.map((src) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-block font-medium text-nav underline-offset-4 hover:underline"
                >
                  {t("events.viewDetails")}
                </a>
              ))}
              {e.registrationUrl ? (
                <a
                  href={e.registrationUrl}
                  className="mt-6 inline-block rounded-[6px] bg-accent px-6 py-2 text-[16px] font-bold text-white transition-colors hover:bg-nav"
                >
                  {t("events.register")}
                </a>
              ) : (
                e.status !== "past" && <p className="mt-6 font-medium text-nav">{t("events.regSoon")}</p>
              )}
            </div>
            <div className="bg-[#c9cac7]">
              {e.image ? (
                <Image
                  src={e.image}
                  alt={`${e.title} poster`}
                  width={1000}
                  height={1414}
                  sizes="(min-width:768px) 30vw, 100vw"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <Placeholder tone="dark" label={t("img.soon")} className="min-h-[260px]" />
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
