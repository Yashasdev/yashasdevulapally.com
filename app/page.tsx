import { Clock } from "@/components/clock";
import { DitherPortrait } from "@/components/dither-portrait";
import { InkMark } from "@/components/ink-mark";
import { links, profile } from "@/lib/content";

/**
 * A link inside a sentence, with a faint rule that darkens on hover. No
 * trailing ↗: the arrows turn prose into a row of buttons.
 */
function A({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      className={`underline decoration-faint/50 underline-offset-[3px] transition-colors hover:decoration-fg ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * A company mark set into the sentence that mentions it.
 *
 * nowrap because the mark is an inline-block, and a line is allowed to break
 * between an atomic inline box and the text after it even with no space
 * between them — which strands the logo at the end of one line and its own
 * name at the start of the next.
 */
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
    <A href={href} className="whitespace-nowrap">
      <InkMark
        src={mark}
        className="mr-[0.25em] size-[0.8em] translate-y-[0.1em]"
      />
      {children}
    </A>
  );
}

/**
 * A registration mark where two grid lines cross. Centred on the corner it's
 * placed at, so it sits over the lines rather than beside them.
 */
function Cross({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`absolute z-10 size-4 text-fg ${className}`}
    >
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** "a@b.com" → "a [at] b [dot] com". */
function spellOut(email: string) {
  return email.replace("@", " [at] ").replaceAll(".", " [dot] ");
}

export default function Home() {
  return (
    // The side rails run the full height of the window; the frame is inset
    // from the top and bottom so its closing lines have room to show.
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col overflow-y-clip border-x border-line py-[clamp(0.75rem,calc(8vh_-_2.75rem),3.5rem)]">
      <div className="relative flex flex-1 flex-col border-y border-line">
        <Cross className="-top-2 -left-2" />
        <Cross className="-top-2 -right-2" />
        <Cross className="-bottom-2 -left-2" />
        <Cross className="-bottom-2 -right-2" />
        <main className="flex flex-1 flex-col">
          <header className="relative flex flex-col gap-6 border-b border-line px-6 py-7 sm:flex-row sm:items-center sm:px-10">
            <Cross className="-bottom-2 -left-2" />
            <Cross className="-bottom-2 -right-2" />
            <DitherPortrait
              src="/hriday.jpg"
              alt={profile.name}
              dots={96}
              className="size-24 shrink-0 border border-line"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h1 className="text-2xl font-medium tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-sm">
                  <A href={profile.github}>GitHub</A>
                  <span className="mx-2 text-faint">/</span>
                  <A href={profile.linkedin}>LinkedIn</A>
                </p>
              </div>
              <p className="text-muted">{profile.tagline}</p>
              {/*
              Spelled out rather than linked, so scrapers don't harvest them.
              The separator hangs off the end of each address rather than the
              front of the next, so a wrap never starts a line with a slash.
            */}
              <ul className="mt-3 flex flex-wrap gap-x-2 text-sm leading-6 text-muted">
                {profile.emails.map((email, i) => (
                  <li key={email} className="whitespace-nowrap">
                    {spellOut(email)}
                    {i < profile.emails.length - 1 && (
                      <span className="ml-2 text-faint">/</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          {/*
          Plain sentences with verbs in them.

          Every previous version of this page compressed these same facts into
          fragments — "★★★★ tennis recruit", "lately it's all house" — on the
          theory that terse reads as confident. It doesn't; it reads as
          generated, because the one thing a person does that a generator
          doesn't is simply say the thing. "I'm a huge Don Toliver fan and I've
          been to four of his concerts" tells a stranger something.

          Set large, in one block: the lines frame it, and the size is what
          fills the frame. Each paragraph opens in black and trails off into
          grey, so a skim down the left edge still gets the gist.
        */}
          <section className="flex flex-1 flex-col justify-center gap-5 px-6 py-5 text-[22px] leading-[1.27] font-medium tracking-[-0.02em] text-faint sm:px-10 sm:text-2xl">
            <p>
              <span className="text-fg">
                I&rsquo;m currently nerding out over ML for the physical world,
              </span>{" "}
              especially VLAs for robot learning.
            </p>

            <p>
              <span className="text-fg">
                On the side, I&rsquo;m building{" "}
                <Named href={links.presence} mark="/logos/presence-ink.png">
                  Presence
                </Named>
                ,
              </span>{" "}
              where we make custom agent harnesses for service businesses.
            </p>

            {/*
            "I scaled it to $2M+ ARR" hands one person the credit for a
            company's revenue, which isn't true of anybody and reads as
            inflation the moment someone checks. The growth is "we"; what's his
            is the role and the ownership, which are the parts that actually
            say something about how he works.
          */}
            <p>
              <span className="text-fg">
                Previously, I was the 3rd engineering hire at{" "}
                <Named href={links.fleetline} mark="/logos/fleetline.svg">
                  Fleetline
                </Named>{" "}
                (YC&nbsp;S25).
              </span>{" "}
              I joined pre-revenue and owned large parts of the product as we
              grew to $2M+ ARR and got acquired by{" "}
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
            "I used to be really good at it" is the page telling you how to rate
            him, which is where ego actually lives — not in the facts
            underneath. The rating comes out; the four stars and Kalamazoo stay
            and say the same thing without asking for anything.
          */}
            <p>
              <span className="text-fg">
                I played tennis competitively growing up.
              </span>{" "}
              I was a <A href={links.tennis}>four-star recruit</A> and played
              the US Boys National Championships in Kalamazoo in 2025. These
              days I just play for fun.
            </p>

            <p>
              <span className="text-fg">
                I&rsquo;m a huge Don Toliver fan and I&rsquo;ve been to four of
                his concerts.
              </span>{" "}
              Lately I&rsquo;ve really gotten into house music.
            </p>
          </section>
        </main>

        <footer className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-6 py-5 font-mono text-[13px] tracking-wider text-faint uppercase sm:px-10">
          <Cross className="-top-2 -left-2" />
          <Cross className="-top-2 -right-2" />
          <span>[ Atlanta, GA ]</span>
          <span>
            [ <Clock /> ]
          </span>
        </footer>
      </div>
    </div>
  );
}
