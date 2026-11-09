import type { Metadata } from "next";
import {
  impactStats,
  leadershipHighlights,
  projects,
  selectedHonors,
} from "@/lib/content";
export const metadata: Metadata = {
  title: "Research & Work — Yashas Devulapally",
  alternates: { canonical: "/work" },
};
export default function Work() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">RESEARCH, ENGINEERING & COMMUNITY</p>
        <h1>
          Research & work<span>.</span>
        </h1>
        <p>
          Learning by building, asking questions, and working across
          disciplines.
        </p>
      </div>
      <div className="impact-stats">
        {impactStats.slice(0, 3).map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <section className="experience-list" aria-label="Experience and projects">
        {projects.map((project) => (
          <article key={project.number}>
            <div className="entry-heading">
              <h2>{project.organization}</h2>
              <span>{project.period}</span>
            </div>
            <p className="entry-role">{project.kicker}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="entry-metric">{project.metric}</p>
            {"href" in project && (
              <a
                className="text-link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                Visit organization ↗
              </a>
            )}
          </article>
        ))}
      </section>
      <section
        className="supporting-section"
        aria-labelledby="leadership-heading"
      >
        <h2 id="leadership-heading">Leadership & service</h2>
        <div className="experience-list">
          {leadershipHighlights.map((item) => (
            <article key={item.title}>
              <div className="entry-heading">
                <h3>{item.title}</h3>
              </div>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="supporting-section" aria-labelledby="honors-heading">
        <h2 id="honors-heading">Selected honors</h2>
        <ul className="honors-list">
          {selectedHonors.map((honor) => (
            <li key={honor.title}>
              <span>{honor.title}</span>
              <small>{honor.detail}</small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
