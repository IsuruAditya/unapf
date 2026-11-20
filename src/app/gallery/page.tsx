import type { Metadata } from "next";
import { GallerySlider } from "@/components/gallery/GallerySlider";
import Image from "next/image";
import { albums } from "@/data/gallery";
import { getT } from "@/i18n/server";
import type { GalleryAlbum } from "@/types";

export const metadata: Metadata = { title: "Gallery", description: "Photos from UNPAF events, including the launch in Colombo, Sri Lanka." };

const themeCls: Record<GalleryAlbum["theme"], string> = {
  sand: "bg-sand",
  stripes: "bg-stripes",
  white: "bg-white",
  stone: "bg-white",
};

export default async function GalleryPage() {
  const { t } = await getT();
  return (
    <>
      {/* Collage hero */}
      <section className="px-5 pb-16 pt-10 md:px-[6.4%]">
        <div className="grid items-center gap-8 md:grid-cols-[387fr_700fr]">
          <div className="relative aspect-[387/327] w-full overflow-hidden">
            <Image src="/media/gallery/hero.jpg" alt="People walking across a plaza, seen from above" fill priority sizes="(min-width:768px) 36vw, 100vw" className="object-cover" />
          </div>
          <div className="relative md:pl-[54px]">
            {/* Decorative strip continuing the collage photo, as on the reference. */}
            <div aria-hidden className="absolute -top-[76px] left-[-0.5%] hidden h-[77px] w-[250px] overflow-hidden md:block">
              <Image src="/media/gallery/hero.jpg" alt="" fill sizes="250px" className="object-cover object-top" />
            </div>
            <h1 className="text-[44px] text-nav md:text-[52px]">{t("gallery.title")}</h1>
            <p className="mt-10 font-serif text-[15px] text-muted">{t("gallery.intro")}</p>
          </div>
        </div>
      </section>

      {albums.map((a) => (
        <section key={a.id} className={`${themeCls[a.theme]} pb-8 pt-7`} aria-labelledby={`album-${a.id}`}>
          <h2
            id={`album-${a.id}`}
            className={`px-5 text-center text-[24px] font-semibold md:text-[28px] ${a.titleTone === "muted" ? "text-muted" : "text-ink"}`}
          >
            {a.title}
          </h2>
          {a.date && (
            <p className={`mt-2 text-center text-[16px] font-bold ${a.titleTone === "muted" ? "text-muted" : "text-ink"}`}>{a.date}</p>
          )}
          <div className={`mt-6 ${a.theme === "stone" ? "bg-stone py-0" : ""}`}>
            <GallerySlider title={a.title} photos={a.photos} />
          </div>
        </section>
      ))}
    </>
  );
}
