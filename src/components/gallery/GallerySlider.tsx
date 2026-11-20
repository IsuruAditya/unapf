"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { useT } from "@/i18n/client";
import type { GalleryPhoto } from "@/types";

/**
 * Horizontal photo strip (~2.5 photos visible) with the reference's dark square
 * arrow button, plus an accessible lightbox (Esc, arrows, +/- zoom, focus return).
 */
export function GallerySlider({ title, photos }: { title: string; photos: GalleryPhoto[] }) {
  const { t } = useT();
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const scrollBy = (dir: number) => {
    const el = track.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    el.scrollBy({ left: dir * (item.clientWidth + 20), behavior: "smooth" });
  };

  const show = useCallback(
    (d: number) => {
      setZoom(1);
      setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));
    },
    [photos.length],
  );

  const close = useCallback(() => {
    setOpen(null);
    setZoom(1);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(3, z + 0.5));
      if (e.key === "-") setZoom((z) => Math.max(1, z - 0.5));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, show]);

  const current = open !== null ? photos[open] : null;
  const arrowBtn =
    "absolute top-1/2 z-10 flex size-[70px] -translate-y-1/2 items-center justify-center bg-black/65 text-white transition hover:bg-black/80";
  const lbBtn = "bg-white/10 p-3 text-white transition hover:bg-white/25";

  return (
    <div className="relative">
      <ul
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-[3.2vw] gap-5 overflow-x-auto scroll-smooth px-[3.2vw]"
        aria-label={title}
      >
        {photos.map((p, idx) => (
          <li key={p.id} className="w-[78vw] shrink-0 snap-start sm:w-[45vw] lg:w-[35.2vw] lg:max-w-[520px]">
            <button
              type="button"
              className="group block aspect-[422/520] w-full overflow-hidden"
              aria-label={`${t("gallery.open")}: ${p.alt}`}
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(idx);
              }}
            >
              {p.src ? (
                <Image
                  src={p.src}
                  alt=""
                  width={520}
                  height={640}
                  sizes="(min-width:1024px) 35vw, (min-width:640px) 45vw, 78vw"
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <Placeholder label={t("gallery.noImage")} className="h-full w-full transition duration-500 group-hover:scale-[1.02]" />
              )}
            </button>
          </li>
        ))}
      </ul>
      {!atStart && (
        <button type="button" onClick={() => scrollBy(-1)} aria-label={t("gallery.prev")} className={`${arrowBtn} left-[5%]`}>
          <ArrowLeft aria-hidden className="size-7" strokeWidth={1.25} />
        </button>
      )}
      {!atEnd && (
        <button type="button" onClick={() => scrollBy(1)} aria-label={t("gallery.next")} className={`${arrowBtn} right-[5%]`}>
          <ArrowRight aria-hidden className="size-7" strokeWidth={1.25} />
        </button>
      )}

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-50 flex flex-col bg-black/90">
          <div className="flex justify-end gap-2 p-3">
            <button type="button" className={lbBtn} onClick={() => setZoom((z) => Math.min(3, z + 0.5))} aria-label={t("gallery.zoomIn")}>
              <ZoomIn aria-hidden />
            </button>
            <button type="button" className={lbBtn} onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label={t("gallery.zoomOut")}>
              <ZoomOut aria-hidden />
            </button>
            <button ref={closeRef} type="button" className={lbBtn} onClick={close} aria-label={t("gallery.close")}>
              <X aria-hidden />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-auto p-4">
            <button type="button" className={`${lbBtn} absolute left-3 z-10`} onClick={() => show(-1)} aria-label={t("gallery.prev")}>
              <ChevronLeft aria-hidden />
            </button>
            <div style={{ transform: `scale(${zoom})` }} className="relative h-[70vh] w-full max-w-4xl origin-center transition-transform duration-300">
              {current.src ? (
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              ) : (
                <Placeholder label={t("gallery.noImage")} className="h-full w-full" />
              )}
            </div>
            <button type="button" className={`${lbBtn} absolute right-3 z-10`} onClick={() => show(1)} aria-label={t("gallery.next")}>
              <ChevronRight aria-hidden />
            </button>
          </div>
          <p className="p-4 text-center text-sm text-white">
            {current.alt} ({(open ?? 0) + 1}/{photos.length})
          </p>
        </div>
      )}
    </div>
  );
}
