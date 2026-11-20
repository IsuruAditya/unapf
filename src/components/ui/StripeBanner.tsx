import type { ReactNode } from "react";

/**
 * Heading band used on the Ambassadors page: diagonal-stripe background with an
 * inset light panel holding an italic lead, a large heading and a short rule.
 */
export function StripeBanner({
  title,
  lead,
  leadPosition = "before",
  as: Tag = "h2",
}: {
  title: ReactNode;
  lead?: ReactNode;
  leadPosition?: "before" | "after";
  as?: "h1" | "h2";
}) {
  const leadEl = lead && <p className="font-serif text-[14px] leading-[1.9] text-muted md:text-[15px]">{lead}</p>;
  return (
    <div className="bg-stripes py-2.5">
      <div className="mx-[3.2%] bg-sand px-5 pb-3 pt-8 md:px-[10%] md:pt-10">
        {leadPosition === "before" && leadEl}
        <Tag className={`text-[30px] text-muted md:text-[40px] ${leadPosition === "before" && lead ? "mt-7" : "mt-10"}`}>{title}</Tag>
        {leadPosition === "after" && leadEl}
        <span aria-hidden className="mx-auto mt-6 block h-[3px] w-8 bg-ink" />
      </div>
    </div>
  );
}
