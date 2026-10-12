import Image from "next/image";
import { InteractionLayer } from "@/components/interaction-layer";
import {
  currentlyRunning,
  impactStats,
  navItems,
  profile,
  projects,
  volleyballProfile,
  volleyballStats,
} from "@/lib/content";

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="arrow-link">
      <span>{children}</span><i aria-hidden="true">↗</i>
    </a>
  );
}

function ProjectVisual({ kind, number }: { kind: string; number: string }) {
  return (
    <div className={`project-visual project-visual-${kind}`} aria-hidden="true">
      <span className="visual-index">FIELD_{number}</span>
      {kind === "battery" && (
        <div className="battery-object"><span /><i /><i /><i /></div>
      )}
      {kind === "research" && (
        <div className="scan-target"><i /><i /><i /><span>PERFUSION<br />MAP</span></div>
      )}
      {kind === "consulting" && (
        <div className="roadmap"><span>PRECLINICAL</span><i /><span>IND</span><i /><span>CLINIC</span></div>
      )}
      {kind === "prototype" && (
        <div className="prototype-object"><i /><i /><span>85°</span></div>
      )}
      {kind === "civic" && (
        <div className="civic-orbits"><i /><i /><i /><span>PEOPLE<br />FIRST</span></div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <InteractionLayer />
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Yashas Devulapally, home">
          <span>YD</span><i>®</i>
        </a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-socials">
          <a href={profile.github} target="_blank" rel="noreferrer">GH</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">IN</a>
        </div>
      </header>

      <main>
        <section id="top" className="hero section-pad">
          <div className="hero-annotation">
            <span>PORTFOLIO / 2026</span><span>GEORGIA TECH / ATLANTA</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="micro-label">HELLO, INTERNET.</p>
              <h1>
                <span>Hey, I&rsquo;m Yashas.</span>
                <span>I like making</span>
                <span><em>things happen.</em></span>
              </h1>
              <div className="hero-intro">
                <p>{profile.introduction}</p>
                <a className="jump-link" href="#now">SEE WHAT&rsquo;S CURRENT <span>↓</span></a>
              </div>
            </div>

            <figure className="hero-portrait">
              <div className="portrait-frame">
                <Image
                  src="/yashas-headshot.jpg"
                  alt="Yashas Devulapally"
                  width={1741}
                  height={2541}
                  sizes="(max-width: 960px) 82vw, 38vw"
                  preload
                />
                <span className="portrait-tag portrait-tag-top">OBJECT_01 / YASHAS</span>
                <span className="portrait-tag portrait-tag-side">CURIOUS BY DEFAULT</span>
              </div>
              <figcaption><span>BIOMEDICAL ENGINEER</span><span>BUILDER</span><span>ATHLETE</span></figcaption>
            </figure>
          </div>
          <div className="hero-bottomline">
            <span>BIOMEDICAL ENGINEERING</span><i>✦</i><span>BUILDING THINGS</span><i>✦</i>
            <span>CURIOUS BY DEFAULT</span>
          </div>
        </section>

        <section id="now" className="now-section section-pad">
          <div className="now-heading">
            <div className="status-light"><i /> LIVE STATUS</div>
            <h2>Currently<br /><em>running.</em></h2>
            <p>A live readout of what has my attention right now.</p>
          </div>
          <div className="now-grid">
            {currentlyRunning.map((item, index) => (
              <article key={item.code} className={index === 0 ? "now-card now-card-featured" : "now-card"}>
                <span>{item.code}</span>
                <h3>{item.label}</h3>
                <p>{item.value}</p>
                <i aria-hidden="true">0{index + 1}</i>
              </article>
            ))}
          </div>
        </section>

        <section className="signal-strip" aria-label="A few numbers from Yashas's work">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-heading">
            <span className="section-number">02</span>
            <div>
              <p className="micro-label">SELECTED SIGNALS</p>
              <h2>Work at the<br /><em>intersections.</em></h2>
            </div>
            <div className="section-aside">
              <p>The projects I keep coming back to live between disciplines: medicine and engineering, research and product, ideas and action.</p>
              <figure className="candid-photo">
                <Image
                  src="/yashas-locked.jpg"
                  alt="Yashas working at his laptop"
                  width={1206}
                  height={1301}
                  sizes="(max-width: 640px) 38vw, 12rem"
                />
                <figcaption>IN THE ZONE / 2026</figcaption>
              </figure>
            </div>
          </div>

          <div className="projects-list">
            {projects.map((project) => (
              <article className="project" key={project.number}>
                <ProjectVisual kind={project.kind} number={project.number} />
                <div className="project-copy">
                  <span className="micro-label">{project.number} / {project.kicker}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-foot">
                    <span>{project.metric}</span>
                    {"href" in project && project.href && <ArrowLink href={project.href}>Visit</ArrowLink>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="volleyball" className="volleyball-section section-pad">
          <div className="volleyball-topline">
            <span>COMPETITIVE MODE / 03</span><span>NEW ALBANY EAGLES / #17 / MIDDLE BLOCKER</span>
          </div>
          <div className="volleyball-grid">
            <div className="volleyball-copy">
              <p className="micro-label light">PRESSURE × TEAMWORK</p>
              <h2>Meet me<br /><em>above the net.</em></h2>
              <p>
                Four years of varsity volleyball taught me to reset fast, communicate clearly, and enjoy the points that carry the most pressure. I helped take New Albany to the Ohio Division I Final Four and earned team MVP, First Team All-Conference and All-Region, plus All-State Honorable Mention.
              </p>
              <ArrowLink href={volleyballProfile}>View full career stats</ArrowLink>
            </div>
            <div className="volleyball-scoreboard">
              <div className="jersey-mark" aria-hidden="true"><span>17</span><i>NA</i></div>
              <div className="scoreboard-data">
                <div className="volleyball-stats">
                  {volleyballStats.map((stat) => (
                    <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
                  ))}
                </div>
                <p>Ranked 41st nationally and 3rd in Ohio during the 2025 season. USA TODAY Player of the Year nominee.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-pad">
          <div className="contact-topline"><span>OPEN CHANNEL / 04</span><span>TYPE “YASHAS” FOR A SMALL SURPRISE</span></div>
          <p>Good ideas get better<br />when they <em>collide.</em></p>
          <div className="contact-links">
            <ArrowLink href={profile.linkedin}>Say hello on LinkedIn</ArrowLink>
            <ArrowLink href={profile.github}>See what I&rsquo;m building</ArrowLink>
          </div>
          <div className="contact-orbit" aria-hidden="true"><i /><span>YD</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <span>YASHAS DEVULAPALLY © 2026</span>
        <span>BUILT WITH CURIOSITY + A LOT OF BLUE</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}
