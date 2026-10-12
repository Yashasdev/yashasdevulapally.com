"use client";

import { useEffect, useRef, useState } from "react";

const EASTER_EGG = "yashas";

export function InteractionLayer() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      if (dotRef.current) dotRef.current.style.transform = transform;
      if (ringRef.current) ringRef.current.style.transform = transform;
    };

    const hover = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      ringRef.current?.classList.toggle(
        "is-active",
        Boolean(target.closest("a, button, [data-cursor='active']")),
      );
    };

    const type = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      typedRef.current = `${typedRef.current}${event.key.toLowerCase()}`.slice(
        -EASTER_EGG.length,
      );
      if (typedRef.current !== EASTER_EGG) return;

      document.documentElement.classList.toggle("blue-hour");
      setMessage(
        document.documentElement.classList.contains("blue-hour")
          ? "BLUE HOUR UNLOCKED"
          : "BACK TO DAYLIGHT",
      );
      window.setTimeout(() => setMessage(""), 2200);
      typedRef.current = "";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", hover, { passive: true });
    window.addEventListener("keydown", type);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", hover);
      window.removeEventListener("keydown", type);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div className={`easter-toast${message ? " is-visible" : ""}`} role="status">
        {message}
      </div>
    </>
  );
}
