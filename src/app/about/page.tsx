import type { Metadata } from "next";
import Image from "next/image";
import { getT } from "@/i18n/server";
import type { DictKey } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "About Us", description: "Who we are: UNPAF Sri Lanka." };

const orgFacts: DictKey[] = ["about.f1", "about.f2", "about.f3", "about.f4", "about.f5", "about.f6"];

// The 17 UN Sustainable Development Goals (public titles), images from the reference.
const sdgs = [
  "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education", "Gender Equality",
  "Clean Water and Sanitation", "Affordable and Clean Energy", "Decent Work and Economic Growth",
  "Industry, Innovation and Infrastructure", "Reduced Inequalities", "Sustainable Cities and Communities",
  "Responsible Consumption and Production", "Climate Action", "Life Below Water", "Life on Land",
  "Peace, Justice and Strong Institutions", "Partnerships for the Goals",
];

export default async function AboutPage() {
  const { t } = await getT();
  return (
    <>
      {/* Intro */}
      <section className="px-5 pb-12 pt-10">
        <h1 className="text-center text-[44px] text-muted md:text-[64px]">{t("about.title")}</h1>
        <div className="mx-auto mt-10 max-w-[785px]">
          <p className="text-center text-[17px] font-medium text-[#3b3b3b] md:text-[18px]">{t("about.headline")}</p>
          <div className="mt-1 space-y-[1.4em] text-[15px] font-light leading-[1.55] text-muted">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
          <p className="mt-10 text-center font-serif text-[17px] tracking-tight text-[#3b3b3b]">{t("about.motto")}</p>
        </div>
      </section>

      {/* About the Organization: heading | facts | rotating globe */}
      <section className="mx-auto grid max-w-[1180px] items-center gap-8 px-5 pb-12 md:grid-cols-[1fr_1fr] lg:grid-cols-[400px_1fr_360px] lg:px-[50px]">
        <h2 className="text-[38px] leading-[1.2] text-muted md:text-[48px]">
          {t("about.orgTitle.1")}
          <br />
          {t("about.orgTitle.2")}
          <br />
          {t("about.orgTitle.3")}
        </h2>
        <ul className="list-disc space-y-1 pl-4 text-[17px] font-light leading-[1.4] text-muted">
          {orgFacts.map((k) => (
            <li key={k}>{t(k)}</li>
          ))}
        </ul>
        <div className="relative aspect-[340/290] w-full overflow-hidden bg-[#7d7d7d] md:col-span-2 lg:col-span-1">
          {/* Animated WebP: served unoptimized so the animation is preserved. */}
          <Image src="/media/about/globe.webp" alt="Globe rotating" fill unoptimized className="object-cover" />
        </div>
      </section>

      {/* Checkerboard: image | text / text | image */}
      <section className="grid border-y border-[#8a8c8a] md:grid-cols-2">
        <div className="relative aspect-[600/400] w-full md:border-r md:border-[#8a8c8a]">
          <Image src="/media/about/learning.jpg" alt="A mentor and a student working together at a computer" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center bg-sand px-8 py-12 text-center lg:px-[110px]">
          <h2 className="text-[24px] font-bold text-muted md:text-[26px]">{t("about.learning")}</h2>
          <p className="mt-6 text-[15px] font-light leading-[1.85] text-muted">{t("about.learningText")}</p>
        </div>
        <div className="order-4 flex flex-col items-center justify-center border-t border-[#8a8c8a] bg-sand px-8 py-12 text-center md:order-none md:border-r lg:px-[110px]">
          <h2 className="text-[24px] font-bold text-muted underline underline-offset-4 md:text-[26px]">{t("about.diverse")}</h2>
          <p className="mt-6 text-[15px] font-light leading-[1.85] text-muted">{t("about.diverseText")}</p>
        </div>
        <div className="relative order-3 aspect-[600/400] w-full overflow-hidden border-t border-[#8a8c8a] md:order-none">
          {/* Blurred flags, as on the reference. */}
          <Image src="/media/about/diverse.jpg" alt="Flags of many nations" fill sizes="(min-width:768px) 50vw, 100vw" className="scale-110 object-cover blur-[10px]" />
        </div>
      </section>

      {/* SDGs */}
      <section className="px-5 pb-20 pt-10 md:px-[1.6%]">
        <h2 className="mx-auto max-w-[800px] text-center text-[34px] leading-[1.35] text-ink md:text-[52px]">{t("about.sdg")}</h2>
        <ul className="mt-6 grid grid-cols-2 gap-[19px] md:grid-cols-3 lg:grid-cols-4">
          {sdgs.map((goal, i) => (
            <li key={goal} className="flex flex-col">
              <div className="relative aspect-[276/235] w-full overflow-hidden">
                <Image
                  src={`/media/about/sdg-${String(i + 1).padStart(2, "0")}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="flex min-h-[145px] justify-center bg-ink px-3 pt-4 text-center text-[17px] font-medium text-white md:text-[22px]">
                {i + 1}. {goal}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
