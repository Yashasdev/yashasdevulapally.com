import type { Metadata } from "next";
import { impactStats, projects } from "@/lib/content";
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
    </>
  );
}
