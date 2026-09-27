"use client";

import { useEffect, useRef } from "react";

// 4×4 Bayer matrix. Ordered dithering lays the tones out on a regular grid,
// which sits with the ruled lines of the page better than error diffusion's
// noise does, and keeps a face legible at avatar size.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

// Hovering develops the photo slowly; leaving puts the dither back quicker,
// since that's tidying up rather than the thing you came to see.
const IN_MS = 2000;
const OUT_MS = 1000;

const ease = (p: number) => 0.5 - Math.cos(Math.PI * p) / 2;

/**
 * The photo, reduced to pure black and white, so the only image on the page is
 * made of the same two colours as everything else. Hovering develops it into
 * the real photo in greyscale: the dither gains grey levels and resolution
 * frame by frame until nothing of the grid is left, and runs back on leave.
 */
export function DitherPortrait({
  src,
  alt,
  dots = 96,
  className = "",
}: {
  src: string;
  alt: string;
  /** Pixels across. Match the rendered size for one dot per CSS pixel. */
  dots?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<(on: boolean) => void>(() => {});

  useEffect(() => {
    const N = dots;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const work = document.createElement("canvas");
    const workCtx = work.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx || !workCtx) return;

    // The crop in colour at device resolution; every frame is drawn from it.
    let crop: HTMLCanvasElement | null = null;
    let p = 0;
    let target = 0;
    let raf = 0;
    let last = 0;

    // e = 0 is the plain dither: two levels, one canvas pixel per dot. e = 1
    // is the photo. In between, the level count and the resolution both climb
    // geometrically, so each frame is a similar-sized step to the eye.
    const draw = (e: number) => {
      if (!crop) return;
      const hi = crop.width;

      if (e >= 1) {
        canvas.width = canvas.height = hi;
        ctx.filter = "grayscale(1)";
        ctx.drawImage(crop, 0, 0);
        return;
      }

      const R = Math.round(N * (hi / N) ** e);
      const L = Math.round(2 * 128 ** e) - 1;
      work.width = work.height = R;
      workCtx.drawImage(crop, 0, 0, hi, hi, 0, 0, R, R);
      const px = workCtx.getImageData(0, 0, R, R);
      const d = px.data;

      const lum = new Float32Array(R * R);
      let lo = 255;
      let top = 0;
      for (let i = 0; i < R * R; i++) {
        const v = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
        lum[i] = v;
        lo = Math.min(lo, v);
        top = Math.max(top, v);
      }

      for (let y = 0; y < R; y++) {
        for (let x = 0; x < R; x++) {
          const i = y * R + x;
          // Stretched to the full range first, so the threshold grid spans
          // the photo's actual tones rather than 0–255 — easing back to the
          // photo's own tones as it develops, so the last frame meets it.
          const s = (lum[i] - lo) / (top - lo || 1);
          const t = s + (lum[i] / 255 - s) * e;
          const b = (BAYER[y % 4][x % 4] + 0.5) / 16;
          const q = Math.min(L, Math.max(0, Math.ceil(t * L - b)));
          d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = (q / L) * 255;
          d[i * 4 + 3] = 255;
        }
      }
      canvas.width = canvas.height = R;
      ctx.putImageData(px, 0, 0);
    };

    const tick = (now: number) => {
      const step = (now - last) / (target > p ? IN_MS : OUT_MS);
      last = now;
      p = target > p ? Math.min(target, p + step) : Math.max(target, p - step);
      draw(ease(p));
      raf = p === target ? 0 : requestAnimationFrame(tick);
    };

    hoverRef.current = (on) => {
      target = on ? 1 : 0;
      if (!crop) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        p = target;
        draw(p);
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      // In on the face, nudged up to keep the top of the hair — at avatar
      // size the background is just noise. Also clears the dark sliver down
      // the source's left edge.
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const side = Math.min(w, h) * 0.72;
      const sx = (w - side) / 2 + w * 0.02;
      const sy = (h - side) / 2 - h * 0.08;

      const hi = Math.max(N, Math.round(N * window.devicePixelRatio));
      crop = document.createElement("canvas");
      crop.width = crop.height = hi;
      crop.getContext("2d")?.drawImage(img, sx, sy, side, side, 0, 0, hi, hi);

      draw(0);
      canvas.style.opacity = "1";
      hoverRef.current(target === 1);
    };

    return () => {
      img.onload = null;
      cancelAnimationFrame(raf);
      hoverRef.current = () => {};
    };
  }, [src, dots]);

  return (
    <div
      role="img"
      aria-label={alt}
      onPointerEnter={() => hoverRef.current(true)}
      onPointerLeave={() => hoverRef.current(false)}
      className={`relative aspect-square cursor-pointer overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-700 [image-rendering:pixelated]"
      />
    </div>
  );
}
