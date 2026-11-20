import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { FormHero } from "@/components/layout/FormHero";
import { getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Join Us", description: "Apply to become a UNPAF Sri Lanka member." };

// Sri Lankan equivalents of the reference's verification documents.
const documents = [
  "National Identity Card (NIC)",
  "Passport",
  "Driving Licence",
  "Birth Certificate",
  "School Identification Card",
  "Postal Identity Card",
];

export default async function JoinPage() {
  const { t } = await getT();
  return (
    <>
      <FormHero tone="silk" title={t("join.heading")} goal={t("join.goal")}>
        <p>{t("join.p1")}</p>
        <p>
          {t("join.p2.a")} <strong className="font-bold">One Voice</strong>, {t("join.p2.b")} <strong className="font-bold">One Dream</strong>{" "}
          {t("join.p2.c")} <strong className="font-bold">One Network.</strong> {t("join.p2.d")}
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 rounded-full border-2 border-[#8b6a5e] bg-white/15 px-6 py-2 text-[15px] uppercase tracking-wide text-[#6f5a52] transition-colors hover:bg-white/60 md:text-[16px]"
          >
            {t("join.partnerCta")}
            <ChevronRight aria-hidden className="size-5" strokeWidth={2.5} />
          </Link>
        </div>
      </FormHero>

      <section className="bg-white px-5 pb-10 pt-10">
        <div className="mx-auto grid max-w-[800px] gap-10 text-[14px] md:grid-cols-2">
          <div>
            <h2 className="text-[15.5px] font-semibold text-black">{t("join.eligibility")}</h2>
            <p className="mt-2 leading-[1.55] text-[#666]">{t("join.eligibilityText")}</p>
            <h2 className="mt-7 text-[15.5px] font-semibold leading-[1.45] text-black">{t("join.age")}</h2>
            <ul className="mt-4 list-disc pl-7 leading-[1.55] text-[#666]">
              <li>Youth (15-25)&nbsp;&nbsp; Peace Leader</li>
              <li>Adult- (26+)&nbsp; Peace Advocate / Ambassador</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[15.5px] font-semibold text-black">{t("join.documents")}</h2>
            <ul className="mt-1 list-disc pl-7 leading-[1.55] text-[#666]">
              {documents.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-0 pb-8 md:px-5">
        <DynamicForm id="join" />
      </section>
    </>
  );
}
