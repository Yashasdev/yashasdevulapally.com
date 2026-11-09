"use client";

import { useEffect, useRef } from "react";

type InkPoint = { x: number; y: number; time: number; color: string };

export function PencilTrail() {
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
    const lifetime = 360;

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
        context.globalAlpha = strength * 0.38;
        context.lineWidth = 0.7 + strength * 0.8;
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(point.x, point.y);
        context.stroke();
        // Small graphite flecks give the line a hand-drawn texture.
        if (i % 3 === 0) {
          context.globalAlpha = strength * 0.22;
          context.beginPath();
          context.arc(
            point.x + Math.sin(point.time) * 2,
            point.y + 2,
            0.7,
            0,
            Math.PI * 2,
          );
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
          .getPropertyValue("--blue")
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

  return <canvas ref={canvasRef} className="pencil-trail" aria-hidden="true" />;
}
