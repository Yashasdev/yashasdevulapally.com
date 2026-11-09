import Image from "next/image";
import Link from "next/link";
import { HeroOrbit } from "@/components/hero-orbit";
import { PhotoGallery } from "@/components/photo-gallery";
import { profile } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="home-intro">
        <p className="eyebrow">OHIO ROOTS. ATLANTA CHAPTER.</p>
        <div className="intro-grid">
          <div>
            <h1>
              Yashas
              <br />
              Devulapally<span>.</span>
            </h1>
            <p className="subtitle">
              Biomedical Engineering at Georgia Tech
              <br />
              Stamps President&rsquo;s Scholar
            </p>
          </div>
          <Image
            className="profile-photo"
            src="/yashas-headshot.jpg"
            alt="Yashas Devulapally"
            width={1741}
            height={2541}
            sizes="(max-width: 600px) 110px, 160px"
            preload
          />
        </div>
        <div className="intro-body">
          <p>
            Hi, I&rsquo;m Yashas. I&rsquo;m a biomedical engineering student at
            Georgia Tech, interested in the space between medicine, engineering,
            and building things that help people. I’m also part of Georgia
            Tech’s Grand Challenges Living Learning Community.
          </p>
          <p>
            That curiosity has taken me from PET/CT imaging research at
            Nationwide Children&rsquo;s to flexible batteries at NavaFlex and
            biotech strategy with BioConnect. I&rsquo;m especially drawn to
            surgical robotics, wearable technology, and the ideas that turn
            research into something useful.
          </p>
          <p>
            I also founded <Link href="/work">Think Like an Engineer</Link>, a
            hands-on course that introduced middle-school students at the
            Hilltop YMCA to engineering through building and experimentation.
          </p>
          <p>
            Outside of work, you&rsquo;ll find me playing volleyball, lifting,
            making content, or spending time with friends. I like making things
            happen—and learning along the way.
          </p>
          <p>
            This is a home for my <Link href="/work">research and work</Link>,
            what I&rsquo;m <Link href="/now">working on now</Link>, and life{" "}
            <Link href="/volleyball">above the net</Link>.
          </p>
        </div>
        <div className="social-links">
          <a href="mailto:ydevulapally3@gatech.edu">Email ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </section>
      <section className="moments-section">
        <div className="section-heading">
          <h2>A few moments</h2>
          <span>Click a photo to look closer</span>
        </div>
        <PhotoGallery
          photos={[
            {
              src: "/yashas-locked.jpg",
              alt: "Yashas working at his laptop",
              caption: "Making things happen",
            },
            {
              src: "/friends.jpg",
              alt: "Yashas spending time with friends",
              caption: "The people along the way",
            },
            {
              src: "/volleyball/attack-home.jpg",
              alt: "Yashas attacking above the net",
              caption: "A different kind of focus",
            },
          ]}
        />
      </section>
      <section className="home-bottom">
        <div>
          <p className="eyebrow">A LITTLE CURIOSITY</p>
          <h2>Always in motion.</h2>
          <p>
            Research, building, and a few side quests.
            <br />
            <Link href="/now">See what has my attention →</Link>
          </p>
        </div>
        <HeroOrbit />
      </section>
    </>
  );
}
