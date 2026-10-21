"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, PlayCircle } from "lucide-react";

type StoredProgress = { completed?: string[]; bookmarks?: string[] };

/**
 * Reads the real lesson-completion state saved by the learning player
 * (see src/components/learn/LearnWorkspace.tsx) and renders the student's
 * progress for one SSC Chemistry chapter.
 */
export default function ChapterProgress({
  courseSlug,
  chapterIndex,
  lessons,
}: {
  courseSlug: string;
  /** Zero-based index of the chapter inside the course. */
  chapterIndex: number;
  /** Number of lessons in this chapter. */
  lessons: number;
}) {
  const [completed, setCompleted] = useState(0);
  const [bookmarked, setBookmarked] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`at-academy:learn:${courseSlug}`);
      const stored: StoredProgress = raw ? JSON.parse(raw) : {};
      const prefix = `c${chapterIndex}l`;
      setCompleted((stored.completed ?? []).filter((id) => id.startsWith(prefix)).length);
      setBookmarked((stored.bookmarks ?? []).filter((id) => id.startsWith(prefix)).length);
    } catch {
      // Storage unavailable — treat as no progress.
    }
    setHydrated(true);
  }, [courseSlug, chapterIndex]);

  const pct = lessons ? Math.round((completed / lessons) * 100) : 0;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-900">
          <PlayCircle className="h-5 w-5 text-brand-500" /> Chapter Progress
        </h3>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
          {hydrated ? `${pct}%` : "—"}
        </span>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 transition-all duration-700"
          style={{ width: `${hydrated ? pct : 0}%` }}
        />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-border bg-background/60 p-3.5">
          <dt className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Lessons completed
          </dt>
          <dd className="mt-1 font-display text-lg font-extrabold text-navy-900">
            {hydrated ? completed : 0} / {lessons}
          </dd>
        </div>
        <div className="rounded-2xl border border-border bg-background/60 p-3.5">
          <dt className="text-xs text-muted-foreground">Bookmarks in chapter</dt>
          <dd className="mt-1 font-display text-lg font-extrabold text-navy-900">
            {hydrated ? bookmarked : 0}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Progress updates automatically as you watch lessons in the learning player. Sign in and enrol to
        start this chapter.
      </p>
    </div>
  );
}
