import { ActionSlideshow } from "@/components/home/ActionSlideshow";
import { CoreTopics } from "@/components/home/CoreTopics";
import { actionSlides } from "@/data/gallery";
import { getT } from "@/i18n/server";

export default async function HomePage() {
  const { t } = await getT();
  return (
    <>
      <h1 className="sr-only">{t("hero.region")}</h1>

      {/* Video + slideshow on the soft page background */}
      <section className="px-5 pb-0 pt-6">
        <h2 className="text-center text-[26px] text-muted md:text-[30px]">{t("home.becoming")}</h2>
        <video
          controls
          playsInline
          preload="none"
          poster="/media/home/video-poster.jpg"
          aria-label={t("home.becoming")}
          className="mx-auto mt-3 block aspect-[620/350] w-full max-w-[620px] bg-black object-cover"
        >
          <source src="/media/home/becoming-a-peace-ambassador.mp4" type="video/mp4" />
        </video>
        <h2 className="mt-5 text-center text-[26px] text-muted md:text-[30px]">{t("home.action")}</h2>
        <div className="mx-auto mt-3 max-w-[795px]">
          <ActionSlideshow items={actionSlides} />
        </div>
      </section>

      {/* Mission statement box + body copy on white */}
      <section className="mt-2 bg-white px-5 pb-10">
        <p className="mx-auto max-w-[970px] rounded-[20px] bg-accent px-6 py-5 text-center text-[18px] font-bold leading-[1.22] text-white md:px-[140px] md:text-[22px]">
          {t("home.intro1")}
        </p>
        <span aria-hidden className="mx-auto mt-5 block h-[3px] w-10 bg-black" />
        <div className="mx-auto mt-14 max-w-[925px] space-y-[1.8em] text-[16px] font-normal leading-[1.8] text-[#2b2b2b] md:text-[19px]">
          <p>{t("home.mission")}</p>
          <p>
            {t("home.org.pre")} <strong className="font-bold text-black">&quot;{t("footer.motto")}&quot;</strong> {t("home.org.post")}
          </p>
          <p>{t("home.network")}</p>
          <p>{t("home.lk")}</p>
          <p>{t("home.invite")}</p>
        </div>
      </section>

      <CoreTopics />
    </>
  );
}
