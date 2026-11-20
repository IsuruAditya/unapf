export type Locale = "en" | "si" | "ta";

export interface Ambassador {
  slug: string;
  name: string;
  credentials?: string;
  roles: string[];
  /** Round flag badge image from the reference site. */
  flag?: { src: string; country: string };
  photo?: string;
  /** Biography text. Only published once supplied and approved by the ambassador. */
  bio?: string;
}

export type EventStatus = "upcoming" | "ongoing" | "past" | "tbc";

export interface EventItem {
  slug: string;
  title: string;
  image?: string;
  date: string | null; // ISO string, null while unconfirmed
  endDate?: string;
  /** Shown instead of a formatted date when only partial date info is published. */
  dateLabel?: string;
  location: string;
  description: string;
  status: EventStatus;
  registrationUrl?: string;
  /** Extra posters / detail sheets shown with the event. */
  gallery?: string[];
}

export interface GalleryPhoto {
  id: string;
  alt: string;
  src?: string;
}

/** One titled album on the Gallery page, rendered as a horizontal slider. */
export interface GalleryAlbum {
  id: string;
  title: string;
  date?: string;
  /** Section background: plain page, diagonal stripes, white, or grey photo band. */
  theme: "sand" | "stripes" | "white" | "stone";
  titleTone?: "ink" | "muted";
  photos: GalleryPhoto[];
}

export type FormResult = { ok: true } | { ok: false; error: string; fields?: Record<string, string> };
