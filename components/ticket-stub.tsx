/**
 * A ticket stub, kept.
 *
 * The sentence says he's been to four Don Toliver shows; these are the four
 * stubs. Text and object aren't redundant — the line tells you, the pile is
 * the kind of thing a person actually has in a drawer.
 *
 * Card stock rather than ink: a stub lies *on* the sheet, so it sits outside
 * `.ink`, takes a real shadow, and is a shade warmer than the paper under it.
 * No dates or venues printed — those would be invented, and a stub reads as a
 * stub without them.
 */
export function TicketStub({
  act,
  rotate = 0,
  className = "",
}: {
  act: string;
  /** Degrees. Fan them; a stack of parallel tickets reads as clip art. */
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[8.5rem] shrink-0 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-stretch bg-[#eae5d9] shadow-[0_4px_11px_rgba(0,0,0,0.26)]">
        {/* The act sits at the top edge, not under the ADMIT ONE line: these
            are stacked with only a strip of each showing, and the strip has to
            be the part that says whose show it was. */}
        <div className="flex-1 px-2.5 py-1.5">
          <p className="font-mono text-[11px] font-bold uppercase leading-[1.15] tracking-tight text-ink/85">
            {act}
          </p>
          <p className="mt-1.5 font-mono text-[8px] tracking-[0.22em] text-ink/45">
            ADMIT ONE
          </p>
        </div>

        {/* The tear line. Real perforation is holes, not a dash — so this is a
            column of gaps punched out with a repeating gradient, and the
            paper's own crease shading shows through them. */}
        <div
          aria-hidden
          className="w-px shrink-0 bg-ink/25"
          style={{
            maskImage:
              "repeating-linear-gradient(to bottom, #000 0 2px, transparent 2px 5px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to bottom, #000 0 2px, transparent 2px 5px)",
          }}
        />

        <div className="flex w-6 shrink-0 items-center justify-center">
          <span className="rotate-90 font-mono text-[8px] tracking-[0.2em] text-ink/45">
            GA
          </span>
        </div>
      </div>
    </div>
  );
}
