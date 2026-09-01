"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { TOTAL_MS, UNFOLD_AT, crumpleAmount } from "@/lib/crumple";

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

/** Displacement at full crumple. Well past legible — that's the point. */
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

    // Warp the writing by however balled-up the sheet currently is. The number
    // comes from the shared clock rather than a timer of its own, so the text
    // and the paper under it are never a frame out of step.
    const run = (from: number) => {
      cancelAnimationFrame(raf);
      setDone(false);
      const t0 = performance.now() - from;
      const frame = () => {
        const elapsed = performance.now() - t0;
        const a = crumpleAmount(elapsed);
        if (a <= 0) {
          // Drop the filter entirely — a displacement map at scale 0 still
          // costs a full filter pass every repaint, and still softens the text.
          box.style.filter = "";
          setDone(true);
          return;
        }
        box.style.filter = "url(#uncrumple)";
        disp.setAttribute("scale", String(FROM * a));
        if (elapsed < TOTAL_MS) raf = requestAnimationFrame(frame);
      };
      frame();
    };

    run(UNFOLD_AT);
    const onRecrumple = () => run(0);
    window.addEventListener(RECRUMPLE_EVENT, onRecrumple);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(RECRUMPLE_EVENT, onRecrumple);
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
