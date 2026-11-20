import type { Ambassador } from "@/types";

/*
  Names, post-nominals, roles, photos and flags match the reference site
  (unpaf.info/team-3), downloaded to /public/media. Sri Lanka ambassadors
  should be appended once verified.
*/

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const FLAGS = {
  canada: "Canada",
  "hong-kong": "Hong Kong",
  philippines: "Philippines",
  jamaica: "Jamaica",
  usa: "United States",
  india: "India",
  "sri-lanka": "Sri Lanka",
  "south-africa": "South Africa",
  "south-africa-2": "South Africa",
  thailand: "Thailand",
  tanzania: "Tanzania",
  pakistan: "Pakistan",
  "saudi-arabia": "Saudi Arabia",
  malaysia: "Malaysia",
  "malaysia-2": "Malaysia",
  singapore: "Singapore",
  switzerland: "Switzerland",
  sweden: "Sweden",
  china: "China",
} as const;

type FlagKey = keyof typeof FLAGS;

const make = (
  name: string,
  flag?: FlagKey,
  opts: Partial<Ambassador> & { photoSlug?: string } = {},
): Ambassador => {
  const slug = opts.slug ?? slugify(name);
  const { photoSlug, ...rest } = opts;
  return {
    slug,
    name,
    roles: ["Peace Ambassador"],
    photo: `/media/ambassadors/${photoSlug ?? slug}.jpg`,
    flag: flag ? { src: `/media/flags/${flag}.png`, country: FLAGS[flag] } : undefined,
    ...rest,
  };
};

const anbaInfo = {
  credentials: "M.Div, M. LMD, D. Min, Th. D, DBA., D. Hum, Ph.D",
  roles: ["Peace Ambassador to the United Nations", "African Union 6RG Governor of Western Canada"],
};

export const board: Ambassador[] = [
  make("His Excellency Dr. Anba Kunjayah", undefined, anbaInfo),
  make("Dr. Jay Lees", "canada", { credentials: "D.Hum" }),
  make("Dr. Anita Sharaf", "canada", { credentials: "MSW, DSW, M.Th, D.Hum" }),
  make("Dr. Joe Ng", "hong-kong", { credentials: "B. Sc (Hon)., MBA., Ph. D.," }),
  make("Juan Mbanta", "philippines"),
  make("Joy Case", "canada", { credentials: "M.Ed.," }),
  make("Robbie G. Leighnibor", "jamaica"),
  make("Winnie Zhang", "canada"),
  make("Nikko Harris", "canada"),
  make("Zahed Haftlang", "canada"),
];

export const international: Ambassador[] = [
  make("His Excellency Dr. Anba Kunjayah", undefined, {
    ...anbaInfo,
    slug: "his-excellency-dr-anba-kunjayah-intl",
    photoSlug: "intl-anba-kunjayah",
  }),
  make("Dr. Shelli Brunswick", "usa"),
  make("Prof. Dr. Jacob Simon", "india", { credentials: "D.D, D. Hum, Ph.D" }),
  make("Prof. Dr. Ingrid Vasiliu-Feltes", "usa"),
  make("Dr. B.H. Saiyadeen", "sri-lanka", { credentials: "D. Hum, Ph.D" }),
  make("Roshnee Naicker", "south-africa"),
  make("Derasen Naicker", "south-africa-2"),
  make("Dr. Dhammarut Khiaokaeo", "thailand"),
  make("Dr. Vernon Fernandez", "tanzania"),
  make("Atif Iqbal", "pakistan"),
  make("Dr. Khulood Almani", "saudi-arabia"),
  make("Rajendran G Subramanian", "malaysia"),
  make("Asir Sabir", "pakistan"),
  make("Dato Dr. Steve Low Shu Nyok", "malaysia-2"),
  make("Dr. Kyla L. Tennin", "usa"),
  make("Hun Jun", "canada"),
  make("Sharesz T. Wilkinson", "singapore"),
  make("Dr. Anny Fernandez", "tanzania"),
  make("Ur-Jin Ozzin Jun", "switzerland"),
  make("Dr. Sadaf Mushtaq", "malaysia-2"),
  make("Dr. Bjorn Soderberg", "sweden"),
  make("Stanley Alexander Pillai", "india"),
  make("Dr. Martha Boeckenfeld", "switzerland"),
  make("Dr. Sridhar Dasari", "switzerland"),
  make("Dr. Edward Young", "china"),
];

/** Verified Sri Lanka ambassadors from the reference roster (flag: Sri Lanka). */
export const sriLanka: Ambassador[] = international.filter((a) => a.flag?.country === "Sri Lanka");

export const allAmbassadors = [...board, ...international];
