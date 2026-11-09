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
