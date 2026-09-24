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

/**
 * The photo, reduced to pure black and white, so the only image on the page is
 * made of the same two colours as everything else. Hovering shows the real
 * photo in greyscale. Both are drawn from the same crop onto canvases, so they
 * line up exactly.
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
  const ditherRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const N = dots;
    const dither = ditherRef.current;
    const photo = photoRef.current;
    const ctx = dither?.getContext("2d", { willReadFrequently: true });
    const photoCtx = photo?.getContext("2d");
    if (!dither || !photo || !ctx || !photoCtx) return;

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

      // The hover photo renders at device resolution; the dither is one
      // canvas pixel per dot, scaled up crisp.
      const hi = Math.round(N * window.devicePixelRatio);
      photo.width = photo.height = hi;
      photoCtx.filter = "grayscale(1)";
      photoCtx.drawImage(img, sx, sy, side, side, 0, 0, hi, hi);

      dither.width = dither.height = N;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, N, N);
      const px = ctx.getImageData(0, 0, N, N);
      const d = px.data;

      const lum = new Float32Array(N * N);
      let lo = 255;
      let top = 0;
      for (let i = 0; i < N * N; i++) {
        const v = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
        lum[i] = v;
        lo = Math.min(lo, v);
        top = Math.max(top, v);
      }

      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          const i = y * N + x;
          // Stretched to the full range first, so the threshold grid spans
          // the photo's actual tones rather than 0–255.
          const t = (lum[i] - lo) / (top - lo || 1);
          const v = t * 16 > BAYER[y % 4][x % 4] + 0.5 ? 255 : 0;
          d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v;
          d[i * 4 + 3] = 255;
        }
      }
      ctx.putImageData(px, 0, 0);
      dither.style.opacity = "1";
    };
  }, [src, dots]);

  return (
    <div
      role="img"
      aria-label={alt}
      className={`group relative aspect-square overflow-hidden ${className}`}
    >
      <canvas
        ref={ditherRef}
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-700 [image-rendering:pixelated]"
      />
      <canvas
        ref={photoRef}
        className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}
