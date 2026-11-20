"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { useT } from "@/i18n/client";
import type { GalleryPhoto } from "@/types";

/** Auto-advancing slideshow used for "UNPAF in Action". Pauses on hover/focus. */
export function ActionSlideshow({ items }: { items: GalleryPhoto[] }) {
  const { t } = useT();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    if (paused || n < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const item = items[i];
  const arrow =
    "absolute top-1/2 -translate-y-1/2 p-2 text-white opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/30";

  return (
    <div
      className="group relative aspect-[795/446] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label={t("home.action")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {item.src ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={i === 0}
              sizes="(min-width:835px) 795px, 100vw"
              className="object-cover"
            />
          ) : (
            <Placeholder label={item.alt} className="h-full w-full" />
          )}
        </motion.div>
      </AnimatePresence>
      <p className="sr-only" aria-live="polite">
        {i + 1} / {n}: {item.alt}
      </p>
      <button type="button" onClick={() => go(-1)} aria-label={t("gallery.prev")} className={`${arrow} left-2`}>
        <ChevronLeft aria-hidden className="size-8" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label={t("gallery.next")} className={`${arrow} right-2`}>
        <ChevronRight aria-hidden className="size-8" />
      </button>
    </div>
  );
}
