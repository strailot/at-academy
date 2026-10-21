import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Seconds for a full loop. */
  speed?: number;
};

/**
 * Seamless horizontal marquee. The track is duplicated so the loop is
 * continuous, and the animation is neutralised for reduced-motion users.
 */
export default function Marquee({ children, className, speed = 38 }: MarqueeProps) {
  return (
    <div className={cn("group relative overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max items-center gap-10 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        style={{ ["--tw-animation-duration" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
