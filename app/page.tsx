import { CrumpleButton } from "@/components/crumple-button";
import { CrumpleSheet } from "@/components/crumple-sheet";
import { Squiggle, TennisBall } from "@/components/doodle";
import { GitHubMark, LinkedInMark } from "@/components/icons";
import { InkMark } from "@/components/ink-mark";
import { InkTrail } from "@/components/ink-trail";
import { Paper } from "@/components/paper";
import { TapedPhoto } from "@/components/taped-photo";
import { TicketStub } from "@/components/ticket-stub";
import { Uncrumple } from "@/components/uncrumple";
import { WrittenName } from "@/components/written-name";
import { links, photos, profile, stubs } from "@/lib/content";

/**
 * A link inside a sentence. Underlined the way a pen underlines — the rule is
 * always there, it just darkens on hover. No trailing ↗: the arrows turn prose
 * into a row of buttons.
 */
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pointer-events-auto underline decoration-ink/30 underline-offset-[3px] transition-colors hover:decoration-ink"
    >
      {children}
    </a>
  );
}

/** A company mark set into the sentence that mentions it. */
function Named({
  href,
  mark,
  children,
}: {
  href: string;
  mark: string;
  children: React.ReactNode;
}) {
  return (
    <A href={href}>
      <InkMark src={mark} className="mr-1 size-[13px] translate-y-px" />
      {children}
    </A>
  );
}

