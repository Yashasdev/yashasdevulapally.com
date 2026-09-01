/**
 * A company mark, printed rather than pasted.
 *
 * The logos arrive in four different treatments — white-on-black, a white
 * cursor with a purple glow, a full-colour mascot, a bare SVG path. Dropped
 * onto the sheet as-is they read as stickers: one is a black tile, one is
 * invisible on light paper. So each is reduced to its silhouette (the `-ink`
 * files, generated from the originals) and drawn here as a mask filled with
 * `currentColor`, which means every mark is the same ink as the writing around
 * it and inherits the crease multiply along with everything else.
 */
export function InkMark({
  src,
  className = "size-4",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
