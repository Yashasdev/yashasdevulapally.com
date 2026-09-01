"use client";

import { useEffect, useRef } from "react";

/**
 * The page is a sheet of paper, so you can write on it.
 *
 * The cursor lays down wet ink that dries out over a few seconds and is gone.
 * It multiplies into the sheet like every other mark here, which means your
 * scribble sinks into the creases instead of floating over them — the same
 * trick the rest of the page uses, applied to something you made.
 *
 * A real nib puts down less ink the faster it moves, so stroke width comes off
 * pointer speed rather than being constant. That single detail is most of the
 * difference between "a pen" and "a glowing line following the mouse".
 *
 * Mouse and stylus only. On a touchscreen the same gesture is a scroll, and
 * hijacking it to draw would break the page to win a trick.
 */

/** How long a stroke takes to dry out completely. */
const LIFE_MS = 2600;
/** Nib width at rest, and the floor it thins to at speed. */
const W_MAX = 3.1;
const W_MIN = 1.25;
/** A jump further than this is the pointer teleporting, not a stroke. */
const BREAK_PX = 90;

type Seg = { x1: number; y1: number; x2: number; y2: number; w: number; t: number };

export function InkTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const segs: Seg[] = [];
    let px = 0;
    let py = 0;
    let pt = 0;
    let down = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;

      if (down) {
        const dx = x - px;
        const dy = y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < BREAK_PX) {
          // px per ms; a brisk cursor is ~2, a slow one well under 1.
          const speed = dist / Math.max(1, now - pt);
          const w = Math.max(W_MIN, W_MAX - speed * 0.85);
          segs.push({ x1: px, y1: py, x2: x, y2: y, w, t: now });
        }
      }
      px = x;
      py = y;
      pt = now;
      down = true;
    };

    const onLeave = () => {
      down = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    let raf = 0;
    const frame = () => {
      const now = performance.now();
      // Drop dried segments off the front — they're pushed in time order, so
      // everything expired is a prefix and one splice clears it.
      let live = 0;
      while (live < segs.length && now - segs[live].t > LIFE_MS) live++;
      if (live) segs.splice(0, live);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const s of segs) {
        // Squared falloff: ink sits wet for a moment and then goes quickly,
        // which is what drying looks like. Linear reads as a dimmer switch.
        const life = 1 - (now - s.t) / LIFE_MS;
        ctx.globalAlpha = life * life * 0.75;
        ctx.strokeStyle = "#1c2637";
        ctx.lineWidth = s.w;
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 h-full w-full mix-blend-multiply"
    />
  );
}
