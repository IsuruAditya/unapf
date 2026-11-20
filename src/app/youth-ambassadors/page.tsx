import type { Metadata } from "next";
import { MapBox } from "@/components/ui/MapBox";
import Image from "next/image";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Youth Ambassadors", description: "UNPAF Youth Leadership Program." };

// Program content as published on the reference youth page.
const criteria = [
  ["Demonstrate a History of Leadership:", "Have actively led or participated in leadership roles within their school or community, showing initiative and responsibility."],
  ["Exhibit a Passion for Peacebuilding:", "Have a deep interest in promoting peace, whether through social justice initiatives, community service, or advocacy for conflict resolution."],
  ["Commit to Personal Growth:", "Are eager to develop and enhance their leadership skills, with a willingness to learn, adapt, and grow."],
  ["Engage in Community Service:", "Have a track record of involvement in community service projects, demonstrating a commitment to making a positive impact in their local or global communities."],
  ["Show Academic Dedication:", "Maintain a strong academic record, reflecting discipline, dedication, and the ability to balance multiple responsibilities."],
  ["Possess a Vision for the Future:", "Have a clear vision or goals for how they wish to apply their leadership skills in the future, especially in the context of promoting peace and unity."],
  ["Demonstrate Cultural Awareness:", "Show an understanding and appreciation of diverse cultures, and a desire to bridge gaps and build connections among different communities."],
];
const learn = [
  "Education about what it means to become a UN Peace Ambassador and how to become one",
  "A.I. Technology and Tools",
  "Choosing peace and why it is important",
  "The importance of having youth in peace advocacy",
  "Public speaking",
  "Advocacy through Social media",
];
const get = ["Awards based on life contributions", "Entertainment from cultural artists", "A booklet with details to refer back to"];

const event = {
  date: "Saturday, October 26th, 2024",
  time: "10:30 am – 4:00 pm",
  address: ["4000 No. 3 Rd, Richmond, BC", "V6X 0J8"],
  phone: "+1 (778) 980 - 3300",
  email: "admin@unpaf.info",
};

export default async function YouthPage() {
  const { t } = await getT();
  return (
    <div className="font-futura">
      <section className="bg-white px-5 pb-10 pt-10">
        <h1 className="text-center text-[38px] font-light text-muted md:text-[48px]">{t("youth.events")}</h1>
        <p className="mt-2 text-center font-serif text-[14px] text-muted">{t("youth.lkNote")}</p>
      </section>

      <section className="bg-[#d3d3d1] px-0 py-10 md:px-[4.75%] md:py-[57px]">
        <div className="grid md:grid-cols-[731fr_355fr]">
          <article className="bg-sand px-6 py-12 text-[15px] text-[#555] md:px-[103px] md:py-[78px] md:pr-[90px]">
            <h2 className="text-[28px] font-light text-muted md:text-[36px]">{event.date}</h2>
            <p className="mt-1 text-[21px] font-medium text-olive md:text-[24px]">{t("youth.eventTitle")}</p>

            <p className="mt-10 leading-[2.15]">{t("youth.intro")}</p>

            <h3 className="mt-8 text-[16px] font-bold text-[#555]">{t("youth.criteria")}</h3>
            <p className="mt-6">{t("youth.seeking")}</p>
            <ol className="list-decimal pl-[30px] leading-[1.7]">
              {criteria.map(([h, d]) => (
                <li key={h}>
                  <strong className="font-bold">{h}</strong>
                  <br />
                  {d}
                </li>
              ))}
            </ol>

            <p className="mt-10 leading-[2.15]">{t("youth.sponsor")}</p>
            <ul className="list-disc pl-[30px] leading-[1.7]">
              <li>
                {t("youth.learn")}
                <ul className="list-[circle] pl-[30px]">
                  <li>
                    About UNPAF through various speeches
                    <ul className="list-[square] pl-[30px]">
                      {learn.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                {t("youth.get")}
                <ul className="list-[circle] pl-[30px]">
                  {get.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </li>
              <li>
                {t("youth.bring")}
                <ul className="list-[circle] pl-[30px]">
                  <li>Something to take notes</li>
                </ul>
              </li>
              <li>
                {t("youth.speakers")}
                <ul className="list-[circle] pl-[30px]">
                  <li>Dr Anba, Joy, Zahed, Grace, Robbie, and Nikko</li>
                  <li>Special guest speaker: Eric</li>
                </ul>
              </li>
            </ul>

            <p className="mt-10 leading-[1.5]">
              <strong className="font-bold">*Disclaimer*</strong> {t("youth.disclaimer")}
            </p>
            <div className="mt-5">
              <SocialIcons networks={["facebook", "linkedin", "instagram"]} />
            </div>
          </article>
          <div className="relative min-h-[320px] w-full">
            <Image src="/media/youth/microphone.jpg" alt="Microphone in front of a conference audience" fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 pb-0 pt-8">
        <div className="mx-auto grid max-w-[900px] gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-[24px] font-semibold text-olive">{t("contact.address")}</h2>
            <address className="mt-4 font-serif text-[18px] not-italic leading-[1.85] text-muted">
              {event.address.map((l) => (
                <span key={l} className="block italic">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div>
            <h2 className="text-[24px] font-semibold text-olive">{t("youth.contact")}</h2>
            <p className="mt-5 font-serif text-[14px] italic text-muted">{event.phone}</p>
            <a href={`mailto:${event.email}`} className="mt-5 block font-serif text-[15px] text-black hover:underline">
              {event.email}
            </a>
            <div className="mt-12">
              <SocialIcons networks={["facebook", "x", "linkedin", "instagram"]} />
            </div>
          </div>
          <div>
            <h2 className="text-[24px] font-semibold text-olive">{t("youth.dateTime")}</h2>
            <p className="mt-5 text-[16px] text-muted">{event.date}</p>
            <p className="font-serif text-[14px] italic text-muted">{event.time}</p>
          </div>
        </div>
        <MapBox
          query={event.address.join(", ")}
          label={t("contact.openMap")}
          className="mx-auto mt-10 h-[335px] max-w-[1000px]"
        />
        <div className="h-1" />
      </section>
    </div>
  );
}
