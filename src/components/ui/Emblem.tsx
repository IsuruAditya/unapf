import Image from "next/image";

/** Official UNPAF emblem (downloaded from unpaf.info). */
export function Emblem({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/media/brand/unpaf-emblem.png"
      alt="UNPAF emblem"
      width={360}
      height={360}
      priority={priority}
      className={`aspect-square object-contain ${className}`}
    />
  );
}
