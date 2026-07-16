import Image from "next/image";
import { GitHubMark, LinkedInMark } from "@/components/icons";
import { Paper } from "@/components/paper";
import { TapedPhoto } from "@/components/taped-photo";
import { Uncrumple } from "@/components/uncrumple";
import { WrittenName } from "@/components/written-name";
import { experience, notes, profile, type Role } from "@/lib/content";

function Out({
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
      target="_blank"
      rel="noreferrer"
      className={`pointer-events-auto inline-flex items-center gap-0.5 underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current ${className}`}
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  );
}

function RoleRow({ role }: { role: Role }) {
  return (
    <li className="py-1.5">
      <div className="flex flex-col gap-x-4 sm:grid sm:grid-cols-[8.5rem_1fr_auto] sm:items-baseline">
        <h3 className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
          {role.logo && (
            <Image
              src={role.logo}
              alt=""
              width={32}
              height={32}
              className="size-4 shrink-0 object-contain"
            />
          )}
          {role.company}
        </h3>
        <p className="text-[15px] text-muted">{role.title}</p>
        <span className="whitespace-nowrap text-xs text-faint">
          {role.when}
        </span>
      </div>

      {/* Column width (8.5rem) plus the grid gap (1rem) — that's where the
          title column actually begins, so notes line up under it. */}
      {(role.note || role.site) && (
        <div className="mt-0.5 space-y-0.5 text-[13px] leading-relaxed text-muted sm:pl-[9.5rem]">
          {role.note && <p>{role.note}</p>}
          {role.aside && <p className="text-faint">{role.aside}</p>}
          {role.site && role.href && (
            <p className="text-[11px] text-faint">
              <Out href={role.href}>{role.site}</Out>
            </p>
          )}
        </div>
      )}
    </li>
  );
}

export default function Home() {
  return (
    <main className="relative flex-1">
      <Paper />

      {/* pointer-events-none: this covers the viewport; links opt back in. */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-8 py-16">
        <Uncrumple className="flex flex-col gap-9">
          <header className="flex items-start justify-between gap-6">
            {/* ink: multiply, so the creases run through the writing rather
                than under it. The photo stays out of this group — see
                TapedPhoto. */}
            <div className="ink">
              <WrittenName
                text={profile.name}
                className="-rotate-1 font-caveat text-6xl leading-none sm:text-7xl"
              />
              {/*
                The marks are solid glyphs next to light grey type, so at
                matching colour they read heavier than the words. Holding them
                at 70% evens the weight; they come up to full ink on hover,
                which is also the affordance that they're links.
              */}
              <div className="mt-2.5 flex items-center gap-x-3.5">
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
            </div>
            <TapedPhoto src="/hriday.jpg" alt={profile.name} rotate={3} />
          </header>

          <section className="ink">
            <ul className="space-y-2">
              {experience.map((r) => (
                <RoleRow key={r.company} role={r} />
              ))}
            </ul>
          </section>

          <footer className="ink space-y-4">
            {notes.length > 0 && (
              <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-caveat text-xl text-ink">
                {notes.map((n, i) => (
                  // Each note leans a slightly different way — a pen doesn't
                  // repeat itself.
                  <li
                    key={n.text}
                    style={{
                      transform: `rotate(${i % 2 ? 1.2 : -1.4}deg)`,
                    }}
                  >
                    {n.href ? <Out href={n.href}>{n.text}</Out> : n.text}
                  </li>
                ))}
              </ul>
            )}

            {/* GitHub and LinkedIn live up by the name now, so this is just
                the addresses. */}
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-faint">
              {profile.emails.map((email, i) => (
                <span key={email} className="flex items-center gap-x-3">
                  {i > 0 && (
                    <span aria-hidden className="text-faint/50">
                      ·
                    </span>
                  )}
                  <a
                    href={`mailto:${email}`}
                    className="pointer-events-auto underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current"
                  >
                    {email}
                  </a>
                </span>
              ))}
            </nav>
          </footer>
        </Uncrumple>
      </div>
    </main>
  );
}
