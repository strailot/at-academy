"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  /** ISO-8601 timestamp. Prefer including the +06:00 offset for Dhaka. */
  target: string;
  className?: string;
};

function split(ms: number) {
  const clamped = Math.max(ms, 0);
  const total = Math.floor(clamped / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Live countdown rendered against the visitor's clock. */
export default function Countdown({ target, className }: CountdownProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return <div className={className} aria-hidden="true" />;
  }

  const diff = new Date(target).getTime() - now;

  if (diff <= 0) {
    return (
      <p className={className}>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Starting now
        </span>
      </p>
    );
  }

  const { days, hours, minutes, seconds } = split(diff);
  const cells: { label: string; value: number }[] = [
    { label: "days", value: days },
    { label: "hrs", value: hours },
    { label: "min", value: minutes },
    { label: "sec", value: seconds },
  ];

  return (
    <div className={className} role="timer" aria-live="polite" suppressHydrationWarning>
      {cells.map((cell, i) => (
        <span key={cell.label} className="flex items-center gap-1.5">
          <span className="grid min-w-[3rem] place-items-center rounded-lg bg-navy-900/90 px-2 py-1.5 font-display text-lg font-bold text-white tabular-nums ring-1 ring-white/10">
            {String(cell.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {cell.label}
          </span>
          {i < cells.length - 1 && <span className="mr-1 text-muted-foreground/40">:</span>}
        </span>
      ))}
    </div>
  );
}
