import Image from "next/image";
import { getT } from "@/i18n/server";
import type { DictKey } from "@/i18n/dictionaries";

const topics = [1, 2, 3, 4] as const;

/** Split section: tall image column (1/3) + 2x2 numbered topics, as on the reference. */
export async function CoreTopics() {
  const { t } = await getT();
  return (
    <section className="grid bg-sand lg:grid-cols-[1fr_2fr]">
      <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
        {/* The reference shows this photo softly blurred behind the topics. */}
        <Image
          src="/media/home/core-topics.jpg"
          alt=""
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="scale-110 object-cover blur-[6px]"
        />
      </div>
      <div className="px-5 py-12 md:px-16 lg:px-[90px] lg:pb-24 lg:pt-14">
        <h2 className="text-[34px] text-ink md:text-[50px]">{t("home.core")}</h2>
        <ul className="mt-6 grid gap-x-[70px] gap-y-14 md:grid-cols-2">
          {topics.map((n) => (
            <li key={n} className="max-w-[300px]">
              <span className="block text-[28px] font-extrabold leading-none text-nav">{String(n).padStart(2, "0")}</span>
              <h3 className="mt-3 min-h-[2.6em] text-[22px] font-bold leading-[1.45] text-ink">{t(`core.${n}.t` as DictKey)}</h3>
              <p className="mt-4 text-[15px] font-light leading-[1.85] text-[#3b3b3b]">{t(`core.${n}.d` as DictKey)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
