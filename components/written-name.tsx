/**
 * The name, written on rather than switched on.
 *
 * Each letter is revealed left-to-right on a stagger, so the ink appears in
 * reading order at roughly writing speed. The letters carry the real text — the
 * accessible name is on the heading itself, and the spans are hidden from
 * assistive tech so it isn't spelled out one character at a time.
 */
export function WrittenName({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <h1 aria-label={text} className={className}>
      {[...text].map((ch, i) => (
        <span
          aria-hidden
          key={`${ch}-${i}`}
          className="letter"
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h1>
  );
}
