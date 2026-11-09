"use client";

import { useEffect, useRef, useState } from "react";

const EASTER_EGG = "yashas";

export function InteractionLayer() {
  const typedRef = useRef("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const type = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("input, textarea, [contenteditable='true']")
      )
        return;
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

    window.addEventListener("keydown", type);
    return () => {
      window.removeEventListener("keydown", type);
    };
  }, []);

  return (
    <>
      <div
        className={`easter-toast${message ? " is-visible" : ""}`}
        role="status"
      >
        {message}
      </div>
    </>
  );
}
