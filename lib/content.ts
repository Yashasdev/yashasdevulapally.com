export const profile = {
  name: "Yashas Devulapally",
  shortName: "Yashas",
  tagline: "Biomedical engineering student, builder, and many other things.",
  introduction:
    "I’m studying biomedical engineering at Georgia Tech, but I’m just as interested in startups, design, music, the outdoors, and whatever interesting problem is in front of me.",
  github: "https://github.com/Yashasdev",
  linkedin: "https://www.linkedin.com/in/yashas-devulapally",
};

export const navItems = [
  { label: "Yashas OS", href: "#os" },
  { label: "Now", href: "#now" },
  { label: "Stories", href: "#stories" },
] as const;

export const osModules = [
  {
    id: "building",
    index: "01",
    label: "Building",
    verb: "Make it real",
    description:
      "Startups, engineering, and side projects—the messy middle between an idea and something that actually works.",
    details: ["Startups", "Medicine", "Code", "Design"],
  },
  {
    id: "exploring",
    index: "02",
    label: "Exploring",
    verb: "Take the long way",
    description:
      "New places, outdoor adventures, and the sort of plans that start with ‘what if we just…’",
    details: ["Travel", "Hiking", "Outdoors", "People"],
  },
  {
    id: "competing",
    index: "03",
    label: "Competing",
    verb: "One more rep",
    description:
      "Volleyball taught me to love pressure. Weightlifting keeps the same energy, just with fewer teammates yelling.",
    details: ["Volleyball", "Lifting", "Momentum", "Focus"],
  },
  {
    id: "creating",
    index: "04",
    label: "Creating",
    verb: "Find the rhythm",
    description:
      "Music, visual design, cooking, and small experiments made for no reason other than curiosity.",
    details: ["Music", "Design", "Cooking", "Experiments"],
  },
  {
    id: "thinking",
    index: "05",
    label: "Thinking",
    verb: "Follow the question",
    description:
      "Interesting questions, ambitious ideas, and rabbit holes that probably deserve their own browser window.",
    details: ["Ideas", "Systems", "Questions", "Learning"],
  },
] as const;

/**
 * Deliberately left as prompts: replace the values below whenever life moves.
 * The homepage reads directly from this array.
 */
export const currentlyRunning = [
  {
    label: "Currently building",
    value: "Add the project on your desk →",
    code: "BUILD_01",
  },
  {
    label: "Currently learning",
    value: "Add this week’s rabbit hole →",
    code: "LEARN_02",
  },
  {
    label: "Currently listening to",
    value: "Add the soundtrack on repeat →",
    code: "PLAY_03",
  },
  {
    label: "Currently obsessed with",
    value: "Add the thing you can’t stop sharing →",
    code: "LOOP_04",
  },
  {
    label: "Next adventure",
    value: "Add the next pin on the map →",
    code: "NEXT_05",
  },
] as const;

export const stories = [
  {
    number: "01",
    kind: "research",
    kicker: "Medicine × Imaging",
    title: "Looking for signals inside the human body.",
    description:
      "I studied regional skeletal-muscle atrophy in peripheral artery disease using CT imaging, then presented the work at Nationwide Children’s research day, where it received a Poster of Distinction.",
    footnote: "Research / CT imaging / 2024",
  },
  {
    number: "02",
    kind: "modeling",
    kicker: "Math × Behavior",
    title: "Modeling the hidden cost of a bet.",
    description:
      "For the 2026 MathWorks Math Modeling Challenge, my team built a three-part model around online sports betting, disposable income, and compounding opportunity cost. We placed in the top 4% nationally.",
    footnote: "M3 Challenge / Team project / 2026",
  },
  {
    number: "03",
    kind: "civic",
    kicker: "Leadership × Community",
    title: "Treating public impact like a design problem.",
    description:
      "My work with Civic Leaders of America and student leadership keeps me close to a question I care about: how do good ideas become useful action for real people?",
    footnote: "Civic work / Leadership",
    href: "https://www.civicleadersofamerica.org/",
  },
  {
    number: "04",
    kind: "sport",
    kicker: "Pressure × Teamwork",
    title: "Three varsity seasons above the net.",
    description:
      "I played middle blocker for New Albany. Volleyball sharpened my competitive side, taught me how to reset quickly, and made high-pressure moments feel like the fun part.",
    footnote: "Varsity volleyball / Middle blocker",
  },
] as const;

export const thinkingPrompts = [
  "What makes a tool feel inevitable?",
  "What can medicine borrow from great product design?",
  "Which problems only become visible when fields overlap?",
  "What would I try if the first version only had to be interesting?",
] as const;
