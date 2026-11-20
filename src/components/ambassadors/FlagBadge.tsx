import Image from "next/image";
import type { Ambassador } from "@/types";

/**
 * Round flag badge image from the reference site. Pass a positioning class
 * ("relative" or "absolute ...") in className; the image fills that box.
 */
export function FlagBadge({
  flag,
  className = "relative size-11",
}: {
  flag: NonNullable<Ambassador["flag"]>;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      <Image src={flag.src} alt={flag.country} title={flag.country} fill sizes="48px" className="object-contain" />
    </span>
  );
}
