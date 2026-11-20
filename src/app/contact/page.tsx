import type { Metadata } from "next";
import Image from "next/image";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { MapBox } from "@/components/ui/MapBox";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Contact Us", description: "Contact UNPAF Sri Lanka." };

export default async function ContactPage() {
  const { t } = await getT();
  const small = "text-[14.5px] leading-[1.95] text-[#555]";
  return (
    <>
      {/* Banner with centered title plate */}
      <section className="px-0 pt-5 md:px-5">
        <div className="relative isolate mx-auto flex h-[180px] max-w-[1000px] items-center justify-center overflow-hidden bg-[#c9cac7] md:h-[228px]">
          {/* Reference banner is a dark pattern shown lightened; "screen" blend recreates that. */}
          <Image src="/media/heroes/contact.jpg" alt="" fill sizes="1000px" className="-z-10 object-cover opacity-70 mix-blend-screen" />
          <h1 className="bg-sand px-8 py-4 text-[40px] text-muted md:px-10 md:text-[54px]">{t("contact.title")}</h1>
        </div>
      </section>

      {/* Address / Contact / Social */}
      <section className="px-5 pb-10 pt-16">
        <div className="mx-auto grid max-w-[1000px] gap-10 md:grid-cols-3 md:px-8">
          <div>
            <h2 className="text-[26px] font-bold text-ink">{t("contact.address")}</h2>
            <address className={`mt-5 not-italic ${small}`}>
              <span className="block font-serif text-[15px] italic text-[#555]">{t("contact.lkOrg")}</span>
              <span className="block">{site.contact.address}</span>
              <span className="mt-5 block font-serif text-[15px] italic text-[#555]">{site.headquarters[0]}</span>
              {site.headquarters.slice(1).map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div>
            <h2 className="text-[26px] font-bold text-ink">{t("youth.contact")}</h2>
            <div className={`mt-5 ${small}`}>
              <p>{site.contact.phone}</p>
              <p>{site.contact.email}</p>
              <p className="mt-5 font-serif text-[15px] italic">{t("contact.hq")}</p>
              <p>
                <a href={`tel:${site.hqContact.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {site.hqContact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.hqContact.email}`} className="hover:underline">
                  {site.hqContact.email}
                </a>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-[26px] font-bold text-ink">{t("contact.social")}</h2>
            <div className="mt-6">
              <SocialIcons networks={["facebook", "instagram"]} variant="plain" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-0 md:px-5">
        <MapBox query="Sri Lanka" label={t("contact.openMap")} className="mx-auto h-[280px] max-w-[1000px]" />
      </section>

      <section className="px-0 py-14 md:px-5">
        <DynamicForm id="contact" />
      </section>
    </>
  );
}
