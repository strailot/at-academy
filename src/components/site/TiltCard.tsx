"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
  /** Perspective applied to the container (px). */
  perspective?: number;
};

/**
 * Subtle pointer-driven 3D tilt. Disabled on touch devices and for visitors
 * who prefer reduced motion, so content stays fully usable everywhere.
 */
export default function TiltCard({
  children,
  className,
  max = 6,
  perspective = 1000,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.transform = `perspective(${perspective}px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(6px)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("tilt-3d transition-transform duration-300 ease-out", className)}
      style={{ perspective }}
    >
      {children}
    </div>
  );
}
