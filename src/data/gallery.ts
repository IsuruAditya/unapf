import type { EventItem, GalleryAlbum, GalleryPhoto } from "@/types";

/* Albums, titles, dates and photos match unpaf.info/projects-8 (photos in /public/media/gallery). */
const photos = (folder: string, title: string, count: number): GalleryPhoto[] =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { id: `${folder}-${n}`, alt: `${title}, photo ${i + 1}`, src: `/media/gallery/${folder}/${n}.jpg` };
  });

export const albums: GalleryAlbum[] = [
  {
    id: "colombo-launch",
    title: "Launch of UNPAF in Colombo, Sri Lanka",
    date: "3rd November 2023",
    theme: "sand",
    photos: photos("colombo-launch", "Launch of UNPAF in Colombo", 23),
  },
  {
    id: "vancouver-symposium",
    title: "Symposium of UNPAF at Vancouver, Canada",
    theme: "stripes",
    photos: photos("vancouver-symposium", "Symposium of UNPAF at Vancouver", 10),
  },
  {
    id: "africa-renaissance",
    title: "Africa Renaissance Week",
    date: "31st May 2024",
    theme: "white",
    photos: photos("africa-renaissance", "Africa Renaissance Week", 24),
  },
  {
    id: "vancouver-leaders",
    title: "Vancouver Leaders Meeting",
    date: "13th June 2024",
    theme: "white",
    titleTone: "muted",
    photos: photos("vancouver-leaders", "Vancouver Leaders Meeting", 13),
  },
  {
    id: "arts-music-festival",
    title: "UNPAF Multicultural Arts & Music Festival",
    date: "3rd Aug 2024",
    theme: "stone",
    photos: photos("arts-music-festival", "UNPAF Multicultural Arts & Music Festival", 14),
  },
];

/** Slides for the home page "UNPAF in Action" slideshow (same order as the reference). */
export const actionSlides: GalleryPhoto[] = [
  { id: "action-1", src: "/media/home/action-1.jpg", alt: "UNPAF Peace Ambassadors at the Vancouver Leaders Meeting" },
  { id: "action-2", src: "/media/home/action-2.jpg", alt: "Peace Ambassadors at Africa Renaissance Week" },
  { id: "action-3", src: "/media/home/action-3.jpg", alt: "Speaker at a UNPAF event in Sri Lanka" },
];

/** Events and campaigns, with the posters published on unpaf.info/services-1. */
export const events: EventItem[] = [
  {
    slug: "diplomatic-summit-2024",
    title: "Diplomatic Summit 2024",
    date: "2024-10-05T09:00:00+05:30",
    endDate: "2024-10-07T17:00:00+05:30",
    location: "Bandaranaike Memorial International Conference Hall, Marino Beach, Colombo",
    description:
      "A landmark summit exploring innovative approaches to diplomacy, strengthening international partnerships, and working towards a collective future of harmony and prosperity.",
    status: "past",
    image: "/media/events/diplomatic-summit-2024.jpg",
    gallery: ["/media/events/diplomatic-summit-2024-details.jpg"],
  },
  {
    slug: "arts-culture-symposium-2024",
    title: "Diplomatic Arts & Culture Symposium",
    date: "2024-10-05T09:00:00+05:30",
    endDate: "2024-10-09T17:00:00+05:30",
    location: "Bandaranaike Memorial International Conference Hall, Colombo, Sri Lanka",
    description: "A five-day celebration of arts, culture and heritage alongside the Diplomatic Summit in Colombo.",
    status: "past",
    image: "/media/events/arts-culture-symposium-2024.jpg",
    gallery: ["/media/events/arts-culture-symposium-2024-details.jpg"],
  },
  {
    slug: "international-peace-congress-2024",
    title: "International Peace Congress 2024",
    date: null,
    dateLabel: "2024",
    location: "Vancouver, Canada",
    description:
      "Special speakers and topics including Understanding United Nations, International Negotiations, Protocol & Diplomacy, and the Presentation of the Peace Ambassador Shield & ID.",
    status: "past",
    image: "/media/events/peace-congress-2024.jpg",
  },
  {
    slug: "colombo-launch-2023",
    title: "Launch of UNPAF in Colombo, Sri Lanka",
    date: "2023-11-03T00:00:00+05:30",
    location: "Colombo, Sri Lanka",
    description: "The launch of UNPAF in Sri Lanka.",
    status: "past",
    image: "/media/gallery/colombo-launch/02.jpg",
  },
];
