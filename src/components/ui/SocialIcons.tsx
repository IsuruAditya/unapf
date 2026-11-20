import { site } from "@/data/site";

type Net = "facebook" | "x" | "linkedin" | "instagram";

const glyph: Record<Net, React.ReactNode> = {
  facebook: <path d="M13.2 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.5v3h2.6V21z" />,
  x: <path d="M17.6 4h2.9l-6.3 7.2L21.6 20h-5.8l-4.5-5.9L6 20H3.1l6.8-7.7L2.8 4h5.9l4.1 5.4zm-1 14.3h1.6L7.5 5.6H5.8z" />,
  linkedin: <path d="M6.9 8.7H3.8V20h3.1zM5.3 3.9a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.5c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.8-2.8 1.5V8.7h-3V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.1z" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.9" cy="7.1" r="1.2" />
    </>
  ),
};

const labels: Record<Net, string> = { facebook: "Facebook", x: "X (Twitter)", linkedin: "LinkedIn", instagram: "Instagram" };

/**
 * Social icon row. Icons link out only when a URL is configured in site.social;
 * otherwise they render as non-interactive marks so nothing points nowhere.
 */
export function SocialIcons({
  networks,
  variant = "circle",
}: {
  networks: Net[];
  variant?: "circle" | "plain";
}) {
  const hrefFor = (n: Net) => site.social.find((s) => s.network === n)?.href ?? "";
  return (
    <ul className="flex items-center gap-2">
      {networks.map((n) => {
        const href = hrefFor(n);
        const icon = (
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={variant === "circle" ? "size-[22px] rounded-full bg-black p-[3px] text-white" : "size-[22px] text-black"}
            fill="currentColor"
          >
            {glyph[n]}
          </svg>
        );
        return (
          <li key={n}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={labels[n]} className="block transition-opacity hover:opacity-70">
                {icon}
              </a>
            ) : (
              <span role="img" aria-label={`${labels[n]} (link to be confirmed)`} title="Link to be confirmed" className="block opacity-90">
                {icon}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
