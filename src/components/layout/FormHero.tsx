import type { ReactNode } from "react";

const media = {
  silk: { video: "/media/heroes/join.mp4", poster: "/media/heroes/join.jpg", tint: "bg-[#4d7f87]/60", text: "text-white" },
  cubes: {
    video: "/media/heroes/partner.mp4",
    poster: "/media/heroes/partner.jpg",
    tint: "bg-[linear-gradient(110deg,rgba(255,255,255,0)_45%,rgba(64,114,130,0.6)_100%)]",
    text: "text-ink",
  },
} as const;

/**
 * Hero for Join Us / Partner pages: muted looping background video from the
 * reference, with the same colour treatment. Reduced-motion users get the poster.
 */
export function FormHero({
  title,
  goal,
  children,
  tone,
}: {
  title: string;
  goal: string;
  children?: ReactNode;
  tone: keyof typeof media;
}) {
  const m = media[tone];
  return (
    <section className={`relative isolate overflow-hidden px-5 py-14 md:min-h-[455px] md:px-[17%] md:py-[75px] ${m.text}`}>
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={m.poster}
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src={m.video} type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden bg-cover bg-center motion-reduce:block"
        style={{ backgroundImage: `url(${m.poster})` }}
      />
      <div aria-hidden className={`absolute inset-0 -z-10 ${m.tint}`} />
      <h1 className="text-[40px] md:text-[54px]">{title}</h1>
      <p className="mt-5 text-[17px] font-extrabold leading-[1.45] md:mt-8 md:text-[19px]">{goal}</p>
      <div className="mt-4 text-[16px] font-light leading-[1.45] md:text-[17px]">{children}</div>
    </section>
  );
}
