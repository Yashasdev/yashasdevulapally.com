import { HeroOrbit } from "@/components/hero-orbit";
import { InteractionLayer } from "@/components/interaction-layer";
import { YashasOS } from "@/components/yashas-os";
import { currentlyRunning, navItems, profile, stories } from "@/lib/content";

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="arrow-link">
      <span>{children}</span><i aria-hidden="true">↗</i>
    </a>
  );
}

function StoryVisual({ kind, number }: { kind: string; number: string }) {
  return (
    <div className={`story-visual story-visual-${kind}`} aria-hidden="true">
      <span className="story-visual-index">FIELD_{number}</span>
      {kind === "research" && (
        <>
          <div className="scan scan-one" /><div className="scan scan-two" />
          <div className="scan-target"><i /><i /><i /></div>
        </>
      )}
      {kind === "modeling" && (
        <>
          <div className="model-bars"><i /><i /><i /><i /><i /><i /></div>
          <svg viewBox="0 0 400 220" preserveAspectRatio="none">
            <path d="M0 188C55 184 70 156 114 158c56 3 54-85 105-75 46 9 51-55 96-39 39 14 51-28 85-35" />
          </svg>
        </>
      )}
      {kind === "civic" && (
        <div className="civic-orbits">
          <i /><i /><i /><span>PEOPLE<br />FIRST</span>
        </div>
      )}
      {kind === "sport" && (
        <div className="court">
          <div className="court-net" />
          <i className="court-ball" />
          <span>17</span>
        </div>
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
          <div className="hero-annotation"><span>PORTFOLIO / 2026</span><span>GEORGIA TECH / WORLDWIDE</span></div>
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
                <a className="jump-link" href="#os">ENTER YASHAS OS <span>↓</span></a>
              </div>
            </div>
            <HeroOrbit />
          </div>
          <div className="hero-bottomline">
            <span>BIOMEDICAL ENGINEERING</span><i>✦</i><span>BUILDING THINGS</span><i>✦</i>
            <span>CURIOUS BY DEFAULT</span>
          </div>
        </section>

        <section className="many-sides" aria-label="A few sides of Yashas">
          <div className="many-sides-intro">
            <span className="micro-label light">NOT ONE LANE / 001</span>
            <p>I&rsquo;m happiest somewhere between disciplines—when the map isn&rsquo;t obvious yet.</p>
          </div>
          <div className="word-river" aria-hidden="true">
            <div>
              BUILDING <em>↗</em> EXPLORING <em>↗</em> COMPETING <em>↗</em> CREATING <em>↗</em> THINKING <em>↗</em>
              BUILDING <em>↗</em> EXPLORING <em>↗</em> COMPETING <em>↗</em> CREATING <em>↗</em> THINKING <em>↗</em>
            </div>
          </div>
          <div className="many-sides-note">
            <span>STARTUPS / MEDICINE / DESIGN / MUSIC / OUTDOORS / SPORT / FOOD / PEOPLE</span>
            <span>KEEP SCROLLING ↓</span>
          </div>
        </section>

        <section id="os" className="os-section section-pad">
          <div className="section-heading">
            <span className="section-number">02</span>
            <div>
              <p className="micro-label">THE SIGNATURE FEATURE</p>
              <h2>Welcome to<br /><em>Yashas OS.</em></h2>
            </div>
            <p>A clickable map of the different modes I move through. Pick one and play around.</p>
          </div>
          <YashasOS />
        </section>

        <section id="now" className="now-section section-pad">
          <div className="now-heading">
            <div className="status-light"><i /> LIVE STATUS</div>
            <h2>Currently<br /><em>running.</em></h2>
            <p>Life changes faster than a résumé. This is the part designed to change with it.</p>
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
          <p className="edit-note">EDITABLE IN <code>lib/content.ts</code> / NO INVENTED STATUS UPDATES</p>
        </section>

        <section id="stories" className="stories-section section-pad">
          <div className="section-heading stories-heading">
            <span className="section-number">04</span>
            <div>
              <p className="micro-label">SELECTED SIGNALS</p>
              <h2>Things worth<br /><em>telling you about.</em></h2>
            </div>
            <p>Not a timeline. Just a few experiences that changed how I think, build, and show up.</p>
          </div>

          <div className="stories-list">
            {stories.map((story) => (
              <article className="story" key={story.number}>
                <StoryVisual kind={story.kind} number={story.number} />
                <div className="story-copy">
                  <span className="micro-label">{story.number} / {story.kicker}</span>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <div className="story-foot">
                    <span>{story.footnote}</span>
                    {"href" in story && story.href && <ArrowLink href={story.href}>Visit</ArrowLink>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section-pad">
          <div className="contact-topline"><span>OPEN CHANNEL / 05</span><span>TYPE “YASHAS” FOR A SMALL SURPRISE</span></div>
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
