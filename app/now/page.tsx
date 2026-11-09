import Image from "next/image";
import type { Metadata } from "next";
import { currentlyRunning } from "@/lib/content";
export const metadata: Metadata = {
  title: "Currently — Yashas Devulapally",
  alternates: { canonical: "/now" },
};
export default function Now() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">
          <span className="status-dot" /> A SNAPSHOT OF RIGHT NOW
        </p>
        <h1>
          Currently<span>.</span>
        </h1>
        <p>A few things that have my attention, in and outside of work.</p>
      </div>
      <section className="now-list" aria-label="Current interests">
        {currentlyRunning.map((item) => (
          <article key={item.code}>
            <div>
              <p className="entry-role">{item.label}</p>
              <h2>{item.value}</h2>
            </div>
            {item.code === "BUILD_01" && (
              <span className="brand-mark" aria-label="Veyroth AI monogram">
                V<span>VEYROTH AI</span>
              </span>
            )}
            {item.code === "LEARN_02" && (
              <span
                className="brand-mark"
                role="img"
                aria-label="Learning and building: connected ideas and a launch arrow"
              >
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m8 11 8 7-7 10m7-10 11 6M8 11l14-4M9 28l18-4M16 18l6-11" />
                  <circle cx="8" cy="11" r="2.5" fill="var(--paper)" />
                  <circle cx="16" cy="18" r="2.5" fill="var(--paper)" />
                  <circle cx="9" cy="28" r="2.5" fill="var(--paper)" />
                  <circle cx="27" cy="24" r="2.5" fill="var(--paper)" />
                  <path d="M23 12 31 4m-6 0h6v6" />
                </svg>
                <span>LEARN / BUILD</span>
              </span>
            )}
            {item.code === "PLAY_03" && (
              <span
                className="brand-mark"
                role="img"
                aria-label="Music: a record with a sound wave"
              >
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="18" r="14" />
                  <path d="M9 18h3m2-4v8m4-12v16m4-12v8m2-4h3" />
                </svg>
                <span>ON REPEAT</span>
              </span>
            )}
            {item.code === "LOOP_04" && (
              <span className="brand-mark" aria-label="Ysquared monogram">
                Y²<span>YSQUARED</span>
              </span>
            )}
            {item.code === "NEXT_05" && (
              <Image
                className="friends-photo"
                src="/friends.jpg"
                alt="Yashas with friends"
                width={2048}
                height={1536}
                sizes="(max-width: 600px) 120px, 180px"
              />
            )}
          </article>
        ))}
      </section>
    </>
  );
}
