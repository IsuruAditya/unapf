import { MapPin } from "lucide-react";

/**
 * White map panel matching the reference's embedded-map area. No third-party
 * iframe is loaded; the visitor opens OpenStreetMap only if they choose to.
 */
export function MapBox({ query, label, className = "" }: { query: string; label: string; className?: string }) {
  const href = `https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`;
  return (
    <div className={`flex items-center justify-center bg-white ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[14px] text-muted underline-offset-4 hover:text-nav hover:underline"
      >
        <MapPin aria-hidden className="size-4" />
        {label}
      </a>
    </div>
  );
}
