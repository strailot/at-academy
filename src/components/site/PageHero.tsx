import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Shared page header used by all public routes so navigation feels consistent. */
export default function PageHero({ eyebrow, title, description, children, align = "center", className }: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className={cn("relative overflow-hidden bg-navy-950 text-white", className)}>
      <div className="absolute inset-0 bg-ink-gradient opacity-95" />
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[-10rem] h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className={cn("container relative z-10 py-16 md:py-20", centered && "text-center")}>
        <div className={cn(centered && "mx-auto max-w-3xl")}>
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 ring-1 ring-white/10">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-white/60 md:text-lg">{description}</p>
          )}
        </div>
        {children && <div className={cn("mt-8", centered && "flex flex-wrap justify-center gap-3")}>{children}</div>}
      </div>
    </section>
  );
}
