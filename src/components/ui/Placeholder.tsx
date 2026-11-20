import { ImageIcon, Play } from "lucide-react";

/**
 * Neutral stand-in for photographs until licensed/original images are supplied.
 * Tones: "stone" (default grey), "dark" (video / dark photos), "sky" (soft teal hero).
 */
export function Placeholder({
  label,
  className = "",
  tone = "stone",
  video = false,
}: {
  label?: string;
  className?: string;
  tone?: "stone" | "dark" | "sky";
  video?: boolean;
}) {
  const tones = {
    stone: "bg-gradient-to-br from-[#d6d8d4] via-[#c9cbc7] to-[#b9bcb7] text-[#6f716e]",
    dark: "bg-gradient-to-br from-[#5d6461] via-[#3f4643] to-[#2a2f2d] text-white/80",
    sky: "bg-gradient-to-br from-[#b8cac8] via-[#9db5b3] to-[#7f9d9d] text-white/80",
  }[tone];
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className={`flex flex-col items-center justify-center gap-2 ${tones} ${className}`}
    >
      {video ? (
        <span className="flex size-12 items-center justify-center rounded-full border-2 border-white">
          <Play aria-hidden className="ml-0.5 size-5 fill-white text-white" />
        </span>
      ) : (
        <ImageIcon aria-hidden className="size-7 opacity-70" />
      )}
      {label && <span className="px-3 text-center text-xs opacity-90">{label}</span>}
    </div>
  );
}
