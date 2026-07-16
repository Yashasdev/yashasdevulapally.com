export const profile = {
  name: "Hriday Narang",
  tagline: "cs @ georgia tech",
  emails: [
    "hriday@fleetline.ai",
    "hnarang7@gatech.edu",
    "hridaynarang@gmail.com",
  ],
  linkedin: "https://www.linkedin.com/in/hriday-narang/",
  github: "https://github.com/hridaynarang",
};

export type Role = {
  company: string;
  title: string;
  /** Month and year. Same-year spans don't repeat the year. */
  when: string;
  href?: string;
  site?: string;
  /** Each company's own mark, pulled from its site. */
  logo?: string;
  /** One line on what it is. Omitted where LinkedIn says nothing. */
  note?: string;
  /** A second, quieter line. */
  aside?: string;
};

/**
 * Reverse chronological, one list. No "now"/"before" headings — the dates
 * already say which is current, and on a sheet this small the labels were noise.
 */
export const experience: Role[] = [
  {
    company: "Fleetline",
    title: "Founding Engineer",
    when: "Feb 2026 — Present",
    href: "https://fleetline.ai",
    site: "fleetline.ai",
    logo: "/logos/fleetline.svg",
    note: "Optimization algorithms for trucking.",
    aside: "YC S25 · BoxGroup · Bloomberg Beta · Base10 · Liquid2",
  },
  {
    company: "Cliqk",
    title: "Founding Engineer",
    when: "Sep 2025 — Feb 2026",
    href: "https://mycliqk.com",
    site: "mycliqk.com",
    logo: "/logos/cliqk.png",
  },
  {
    company: "AI Squads",
    title: "Cohort Lead, TA",
    when: "Aug — Dec 2025",
    href: "https://aisquads.org",
    site: "aisquads.org",
    logo: "/logos/aisquads.png",
  },
  {
    company: "Clueoai",
    title: "Co-Founder",
    when: "Jun — Sep 2025",
    note: "AI red teaming agents for the OWASP Top 10, and a personality API for steering Big Five traits in language models.",
  },
];

/**
 * Pen notes in the margin — the part of the sheet that isn't a résumé.
 * Handwritten and off-square on purpose: the typed note is what you did, these
 * are who you are. Add more; they're what keeps this from reading as a CV.
 */
export const notes: { text: string; href?: string }[] = [
  {
    text: "★★★★ tennis recruit",
    href: "https://tennisrecruiting.net/player/overview.asp?id=943264",
  },
];
