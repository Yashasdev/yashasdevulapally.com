import type { Metadata } from "next";
import { PhotoGallery } from "@/components/photo-gallery";
import { volleyballProfile, volleyballStats } from "@/lib/content";
export const metadata: Metadata = {
  title: "Volleyball — Yashas Devulapally",
  alternates: { canonical: "/volleyball" },
};
export default function Volleyball() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">NEW ALBANY EAGLES · #17 · MIDDLE BLOCKER</p>
        <h1>
          Above the net<span>.</span>
        </h1>
        <p>
          Four years of varsity volleyball. A lot of lessons that go beyond the
          court.
        </p>
      </div>
      <div className="prose">
        <p>
          Volleyball taught me to reset fast, communicate clearly, and enjoy the
          points that carry the most pressure. I helped take New Albany to the
          Ohio Division I Final Four and earned team MVP, First Team
          All-Conference and All-Region, and All-State Honorable Mention.
        </p>
        <p>
          In the 2025 season, I ranked 41st nationally and 3rd in Ohio and was a
          USA TODAY Player of the Year nominee.
        </p>
      </div>
      <div className="volleyball-stats">
        {volleyballStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <a
        className="text-link"
        href={volleyballProfile}
        target="_blank"
        rel="noreferrer"
      >
        View full career stats ↗
      </a>
      <section className="moments-section">
        <div className="section-heading">
          <h2>From the court</h2>
          <span>Click to look closer</span>
        </div>
        <PhotoGallery
          compact
          photos={[
            {
              src: "/volleyball/attack-home.jpg",
              alt: "Yashas attacking for New Albany",
              caption: "Above the net",
            },
            {
              src: "/volleyball/attack-back.jpg",
              alt: "Yashas attacking in a black number 17 jersey",
              caption: "Match point mindset",
            },
            {
              src: "/volleyball/jump-serve.jpg",
              alt: "Yashas jump serving",
              caption: "The jump serve",
            },
            {
              src: "/volleyball/approach.jpg",
              alt: "Yashas during an approach",
              caption: "Finding the approach",
            },
            {
              src: "/volleyball/contact.jpg",
              alt: "Yashas preparing to contact the ball",
              caption: "Eyes on the ball",
            },
          ]}
        />
      </section>
    </>
  );
}
