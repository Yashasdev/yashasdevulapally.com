export const profile = {
  name: "Yashas Devulapally",
  introduction:
    "I’m a biomedical engineering student and Stamps President’s Scholar at Georgia Tech, building where medicine, engineering, and ambitious ideas overlap.",
  github: "https://github.com/Yashasdev",
  linkedin: "https://www.linkedin.com/in/yashas-devulapally",
};

export const navItems = [
  { label: "Now", href: "#now" },
  { label: "Work", href: "#work" },
  { label: "Volleyball", href: "#volleyball" },
] as const;

export const currentlyRunning = [
  { label: "Currently building", value: "Veyroth AI", code: "BUILD_01" },
  { label: "Currently learning", value: "Biotech consulting", code: "LEARN_02" },
  { label: "Currently listening to", value: "Mind Over Matter", code: "PLAY_03" },
  { label: "Currently obsessed with", value: "Content creation", code: "LOOP_04" },
  { label: "Next adventure", value: "Living life", code: "NEXT_05" },
] as const;

export const impactStats = [
  { value: "Top 1%", label: "Stamps President’s Scholar at Georgia Tech" },
  { value: "220+", label: "Hours of regenerative medicine research" },
  { value: "2", label: "Published abstracts in Circulation" },
  { value: "529", label: "Career varsity volleyball kills" },
] as const;

export const projects = [
  {
    number: "01",
    kind: "battery",
    kicker: "Wearable technology × R&D",
    title: "Testing the power source for what comes next.",
    description:
      "At NavaFlex, I worked on-site with flexible, washable batteries for wearable technology and smart textiles—testing next-generation energy storage and exploring its potential in adaptable health monitoring.",
    metric: "Flexible batteries / Wearable health / 2026",
  },
  {
    number: "02",
    kind: "research",
    kicker: "Medicine × Imaging",
    title: "Finding signals inside the human body.",
    description:
      "At Nationwide Children’s, I led imaging work on peripheral artery disease using PET/CT perfusion mapping, calf-muscle segmentation, and arterial input function modeling. Earlier CT and histology research earned a Poster of Distinction.",
    metric: "220+ hours / PET + CT / Poster of Distinction",
  },
  {
    number: "03",
    kind: "consulting",
    kicker: "Biotech × Strategy",
    title: "Charting a vaccine’s path toward the clinic.",
    description:
      "With BioConnect at Georgia Tech, I’m developing an FDA Investigational New Drug roadmap for AtheroVax’s preclinical cardiovascular vaccine and building an early U.S. market model around high-risk patients.",
    metric: "Preclinical → IND → Clinical readiness",
  },
  {
    number: "04",
    kind: "prototype",
    kicker: "Biomechanics × Prototyping",
    title: "Building a better landing for the shoulder.",
    description:
      "At Johns Hopkins BMEI, I designed an anterior-support shoulder brace inspired by volleyball injuries, modeled high-risk spiking mechanics, integrated athlete feedback, and iterated for support without sacrificing range of motion.",
    metric: "Arduino / Blender / Materials testing",
  },
  {
    number: "05",
    kind: "civic",
    kicker: "Leadership × Community",
    title: "Turning good intentions into useful action.",
    description:
      "As one of seven national student leaders at Civic Leaders of America, I helped launch and operate a student-led civic nonprofit spanning more than ten schools across four states.",
    metric: "7 national leaders / 10+ schools / 4 states",
    href: "https://www.civicleadersofamerica.org/",
  },
] as const;

export const volleyballStats = [
  { value: "529", label: "Career kills" },
  { value: ".332", label: "Career hitting percentage" },
  { value: "128", label: "Total blocks" },
  { value: "205", label: "Varsity sets played" },
] as const;

export const volleyballProfile =
  "https://www.maxpreps.com/oh/new-albany/new-albany-eagles/athletes/yashas-devulapally/volleyball/boys/stats/?careerid=fkomn9is34el5";
