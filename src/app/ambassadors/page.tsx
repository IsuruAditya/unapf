import type { Metadata } from "next";
import { AmbassadorCard, BoardCard } from "@/components/ambassadors/AmbassadorCard";
import { StripeBanner } from "@/components/ui/StripeBanner";
import { board, international, sriLanka } from "@/data/ambassadors";
import { getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Ambassadors", description: "UNPAF Board of Directors, international and Sri Lanka ambassadors." };

export default async function AmbassadorsPage() {
  const { t } = await getT();
  const more = t("amb.readMore");
  return (
    <>
      <h1 className="sr-only">{t("amb.title")}</h1>

      <StripeBanner lead={t("amb.lead")} title={t("amb.board")} />
      <section className="px-5 pb-14 pt-4">
        <div className="mx-auto grid max-w-[945px] justify-items-center gap-x-[85px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-start">
          {board.map((a) => (
            <BoardCard key={a.slug} a={a} label={more} />
          ))}
        </div>
      </section>

      <StripeBanner title={t("amb.lk")} lead={t("amb.lkNote")} leadPosition="after" />
      <section className="px-5 py-10">
        {sriLanka.length ? (
          <div className="mx-auto grid max-w-[922px] gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {sriLanka.map((a) => (
              <BoardCard key={a.slug} a={a} label={more} />
            ))}
          </div>
        ) : (
          <p className="text-center font-serif text-[15px] text-muted">{t("amb.lkEmpty")}</p>
        )}
      </section>

      <StripeBanner title={t("amb.intl")} lead={t("home.intro1")} leadPosition="after" />
      <section className="mx-[3.2%] bg-stone px-4 py-14">
        <div className="mx-auto grid max-w-[935px] gap-x-[11px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {international.map((a) => (
            <AmbassadorCard key={a.slug} a={a} label={more} />
          ))}
        </div>
      </section>
      <div className="h-8" />
    </>
  );
}
