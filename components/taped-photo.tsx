import Image from "next/image";

/**
 * A print taped to the sheet.
 *
 * Deliberately outside any `.ink` group: ink soaks into paper and multiplies
 * with the creases, but a photograph is an object lying on top of it. It gets a
 * real drop shadow instead, and sits off-square because nobody tapes anything
 * on straight.
 */
export function TapedPhoto({
  src,
  alt,
  caption,
  rotate = 3,
  className = "w-24 sm:w-28",
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Degrees. Vary it per photo — a repeated angle reads as a grid. */
  rotate?: number;
  className?: string;
}) {
  return (
    <figure
      className="relative shrink-0"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/*
        The tape: translucent, brighter along the middle where it catches light.
        Its ends are ragged rather than cut — a mask with a hard-stop repeating
        gradient, since real tape tears.
      */}
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-2 bg-white/35 shadow-[0_1px_2px_rgba(0,0,0,0.12)] backdrop-blur-[0.5px]"
        style={{
          maskImage:
            "repeating-linear-gradient(90deg, #000 0 3px, #0006 3px 4px), linear-gradient(#000, #000)",
          WebkitMaskImage:
            "repeating-linear-gradient(90deg, #000 0 3px, #0006 3px 4px), linear-gradient(#000, #000)",
        }}
      />
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className={`block border-[5px] border-[#eceae4] shadow-[0_5px_12px_rgba(0,0,0,0.28)] ${className}`}
      />
      {caption && (
        <figcaption className="mt-1 text-center font-caveat text-base text-ink/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
