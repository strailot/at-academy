"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal animates. */
  delay?: number;
  as?: ElementType;
  /** How far the element travels up while revealing (px). */
  y?: number;
};

/**
 * Scroll-triggered reveal. Falls back to fully-visible markup when JavaScript
 * is unavailable or the visitor prefers reduced motion.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = "div", y = 26 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{
        transitionDelay: `${delay}ms`,
        "--reveal-y": `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}
