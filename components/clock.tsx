"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/**
 * Local time in Atlanta, ticking. Rendered as dashes on the server and filled
 * in after mount, so the markup never disagrees with the client's clock.
 */
export function Clock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-fg" />
      {now ?? "--:--:--"} ET
    </span>
  );
}
