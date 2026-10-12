"use client";

import { useRef, useState } from "react";

type Point = { x: number; y: number };

export function HeroOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragOrigin = useRef<Point>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const moveStage = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    stageRef.current?.style.setProperty("--pointer-x", x.toFixed(3));
    stageRef.current?.style.setProperty("--pointer-y", y.toFixed(3));
  };

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragOrigin.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    setDragging(true);
  };

  const drag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const maxX = Math.max(30, rect.width * 0.25);
    const maxY = Math.max(30, rect.height * 0.25);
    setPosition({
      x: Math.max(-maxX, Math.min(maxX, event.clientX - dragOrigin.current.x)),
      y: Math.max(-maxY, Math.min(maxY, event.clientY - dragOrigin.current.y)),
    });
  };

  return (
    <div
      ref={stageRef}
      className="orbit-stage"
      onPointerMove={moveStage}
      onPointerLeave={() => {
        stageRef.current?.style.setProperty("--pointer-x", "0");
        stageRef.current?.style.setProperty("--pointer-y", "0");
      }}
    >
      <div className="orbit-grid" aria-hidden="true" />
      <div className="orbit-ring orbit-ring-one" aria-hidden="true" />
      <div className="orbit-ring orbit-ring-two" aria-hidden="true" />
      <span className="orbit-note orbit-note-top">OBJECT_01 / MOVE ME</span>
      <span className="orbit-note orbit-note-side">X CURIOSITY / Y MOMENTUM</span>
      <span className="orbit-float orbit-float-a">IDEAS</span>
      <span className="orbit-float orbit-float-b">MOTION</span>
      <button
        type="button"
        className={`orbit-core${dragging ? " is-dragging" : ""}`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onDoubleClick={() => setPosition({ x: 0, y: 0 })}
        aria-label="Drag the YD object around the orbit. Double click to reset it."
      >
        <span>YD</span>
        <small>DRAG</small>
      </button>
    </div>
  );
}
