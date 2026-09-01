"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { TOTAL_MS, UNFOLD_AT, crumpleAmount, sheetScale } from "@/lib/crumple";

import { RECRUMPLE_EVENT } from "./crumple-button";

/**
 * The sheet itself — paper, writing and everything lying on it — balled up.
 *
 * The paper is a set of fixed, viewport-filling layers, so "crumple it" means
 * shrinking and tumbling that whole stack toward the middle of the screen
 * until it's a small object, holding it there, and letting it open again. The
 * desk underneath is only ever visible during those two seconds; the rest of
 * the time the sheet covers it completely.
 *
 * Three things sell it as a ball rather than a shrinking rectangle:
 *
 *  - an interpolated polygon outline, which gives the ball flat panels meeting
 *    at corners. A border radius can only bend smoothly, so it lands on an
 *    ellipse — and an ellipse reads as a pebble.
 *  - rotation, so it tumbles rather than zooming.
 *  - the creases going deep at the same time (CrumpleLight watches the same
 *    clock), which is what actually reads as *crumpled* — a small smooth
 *    rectangle reads as a thumbnail.
 *
 * The writing's own warp stays on the text box (see Uncrumple) rather than
 * being applied here: a displacement map over the whole viewport, with a live
 * WebGL canvas inside it, costs a full-screen filter pass every frame for very
 * little that the shrink isn't already doing.
 */

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Degrees of tumble at full crumple. */
const BALL_SPIN = -168;

/**
 * The ball's outline, as a radius per direction in percent of the box.
 *
 * A border radius can only ever bend a corner smoothly, so it lands on an
 * ellipse however lopsided the values are — and an ellipse is a pebble. Real
 * crumpled paper has an angular silhouette: flat panels meeting at corners,
 * some pushed out, some caved in. So the shape is a twelve-sided polygon with
 * radii that jump around, and the outline is interpolated from the full
 * rectangle out to this as the sheet balls up.
 */
const BALL_OUTLINE = [46, 34, 45, 31, 48, 36, 42, 30, 47, 33, 44, 38];

/** The rectangle's own boundary in direction `th`, from the centre, in %. */
function edgeAt(cos: number, sin: number) {
  return Math.min(
    50 / Math.max(Math.abs(cos), 1e-6),
    50 / Math.max(Math.abs(sin), 1e-6),
  );
}

export function CrumpleSheet({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const apply = (a: number) => {
      if (a <= 0) {
        // Flat: drop every property rather than leaving identity transforms on
        // a viewport-sized element, which keeps it off the compositor and out
        // of the way of `position: fixed` inside it.
        box.style.transform = "";
        box.style.clipPath = "";
        box.style.boxShadow = "";
        box.style.transformOrigin = "";
        return;
      }
      const s = sheetScale(a, box.offsetWidth, window.innerHeight);

      // Walk the outline: for each direction, find where the flat sheet's edge
      // is and where the ball's is, and sit at `a` between them. At a = 0 every
      // point lands exactly on the rectangle, so the polygon is the untouched
      // page and there's nothing to see.
      const pts = BALL_OUTLINE.map((radius, i) => {
        const th = (i / BALL_OUTLINE.length) * Math.PI * 2 - Math.PI / 2;
        const cos = Math.cos(th);
        const sin = Math.sin(th);
        const t = edgeAt(cos, sin);
        const x = 50 + (t + (radius - t) * a) * cos;
        const y = 50 + (t + (radius - t) * a) * sin;
        return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
      });
      // Half a viewport down, not half the sheet: the sheet's own box can be
      // taller than the screen on a phone, and pivoting about its middle would
      // ball the page up somewhere below the fold.
      box.style.transformOrigin = "50% 50vh";
      box.style.transform = `scale(${s.x}, ${s.y}) rotate(${a * BALL_SPIN}deg)`;
      box.style.clipPath = `polygon(${pts.join(", ")})`;
      // The shadow is drawn in the element's own coordinates and then scaled
      // down with it, so the offset and blur are divided by the scale to come
      // back out at a fixed size on screen. Written the other way round, a
      // 40px blur on a ball a tenth of the size lands as a 4px hairline.
      const k = Math.max(s.y, 0.08);
      box.style.boxShadow = `0 ${(14 * a) / k}px ${(40 * a) / k}px rgba(0,0,0,${0.55 * a})`;
    };

    const run = (from: number) => {
      cancelAnimationFrame(raf);
      const t0 = performance.now() - from;
      const frame = () => {
        const elapsed = performance.now() - t0;
        apply(crumpleAmount(elapsed));
        if (elapsed < TOTAL_MS) raf = requestAnimationFrame(frame);
      };
      frame();
    };

    // On load, join the timeline at the moment the ball starts to open.
    run(UNFOLD_AT);

    // Balling up from a scroll position halfway down the page would collapse
    // the sheet around a point nobody is looking at.
    const onRecrumple = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      run(0);
    };
    window.addEventListener(RECRUMPLE_EVENT, onRecrumple);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(RECRUMPLE_EVENT, onRecrumple);
    };
  }, []);

  return (
    <div ref={boxRef} className={className}>
      {children}
    </div>
  );
}
