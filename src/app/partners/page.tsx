import type { Metadata } from "next";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { FormHero } from "@/components/layout/FormHero";
import { getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Become a Partner", description: "Partner with UNPAF Sri Lanka." };

const eligibility = [
  "Organisation should be officially registered.",
  "It should be substantially committed towards the Peace development and Sustainment.",
  "Deliberate to promote the Peace Mission of U.N.PAF",
];
const expect = [
  "You must be highly equipped to host the delegates of Peace Ambassador Foundation in your country.",
  "To arrange a Global Peace Summit in your country must be in your high capacity.",
  "You must be capable enough to organize the peace activities with in your communities.",
  "You must be able to conduct a press conference upon the visit of Peace Ambassador delegate.",
];

export default async function PartnersPage() {
  const { t } = await getT();
  return (
    <>
      <FormHero tone="cubes" title={t("partners.heading")} goal={t("join.goal")}>
        <p className="mt-4 text-[#2b2b2b]">{t("partners.intro")}</p>
      </FormHero>

      <section className="bg-white px-5 pb-16 pt-10">
        <div className="mx-auto grid max-w-[800px] gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[15.5px] font-semibold text-black">{t("partners.eligibility")}</h2>
            <ul className="mt-2 list-disc pl-7 font-serif text-[14px] leading-[1.55] text-[#777]">
              {eligibility.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[15.5px] font-semibold text-black">{t("partners.expect")}</h2>
            <ul className="mt-2 list-disc pl-7 font-serif text-[14px] leading-[1.55] text-[#777]">
              {expect.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-0 pb-16 md:px-5">
        <DynamicForm id="partners" />
      </section>
    </>
  );
}
