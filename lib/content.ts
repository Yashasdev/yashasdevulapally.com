export const profile = {
  name: "Hriday Narang",
  tagline: "cs @ georgia tech",
  emails: [
    "hriday@thepresenceinc.com",
    "hnarang7@gatech.edu",
    "hridaynarang@gmail.com",
  ],
  linkedin: "https://www.linkedin.com/in/hriday-narang/",
  github: "https://github.com/hridaynarang",
};

export const links = {
  presence: "https://thepresenceinc.com",
  fleetline: "https://fleetline.ai",
  optym: "https://www.optym.com/",
  cliqk: "https://mycliqk.com",
  aiSquads: "https://aisquads.org",
  tennis: "https://tennisrecruiting.net/player/overview.asp?id=943264",
};

/**
 * Stubs on the desk. Don Toliver is here four times because he's been to four
 * of his shows — the count is the point, so don't collapse them into one
 * ticket with a number on it. Add an act and it joins the fan.
 */
export const stubs = ["Don Toliver", "Don Toliver", "Don Toliver", "Don Toliver"];

/**
 * Prints laid on the sheet. Drop files in /public/photos and add them here —
 * this is the part that makes the page a person rather than a description of
 * one, so more is better. The row wraps and every print is its own size and
 * angle, so nothing settles into a grid.
 */
export type Photo = {
  src: string;
  alt: string;
  /** Handwritten under the print. Short and specific — a place beats a caption. */
  caption?: string;
  /** Degrees. Vary it; a repeated angle reads as a grid. */
  rotate: number;
  /** Tailwind width. Prints out of a drawer are never all one size. */
  width?: string;
};

export const photos: Photo[] = [
  { src: "/hriday.jpg", alt: "Hriday Narang", rotate: -2.5, width: "w-32" },
];
