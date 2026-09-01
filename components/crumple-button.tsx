"use client";

/**
 * Ball the sheet up again.
 *
 * The page already opens by un-crumpling; this just lets you do it a second
 * time, which turns a thing you watched into a thing you can operate. Both the
 * text warp and the paper's own crease depth listen for the same event and
 * restart together, so it stays one physical gesture rather than two effects
 * that happen to fire at once.
 */
export const RECRUMPLE_EVENT = "recrumple";

export function CrumpleButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(RECRUMPLE_EVENT))}
      className="pointer-events-auto fixed bottom-6 right-6 z-30 flex items-center gap-2 text-faint/60 transition-colors hover:text-ink"
    >
      {/* A balled-up sheet: an irregular hull with a few creases running into
          it. Deliberately not a neat polygon — nothing crumples symmetrically. */}
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M7 12l6-6 8 2 4 6-2 8-7 4-8-3-2-7z" />
        <path d="M13 6l3 8 7-2M16 14l-2 9M16 14l8 3" />
      </svg>
      {/* Label only where there's room for it. On a phone the footer runs to
          the bottom of the sheet and the words would land on top of the email
          addresses; the icon alone still reads. */}
      <span className="hidden font-caveat text-lg leading-none sm:inline">
        crumple it
      </span>
    </button>
  );
}
