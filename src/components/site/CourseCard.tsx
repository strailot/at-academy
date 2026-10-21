import Link from "next/link";
import { Clock, PlayCircle, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentClasses, type Course } from "@/lib/site";

export function CourseThumb({ course, className }: { course: Course; className?: string }) {
  const symbol = course.subject === "Chemistry" ? "Ch" : course.subject.slice(0, 2);

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden",
        accentClasses(course.accent, "solid"),
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-dark opacity-[0.35]" />
      <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      {/* Periodic-table style tile */}
      <div className="absolute left-5 top-5 flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white shadow-inner-glow backdrop-blur-sm">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
          {course.level}
        </span>
        <span className="font-display text-2xl font-extrabold leading-none">{symbol}</span>
      </div>

      {course.tag && (
        <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-navy-950">
          {course.tag}
        </span>
      )}

      <div className="absolute bottom-4 right-5 flex items-center gap-1.5 text-white/90">
        <span className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
          {course.mode}
        </span>
      </div>
    </div>
  );
}

export default function CourseCard({ course, className }: { course: Course; className?: string }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated",
        className
      )}
    >
      <CourseThumb course={course} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
          <span className={cn("rounded-full px-2.5 py-1", accentClasses(course.accent, "soft"))}>
            {course.type}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{course.level} · {course.subject}</span>
          <span className="ml-auto flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-navy-800">{course.rating.toFixed(1)}</span>
            <span className="font-medium text-muted-foreground">({course.ratingCount})</span>
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-brand-600">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.summary}</p>

        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <PlayCircle className="h-4 w-4 text-brand-500" />
            {course.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-cyan-500" />
            {course.hours}h
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-navy-600" />
            {course.chaptersCount} chapters
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 font-display text-[11px] font-bold text-brand-700">
            {course.instructor
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span className="font-medium text-foreground/80">{course.instructor}</span>
        </div>

        <div className="mt-5 flex items-end justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold text-navy-900">
                BDT {course.price.toLocaleString("en-BD")}
              </span>
              {course.compareAt && (
                <span className="text-sm text-muted-foreground line-through">
                  BDT {course.compareAt.toLocaleString("en-BD")}
                </span>
              )}
            </div>
            {course.seatsLeft != null && (
              <p className="mt-1 text-[11px] font-semibold text-cyan-600">
                {course.seatsLeft} seats left · {course.startsOn}
              </p>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 transition-transform group-hover:translate-x-1">
            Details
          </span>
        </div>
      </div>
    </Link>
  );
}
