export const profile = {
  name: "Yashas Devulapally",
  introduction:
    "I’m a biomedical engineering student and Stamps President’s Scholar at Georgia Tech, building where medicine, engineering, and ambitious ideas overlap.",
  github: "https://github.com/Yashasdev",
  linkedin: "https://www.linkedin.com/in/yashas-devulapally",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Research & Work", href: "/work" },
  { label: "Currently", href: "/now" },
  { label: "Volleyball", href: "/volleyball" },
] as const;

export const currentlyRunning = [
  { label: "Currently building", value: "Veyroth AI", code: "BUILD_01" },
  {
    label: "Currently learning",
    value: "Machine learning + startups",
    code: "LEARN_02",
  },
  {
    label: "Currently listening to",
    value: "Mind Over Matter",
    code: "PLAY_03",
  },
  {
    label: "Currently obsessed with",
    value: "Content creation",
    code: "LOOP_04",
  },
  { label: "Next adventure", value: "Living life", code: "NEXT_05" },
] as const;

export const impactStats = [
  { value: "Top 1%", label: "Stamps President’s Scholar at Georgia Tech" },
  { value: "400+", label: "Hours of regenerative medicine research" },
  {
    value: "2",
    label: "Circulation abstracts supported through research contributions",
  },
  { value: "529", label: "Career varsity volleyball kills" },
] as const;

export const projects = [
  {
    number: "01",
    organization: "NavaFlex",
    period: "Summer 2026",
    kind: "battery",
    kicker: "Wearable technology × R&D",
    title: "Testing the power source for what comes next.",
    description:
      "At NavaFlex, I worked on-site with flexible, washable batteries for wearable technology and smart textiles—testing next-generation energy storage and exploring its potential in adaptable health monitoring.",
    metric: "Flexible batteries / Wearable health / 2026",
  },
  {
    number: "02",
    organization: "Nationwide Children’s Hospital",
    period: "2024–2025",
    kind: "research",
    kicker: "Medicine × Imaging",
    title: "Finding signals inside the human body.",
    description:
      "At Nationwide Children’s, I led imaging work on peripheral artery disease using PET/CT perfusion mapping, calf-muscle segmentation, and arterial input function modeling. Earlier CT and histology research earned a Poster of Distinction.",
    metric: "400+ research hours / PET + CT / Poster of Distinction",
  },
  {
    number: "03",
    organization: "BioConnect · AtheroVax",
    period: "2026–present",
    kind: "consulting",
    kicker: "Biotech × Strategy",
    title: "Charting a vaccine’s path toward the clinic.",
    description:
      "With BioConnect at Georgia Tech, I’m developing an FDA Investigational New Drug roadmap for AtheroVax’s preclinical cardiovascular vaccine and building an early U.S. market model around high-risk patients.",
    metric: "Preclinical → IND → Clinical readiness",
  },
  {
    number: "04",
    organization: "Johns Hopkins BMEI",
    period: "2024",
    kind: "prototype",
    kicker: "Biomechanics × Prototyping",
    title: "Building a better landing for the shoulder.",
    description:
      "At Johns Hopkins BMEI, I designed an anterior-support shoulder brace inspired by volleyball injuries, modeled high-risk spiking mechanics, integrated athlete feedback, and iterated for support without sacrificing range of motion.",
    metric: "Arduino / Blender / Materials testing",
  },
  {
    number: "05",
    organization: "Civic Leaders of America",
    period: "2024–2026",
    kind: "civic",
    kicker: "Leadership × Community",
    title: "Turning good intentions into useful action.",
    description:
      "As one of seven national student leaders at Civic Leaders of America, I helped launch and operate a student-led civic nonprofit spanning more than ten schools across four states.",
    metric: "7 national leaders / 10+ schools / 4 states",
    href: "https://www.civicleadersofamerica.org/",
  },
  {
    number: "06",
    organization: "Think Like an Engineer (TLaE)",
    period: "Founded Nov 2024",
    kind: "education",
    kicker: "Founder & Instructor · STEM access",
    title: "Making engineering something you can try.",
    description:
      "I founded a hands-on engineering course for underserved middle-school students at the Hilltop YMCA in Columbus, partnering with the YMCA and local libraries to expand access to STEM. I designed and taught challenges like paper bridges, marshmallow towers, and balloon-powered cars, helping students practice modeling, prototyping, testing, and teamwork.",
    metric: "Engineering design / Hands-on learning / Community partnerships",
  },
  {
    number: "07",
    organization: "RoboThink Columbus",
    period: "Started Sep 2024",
    kind: "education",
    kicker: "Build Coach & STEM Instructor",
    title: "Helping young builders become problem-solvers.",
    description:
      "I taught robotics and engineering to elementary-school students through interactive builds, coding, and design challenges. By adapting lessons to different learning styles and helping students troubleshoot their own designs, I encouraged them to move from following instructions to experimenting independently.",
    metric: "Robotics / Coding / Engineering instruction",
  },
  {
    number: "08",
    organization: "Clinical & Health Science Exploration",
    period: "Pre-college",
    kind: "clinical",
    kicker: "Nationwide Children’s Hospital · OhioHealth",
    title: "Understanding the people behind the engineering.",
    description:
      "Through Nationwide Children’s Mechanisms of Human Health and Disease program, I explored familial addiction and the genetics of Charcot–Marie–Tooth disease, presented research, and participated in clinical simulations. I also shadowed critical-care physicians at Grant Medical Center in summer 2023, observing ICU care and ventilator management.",
    metric: "Health science / Clinical simulations / ICU shadowing",
  },
] as const;

export const leadershipHighlights = [
  {
    title: "Grand Challenges Living Learning Community",
    detail:
      "At Georgia Tech, I’m part of Grand Challenges, an interdisciplinary living learning community focused on collaborative problem-solving and leadership.",
  },
  {
    title: "Future Medical Professionals Club",
    detail:
      "As president at New Albany High School, I organized healthcare speaker events and led hands-on workshops in suturing, anatomy, and dissection.",
  },
  {
    title: "Ohio Model United Nations",
    detail:
      "As team captain and rebuttal speaker, I helped develop and defend a resolution proposing AI-assisted drones to address poaching in Mozambique. Our resolution passed in the General Assembly and earned an Outstanding Resolution Award.",
  },
] as const;

export const selectedHonors = [
  { title: "National Merit Finalist", detail: "2026" },
  {
    title: "MathWorks Math Modeling Challenge · Honorable Mention",
    detail: "2026",
  },
  {
    title: "Research Poster of Distinction",
    detail: "Nationwide Children’s Hospital · 2024",
  },
  {
    title: "Civil Discourse Essay Competition · First Place",
    detail:
      "New Albany Community Foundation / Park National Bank · 2023 & 2025",
  },
] as const;

export const volleyballStats = [
  { value: "529", label: "Career kills" },
  { value: "#41", label: "In the nation / 2025" },
  { value: "2025", label: "Season" },
  { value: ".326", label: "Hitting percentage / Middle blocker" },
] as const;

export const volleyballProfile =
  "https://www.maxpreps.com/oh/new-albany/new-albany-eagles/athletes/yashas-devulapally/volleyball/boys/stats/?careerid=fkomn9is34el5";
