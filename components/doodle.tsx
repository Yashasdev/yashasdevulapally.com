/**
 * Pen marks made *after* the page was written — the ring somebody draws round a
 * word once it's already on the paper, the wave scratched under a phrase they
 * liked. They ink themselves in a stroke at a time once the sheet has finished
 * flattening, so they read as somebody going back over it rather than as
 * decoration that was always printed there.
 *
 * Both paths are deliberately imperfect: the ring overshoots where it closes,
 * because a hand coming back round never lands on its own start.
 */

/** A wave scratched under a phrase. */
export function Squiggle({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
      fill="none"
    >
      <path
        d="M2 7c16-8 30 6 47-1s30 7 48 0 31 7 49 0 30 6 52-2"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="doodle"
        style={{ "--doodle-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

/**
 * A tennis ball, drawn on the sheet the way somebody draws while they're on the
 * phone. The outline doesn't quite close and the seams are struck in after it,
 * in that order, because that's the order a hand does it in.
 *
 * It earns its place by being the one thing here that's idle. Everything else
 * on the page is doing a job.
 */
export function TennisBall({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M50 6c24 0 44 20 44 44S74 94 50 94 6 74 6 50 25 7 47 6"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="doodle"
        style={{ "--doodle-delay": `${delay}ms` } as React.CSSProperties}
      />
      <path
        d="M18 19c15 13 15 49 0 62"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="doodle"
        style={{ "--doodle-delay": `${delay + 420}ms` } as React.CSSProperties}
      />
      <path
        d="M82 19c-15 13-15 49 0 62"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="doodle"
        style={{ "--doodle-delay": `${delay + 640}ms` } as React.CSSProperties}
      />
    </svg>
  );
}
