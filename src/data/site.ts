/** Central site configuration. Replace placeholders once confirmed by the chapter. */
export const site = {
  name: "UNPAF Sri Lanka",
  title: "Peace Ambassador Foundation — Sri Lanka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "UNPAF Sri Lanka: nurturing youth leaders and promoting peace and humanitarian service. One Voice, One Dream, One Network.",
  // Clearly identified placeholders: no real chapter details have been supplied.
  contact: {
    email: "[Email — to be confirmed]",
    phone: "[+94 — to be confirmed]",
    address: "[Sri Lanka office address — to be confirmed]",
  },
  // Only the international headquarters details published on the reference site.
  headquarters: [
    "UN Peace Ambassador Foundation",
    "2370 – 4000 NO. 3, ROAD",
    "ABERDEEN SQUARE",
    "RICHMOND, BRITISH COLUMBIA,",
    "V6X 0J8. CANADA",
  ],
  // International HQ contact exactly as published on the reference contact page.
  hqContact: { phone: "+236 867 1549", email: "H.E.Anba@unpaf.info" },
  // Social links stay empty until the chapter confirms its official accounts.
  social: [
    { network: "facebook", href: "" },
    { network: "instagram", href: "" },
    { network: "x", href: "" },
    { network: "linkedin", href: "" },
  ],
  // Branding is only published after permission is confirmed.
  officialBrandingConfirmed: false,
} as const;

export const nav = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "ambassadors", href: "/ambassadors" },
  { key: "youth", href: "/youth-ambassadors" },
  { key: "events", href: "/events" },
  { key: "gallery", href: "/gallery" },
  { key: "joinUs", href: "/join-us" },
  { key: "partners", href: "/partners" },
  { key: "contact", href: "/contact" },
] as const;

export const provinces = [
  "Central",
  "Eastern",
  "North Central",
  "Northern",
  "North Western",
  "Sabaragamuwa",
  "Southern",
  "Uva",
  "Western",
] as const;

export const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha",
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
  "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
] as const;
