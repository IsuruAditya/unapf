import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Ambassador } from "@/types";
import { FlagBadge } from "./FlagBadge";

function ReadMore({ href, label, name }: { href: string; label: string; name: string }) {
  return (
    <Link
      href={href}
      aria-label={`${label}: ${name}`}
      className="inline-flex items-center rounded-[10px] bg-[#e1e2df] px-2 py-[3px] font-[Arial,sans-serif] text-[12px] text-[#444] transition-colors hover:bg-[#cfd0cd]"
    >
      {label}
      <ChevronRight aria-hidden className="size-3.5" strokeWidth={3} />
    </Link>
  );
}

function Roles({ roles }: { roles: string[] }) {
  if (roles.length > 1) {
    return (
      <ul className="ml-6 list-disc font-serif text-[12.5px] leading-[1.35] text-[#6b6d6b]">
        {roles.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    );
  }
  return <p className="font-serif text-[12.5px] text-[#6b6d6b]">{roles[0]}</p>;
}

/** Board of Directors card: square photo, name + post-nominals, flag, italic role, "Read More" pill. */
export function BoardCard({ a, label }: { a: Ambassador; label: string }) {
  return (
    <article className="w-full max-w-[258px]">
      <div className="relative aspect-[238/233] overflow-hidden">
        {a.photo ? (
          <Image src={a.photo} alt={a.name} fill sizes="258px" className="object-cover object-top" />
        ) : (
          <Placeholder label="Photo to be supplied" className="h-full w-full" />
        )}
      </div>
      <div className="relative min-h-[132px] pl-3 pr-1 pt-5">
        {a.flag && <FlagBadge flag={a.flag} className="absolute right-1 top-4 size-11" />}
        <h3 className={`${a.flag ? "pr-14" : ""} text-[14px] font-bold leading-tight text-[#444]`}>{a.name}</h3>
        {a.credentials && <p className={`${a.flag ? "pr-14" : ""} text-[10px] font-bold text-[#555]`}>{a.credentials}</p>}
        <div className="mt-6">
          <Roles roles={a.roles} />
        </div>
        <div className="mt-3 flex justify-end">
          <ReadMore href={`/ambassadors/${a.slug}`} label={label} name={a.name} />
        </div>
      </div>
    </article>
  );
}

/** International Ambassadors card: photo above a light text card, on the grey panel. */
export function AmbassadorCard({ a, label }: { a: Ambassador; label: string }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[285/235] overflow-hidden">
        {a.photo ? (
          <Image src={a.photo} alt={a.name} fill sizes="(min-width:1024px) 305px, 100vw" className="object-cover object-top" />
        ) : (
          <Placeholder label="Photo to be supplied" className="h-full w-full" />
        )}
      </div>
      <div className="relative flex min-h-[134px] flex-1 flex-col bg-sand px-3 pb-2.5 pt-4">
        {a.flag && <FlagBadge flag={a.flag} className="absolute right-3 top-3 size-10" />}
        <h3 className={`${a.flag ? "pr-12" : ""} text-[13.5px] font-bold text-[#555]`}>{a.name}</h3>
        {a.credentials && <p className="text-[9.5px] font-bold text-[#555]">{a.credentials}</p>}
        <div className={a.credentials ? "mt-2" : "mt-4"}>
          <Roles roles={a.roles} />
        </div>
        <div className="mt-auto flex justify-end pt-2">
          <ReadMore href={`/ambassadors/${a.slug}`} label={label} name={a.name} />
        </div>
      </div>
    </article>
  );
}
