import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  actions?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  actions,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        isCenter ? "items-center text-center" : "items-start md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", isCenter && "mx-auto")}>
        {eyebrow && (
          <p className={cn(
              "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
              isDark
                ? "bg-white/10 text-cyan-200 ring-1 ring-white/15"
                : "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
            )}>
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "font-display text-3xl font-extrabold leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem]",
            isDark ? "text-white" : "text-navy-900"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed md:text-lg",
              isDark ? "text-white/65" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
