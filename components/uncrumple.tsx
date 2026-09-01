"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { RECRUMPLE_EVENT } from "./crumple-button";

/**
 * The sheet arrives balled up and smooths itself out.
 *
 * The writing is *on* the paper, so it has to deform with it — text that stayed
 * crisp while the surface flattened would read as a video playing behind glass.
 * So the whole block runs through a displacement map whose scale falls to zero:
 * at the start the ink is pushed around by the creases and is illegible, at the
 * end it is perfectly flat. The paper's own crease depth relaxes on the same
 * curve (see CrumpleLight), so the two read as one physical event.
 *
 * The filter is attached on mount rather than server-rendered: without
 * JavaScript, no filter is ever applied and the text simply renders flat and
 * readable, instead of being frozen mid-crumple.
 */

// Runs before paint, so the filter is attached without a frame of crisp text
// flashing first. Falls back on the server, where layout effects are no-ops.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const UNCRUMPLE_MS = 1500;
const FROM = 46;

export function Uncrumple({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const [, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const box = boxRef.current;
    const disp = dispRef.current;
    if (!box || !disp) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    // Ball it up and let it relax. Run once on mount, and again every time the
    // sheet is crumpled by hand — the same animation both times, because
    // "balled up, then flattening" is what you'd see either way.
    const run = () => {
      cancelAnimationFrame(raf);
      box.style.filter = "url(#uncrumple)";
      disp.setAttribute("scale", String(FROM));
      setDone(false);

      const t0 = performance.now();
      const frame = () => {
        const e = Math.min(1, (performance.now() - t0) / UNCRUMPLE_MS);
        const eased = 1 - Math.pow(1 - e, 3);
        disp.setAttribute("scale", String(FROM * (1 - eased)));
        if (e < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          // Drop the filter entirely — a displacement map at scale 0 still
          // costs a full filter pass every repaint, and still softens the text.
          box.style.filter = "";
          setDone(true);
        }
      };
      raf = requestAnimationFrame(frame);
    };

    run();
    window.addEventListener(RECRUMPLE_EVENT, run);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(RECRUMPLE_EVENT, run);
    };
  }, []);

  return (
    <>
      <svg aria-hidden focusable="false" className="absolute h-0 w-0">
        <defs>
          <filter
            id="uncrumple"
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009"
              numOctaves="3"
              seed="21"
              result="n"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="n"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div ref={boxRef} className={className}>
        {children}
      </div>
    </>
  );
}