export default function Home() {
  return (
    <main className="relative flex-1">
      {/*
        Everything that is the sheet goes inside CrumpleSheet, because "crumple
        it" has to take the paper with it — a page where only the writing balls
        up and the background stays put reads as a bug. The pen and the button
        stay outside: you keep drawing while it tumbles, and the control can't
        ride the thing it controls out of reach.
      */}
      <CrumpleSheet className="relative min-h-dvh">
        <Paper />

        {/*
          A stain, out where the sheet is empty. Nothing but atmosphere — but a
          blank margin is the tell that a page was generated rather than used.
        */}
        <div
          aria-hidden
          className="coffee-ring pointer-events-none absolute left-[7%] top-[16%] hidden size-44 rotate-12 lg:block"
        />

        {/* pointer-events-none: this covers the viewport; links opt back in. */}
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-dvh w-full max-w-[34rem] flex-col justify-center px-8 py-16 pb-28 sm:pb-16">
          <Uncrumple className="relative flex flex-col items-center gap-7">
            {/* ink: multiply, so the creases run through the writing rather than
              under it. The photograph stays out of this group — see
              TapedPhoto. */}
            <header className="ink flex flex-col items-center">
              <WrittenName
                text={profile.name}
                className="-rotate-1 text-center font-caveat text-6xl leading-none sm:text-7xl"
              />
              {/*
              The marks are solid glyphs next to light grey type, so at matching
              colour they read heavier than the words. Holding them at 70% evens
              the weight; they come up to full ink on hover, which is also the
              affordance that they're links.
            */}
              <div className="mt-3 flex items-center gap-x-3.5">
                <p className="font-mono text-sm text-faint">
                  {profile.tagline}
                </p>
                <span aria-hidden className="text-faint/50">
                  ·
                </span>
                <span className="flex items-center gap-x-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="pointer-events-auto text-faint/70 transition-colors hover:text-ink"
                  >
                    <GitHubMark className="size-[18px]" />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="pointer-events-auto text-faint/70 transition-colors hover:text-ink"
                  >
                    <LinkedInMark className="size-[18px]" />
                  </a>
                </span>
              </div>
            </header>

            {/*
            Plain sentences with verbs in them.
            
            Every previous version of this page compressed these same facts into
            fragments — "★★★★ tennis recruit", "lately it's all house", four
            prop ticket stubs — on the theory that terse reads as confident. It
            doesn't; it reads as generated, because the one thing a person does
            that a generator doesn't is simply say the thing. "I'm a huge Don
            Toliver fan and I've been to four of his concerts" tells a stranger
            something. A row of fake stubs tells them nothing and isn't even
            true. Nothing here should need decoding.
          */}
            <section className="ink space-y-3 text-[15px] leading-[1.8]">
              <p>
                I&rsquo;m currently building{" "}
                <Named href={links.presence} mark="/logos/presence-ink.png">
                  Presence
                </Named>
                .
              </p>

              {/*
              "I scaled it to $2M+ ARR" hands one person the credit for a
              company's revenue, which isn't true of anybody and reads as
              inflation the moment someone checks. The growth is "we"; what's
              his is the role and the ownership, which are the parts that
              actually say something about how he works.
            */}
              <p>
                Previously, I was the third engineering hire at{" "}
                <Named href={links.fleetline} mark="/logos/fleetline.svg">
                  Fleetline
                </Named>
                . I joined pre-revenue and owned large parts of the product as
                we grew to $2M+ ARR and got acquired by{" "}
                <A href={links.optym}>Optym</A>. Before Fleetline I was at{" "}
                <Named href={links.cliqk} mark="/logos/cliqk-ink.png">
                  Cliqk
                </Named>
                , and I taught a cohort at{" "}
                <Named href={links.aiSquads} mark="/logos/aisquads-ink.png">
                  AI Squads
                </Named>
                .
              </p>

              {/*
              "I used to be really good at it" is the page telling you how to
              rate him, which is where ego actually lives — not in the facts
              underneath. The rating comes out; the four stars and Kalamazoo
              stay and say the same thing without asking for anything.
            */}
              <p>
                I play tennis. I was a{" "}
                <A href={links.tennis}>four-star recruit</A> and I played the US
                Boys National Championships in Kalamazoo in 2025.
              </p>

              <p>
                I&rsquo;m a huge Don Toliver fan and I&rsquo;ve been to four of
                his concerts. Lately I&rsquo;ve really gotten into{" "}
                {/* The one phrase the pen goes back over. It's a taste, not an
                  achievement — a wave under your own revenue figure is the page
                  nudging you to be impressed, which is the one thing it must
                  never do. relative + inline-block so the wave sizes to exactly
                  this word and can't be split by a line break. */}
                <span className="relative inline-block">
                  house music
                  <Squiggle
                    className="-bottom-1 left-0 h-[7px] w-full text-ink/55"
                    delay={140}
                  />
                </span>
                .
              </p>
            </section>

            {/* Idling low in the right-hand gutter — the corner of the desk the
              writing never reaches. Faint, because a doodle is pressed lighter
              than the thing you meant to write. */}
            <TennisBall
              className="ink absolute -bottom-8 left-full ml-24 hidden size-28 -rotate-6 text-ink/30 xl:block"
              delay={1100}
            />

            {/*
            The stubs. The sentence above says he's been to four shows; this is
            the drawer they came out of. Each is rotated further and pulled up
            over the last, the way a handful of tickets falls — the overlap is
            what makes it a pile someone kept rather than a row someone laid
            out. Out in the gutter at wide widths, back in the flow below that.
          */}
            {stubs.length > 0 && (
              <div className="flex flex-col items-center xl:absolute xl:right-full xl:top-24 xl:mr-14">
                {stubs.map((act, i) => (
                  <TicketStub
                    key={i}
                    act={act}
                    rotate={[-4.5, 2.5, -1.5, 4][i % 4]}
                    className={i > 0 ? "-mt-6" : ""}
                  />
                ))}
              </div>
            )}

            {photos.length > 0 && (
              <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-7 xl:absolute xl:left-full xl:top-16 xl:ml-14 xl:w-40">
                {photos.map((p) => (
                  <TapedPhoto
                    key={p.src}
                    src={p.src}
                    alt={p.alt}
                    caption={p.caption}
                    rotate={p.rotate}
                    className={p.width ?? "w-32"}
                  />
                ))}
              </div>
            )}

            <footer className="ink flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
              <span className="-rotate-1 font-caveat text-xl">say hi →</span>
              {/* The separator hangs off the end of each address rather than the
                front of the next one, so a wrap leaves the dot at the end of
                the line instead of orphaning it at the start. */}
              <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-faint">
                {profile.emails.map((email, i) => (
                  <span key={email} className="flex items-center gap-x-3">
                    <a
                      href={`mailto:${email}`}
                      className="pointer-events-auto underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current"
                    >
                      {email}
                    </a>
                    {i < profile.emails.length - 1 && (
                      <span aria-hidden className="text-faint/50">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            </footer>
          </Uncrumple>
        </div>
      </CrumpleSheet>

      <InkTrail />
      <CrumpleButton />
    </main>
  );
}
