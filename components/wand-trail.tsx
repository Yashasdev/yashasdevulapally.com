"use client";

import { useEffect, useRef } from "react";

type InkPoint = { x: number; y: number; time: number; color: string };

export function WandTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let points: InkPoint[] = [];
    let frame = 0;
    const lifetime = 460;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      points = [];
      context.clearRect(0, 0, innerWidth, innerHeight);
    };

    const resize = () => {
      clear();
      const scale = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * scale);
      canvas.height = Math.round(innerHeight * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = (time: number) => {
      frame = 0;
      points = points.filter((point) => time - point.time < lifetime);
      context.clearRect(0, 0, innerWidth, innerHeight);
      context.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const point = points[i];
        if (point.time - previous.time > 90) continue;
        const strength = Math.max(0, 1 - (time - point.time) / lifetime);
        context.strokeStyle = point.color;
        context.fillStyle = point.color;
        context.globalAlpha = strength * 0.2;
        context.lineWidth = 0.5 + strength * 0.5;
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(point.x, point.y);
        context.stroke();
        // Tiny four-point sparks drift gently away from the wand's path.
        if (i % 3 === 0) {
          const age = (time - point.time) / lifetime;
          const x = point.x + Math.sin(point.time) * (2 + age * 5);
          const y = point.y - age * 7;
          const radius = 1 + strength * 2;
          context.globalAlpha = strength * 0.65;
          context.beginPath();
          context.moveTo(x, y - radius);
          context.lineTo(x + radius * 0.28, y - radius * 0.28);
          context.lineTo(x + radius, y);
          context.lineTo(x + radius * 0.28, y + radius * 0.28);
          context.lineTo(x, y + radius);
          context.lineTo(x - radius * 0.28, y + radius * 0.28);
          context.lineTo(x - radius, y);
          context.lineTo(x - radius * 0.28, y - radius * 0.28);
          context.closePath();
          context.fill();
        }
      }
      context.globalAlpha = 1;
      if (points.length) frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("input, textarea, [contenteditable='true']")
      ) {
        clear();
        return;
      }
      points.push({
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
        color: getComputedStyle(document.documentElement)
          .getPropertyValue("--magic")
          .trim(),
      });
      if (points.length > 48) points.shift();
      if (!frame) frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", clear);
    document.documentElement.addEventListener("pointerleave", clear);
    enabled.addEventListener("change", clear);
    return () => {
      clear();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", clear);
      document.documentElement.removeEventListener("pointerleave", clear);
      enabled.removeEventListener("change", clear);
    };
  }, []);

  return <canvas ref={canvasRef} className="wand-trail" aria-hidden="true" />;
}
