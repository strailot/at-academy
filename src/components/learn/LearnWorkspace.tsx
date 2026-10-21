"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  FileText,
  GraduationCap,
  LayoutList,
  Lock,
  MessageCircleQuestion,
  Play,
  Radio,
  StickyNote,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ types */

type Chapter = { title: string; lessons: number; duration: string };

export type LearnCourse = {
  slug: string;
  title: string;
  level: string;
  chapters: Chapter[];
};

type Access = "full" | "preview";

type Note = { id: string; text: string; createdAt: number };

type Progress = {
  completed: string[];
  current: string | null;
  notes: Record<string, Note[]>;
  bookmarks: string[];
  speed: number;
};

type Lesson = {
  id: string;
  chapterIndex: number;
  number: number;
  chapterTitle: string;
};

/* ---------------------------------------------------------------- helpers */

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

const storageKey = (slug: string) => `at-academy:learn:${slug}`;

const emptyProgress = (): Progress => ({
  completed: [],
  current: null,
  notes: {},
  bookmarks: [],
  speed: 1,
});

function parseDuration(duration: string): number {
  const hours = Number(/(\d+)h/.exec(duration)?.[1] ?? 0);
  const minutes = Number(/(\d+)m/.exec(duration)?.[1] ?? 0);
  return hours * 60 + minutes;
}

function averageLessonDuration(duration: string, lessons: number): string {
  if (!lessons) return "";
  const total = parseDuration(duration);
  if (!total) return "";
  const avg = Math.max(5, Math.round(total / lessons));
  const h = Math.floor(avg / 60);
  const m = avg % 60;
  return h ? `~${h}h ${m ? `${m}m` : ""}` : `~${m}m`;
}

/* --------------------------------------------------------------- component */

type Props = {
  course: LearnCourse;
  access: Access;
  userName: string;
  /** The single free-to-watch demo lesson (chapter 1, lesson 1). */
  previewLessonId: string;
  /** Enrolment request id when a payment is still awaiting verification. */
  pendingOrderId?: string | null;
};

export default function LearnWorkspace({
  course,
  access,
  userName,
  previewLessonId,
  pendingOrderId,
}: Props) {
  const lessons = useMemo<Lesson[]>(
    () =>
      course.chapters.flatMap((chapter, chapterIndex) =>
        Array.from({ length: chapter.lessons }, (_, index) => ({
          id: `c${chapterIndex}l${index + 1}`,
          chapterIndex,
          number: index + 1,
          chapterTitle: chapter.title,
        }))
      ),
    [course.chapters]
  );

  const totalLessons = lessons.length;

  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [tab, setTab] = useState<"notes" | "about">("notes");
  const [navOpen, setNavOpen] = useState(false);
  const [openChapters, setOpenChapters] = useState<number[]>([]);
  const [noteDraft, setNoteDraft] = useState("");
  const noteRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved progress (resume, notes, bookmarks, speed) on the client only.
  useEffect(() => {
    let stored: Progress = emptyProgress();
    try {
      const raw = window.localStorage.getItem(storageKey(course.slug));
      if (raw) stored = { ...emptyProgress(), ...(JSON.parse(raw) as Progress) };
    } catch {
      stored = emptyProgress();
    }
    setProgress(stored);
    const resume =
      stored.current && lessons.some((lesson) => lesson.id === stored.current)
        ? stored.current
        : previewLessonId;
    setActiveId(resume);
    const resumeLesson = lessons.find((lesson) => lesson.id === resume);
    setOpenChapters(resumeLesson ? [resumeLesson.chapterIndex] : [0]);
    setHydrated(true);
  }, [course.slug, lessons, previewLessonId]);

  const save = (next: Progress) => {
    setProgress(next);
    try {
      window.localStorage.setItem(storageKey(course.slug), JSON.stringify(next));
    } catch {
      // Storage may be unavailable (private mode) — state still works in-session.
    }
  };

  const activeIndex = lessons.findIndex((lesson) => lesson.id === activeId);
  const active = activeIndex >= 0 ? lessons[activeIndex] : null;
  const activeChapter = active ? course.chapters[active.chapterIndex] : null;

  const canOpen = (lessonId: string) => access === "full" || lessonId === previewLessonId;
  const isLocked = (lessonId: string) => !canOpen(lessonId);
  const isDone = (lessonId: string) => progress.completed.includes(lessonId);
  const isBookmarked = (lessonId: string) => progress.bookmarks.includes(lessonId);

  const completedCount = progress.completed.filter((id) =>
    lessons.some((lesson) => lesson.id === id)
  ).length;
  const percent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  const chapterCompleted = (chapterIndex: number) =>
    progress.completed.filter((id) => id.startsWith(`c${chapterIndex}l`)).length;

  const openLesson = (lessonId: string) => {
    const lesson = lessons.find((item) => item.id === lessonId);
    setActiveId(lessonId);
    setNavOpen(false);
    if (lesson) {
      setOpenChapters((previous) =>
        previous.includes(lesson.chapterIndex)
          ? previous
          : [...previous, lesson.chapterIndex]
      );
    }
    save({ ...progress, current: lessonId });
  };

  const toggleChapter = (chapterIndex: number) => {
    setOpenChapters((previous) =>
      previous.includes(chapterIndex)
        ? previous.filter((index) => index !== chapterIndex)
        : [...previous, chapterIndex]
    );
  };

  const step = (delta: number) => {
    const next = lessons[activeIndex + delta];
    if (next) openLesson(next.id);
  };

  const toggleComplete = () => {
    if (!active) return;
    const completed = isDone(active.id)
      ? progress.completed.filter((id) => id !== active.id)
      : [...progress.completed, active.id];
    save({ ...progress, completed, current: active.id });
  };

  const toggleBookmark = () => {
    if (!active) return;
    const bookmarks = isBookmarked(active.id)
      ? progress.bookmarks.filter((id) => id !== active.id)
      : [...progress.bookmarks, active.id];
    save({ ...progress, bookmarks, current: active.id });
  };

  const addNote = () => {
    if (!active) return;
    const text = noteDraft.trim();
    if (text.length === 0) return;
    const note: Note = {
      id: `n_${Date.now()}`,
      text,
      createdAt: Date.now(),
    };
    const existing = progress.notes[active.id] ?? [];
    save({ ...progress, notes: { ...progress.notes, [active.id]: [note, ...existing] } });
    setNoteDraft("");
  };

  const removeNote = (noteId: string) => {
    if (!active) return;
    const existing = progress.notes[active.id] ?? [];
    save({
      ...progress,
      notes: { ...progress.notes, [active.id]: existing.filter((note) => note.id !== noteId) },
    });
  };

  const activeNotes = (active && progress.notes[active.id]) || [];

  if (!hydrated) {
    return (
      <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
        <div className="h-96 animate-pulse rounded-3xl bg-muted" />
        <div className="h-96 animate-pulse rounded-3xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:items-start">
      {/* ---------------------------------------------------- sidebar / nav */}
      <aside className={cn("lg:sticky lg:top-24 lg:h-fit", navOpen ? "block" : "hidden lg:block")}>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="border-b border-border bg-navy-950 p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                  Course content
                </p>
                <p className="mt-1.5 text-sm text-white/60">
                  {completedCount} of {totalLessons} lessons complete
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-white/60 ring-1 ring-white/15 lg:hidden"
                aria-label="Close course content"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-cyan-400 transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-white/50">{percent}% complete</p>
          </div>

          <nav className="max-h-[55vh] overflow-y-auto p-3" aria-label="Course lessons">
            <ol className="space-y-2">
              {course.chapters.map((chapter, chapterIndex) => {
                const isOpen = openChapters.includes(chapterIndex);
                const done = chapterCompleted(chapterIndex);
                return (
                  <li key={chapter.title} className="rounded-2xl border border-border/70">
                    <button
                      type="button"
                      onClick={() => toggleChapter(chapterIndex)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-2 p-3 text-left transition-colors hover:bg-muted/60"
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-50 text-[11px] font-extrabold text-brand-700">
                        {chapterIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold leading-snug text-navy-900">
                          {chapter.title}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">
                          {done}/{chapter.lessons} lessons · {chapter.duration}
                        </span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <ul className={cn("border-t border-border/70 p-1.5", !isOpen && "hidden")}>
                      {Array.from({ length: chapter.lessons }, (_, index) => {
                        const lesson = lessons.find(
                          (item) => item.id === `c${chapterIndex}l${index + 1}`
                        );
                        if (!lesson) return null;
                        const locked = isLocked(lesson.id);
                        const current = active?.id === lesson.id;
                        const done = isDone(lesson.id);
                        return (
                          <li key={lesson.id}>
                            <button
                              type="button"
                              onClick={() => openLesson(lesson.id)}
                              aria-current={current ? "true" : undefined}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[13px] transition-colors",
                                current
                                  ? "bg-brand-50 font-bold text-brand-700 ring-1 ring-brand-200"
                                  : "text-foreground/75 hover:bg-muted"
                              )}
                            >
                              {locked ? (
                                <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                              ) : done ? (
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                              ) : (
                                <Circle
                                  className={cn(
                                    "h-3.5 w-3.5 shrink-0",
                                    current ? "text-brand-500" : "text-muted-foreground/50"
                                  )}
                                />
                              )}
                              <span className="truncate">
                                Lesson {index + 1}
                                {isBookmarked(lesson.id) && (
                                  <Bookmark className="ml-1.5 inline h-3 w-3 text-amber-500" />
                                )}
                              </span>
                              {lesson.id === previewLessonId && access !== "full" && (
                                <span className="ml-auto shrink-0 rounded-full bg-cyan-500/15 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-cyan-700 ring-1 ring-cyan-200">
                                  Free
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </nav>

          {access !== "full" && (
            <div className="border-t border-border bg-brand-50/60 p-4">
              {pendingOrderId ? (
                <>
                  <p className="text-sm font-bold text-navy-900">Enrolment pending verification</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Request <span className="font-mono font-semibold">{pendingOrderId}</span> is
                    awaiting payment verification. The demo lesson stays open until it clears.
                  </p>
                  <Link href="/contact" className="mt-3 block">
                    <Button
                      variant="outline"
                      className="h-10 w-full rounded-full border-brand-200 text-xs font-bold text-brand-700 hover:bg-white"
                    >
                      Ask about payment
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-navy-900">Enrol to unlock every lesson</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    You are watching the free demo lesson. Enrolment opens all {totalLessons} lessons
                    plus live classes and model tests.
                  </p>
                  <Link href={`/checkout/${course.slug}`} className="mt-3 block">
                    <Button className="h-10 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-sm font-bold text-white">
                      Enrol now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* -------------------------------------------------------------- main */}
      <section className="min-w-0">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setNavOpen((value) => !value)}
              className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50 lg:hidden"
            >
              <LayoutList className="h-4 w-4" /> Content
            </Button>
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              <ArrowLeft className="h-4 w-4" /> Course page
            </Link>
          </div>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em]",
              access === "full"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200"
            )}
          >
            {access === "full" ? (
              <>
                <GraduationCap className="h-3.5 w-3.5" /> Full access
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Preview mode
              </>
            )}
          </span>
        </div>

        {/* Lesson header */}
        <header className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
            Chapter {(active?.chapterIndex ?? 0) + 1} · {activeChapter?.title ?? course.title}
          </p>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
            Lesson {active?.number ?? 1}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {course.title} · {course.level}
            {activeChapter && (
              <>
                {" · "}
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {averageLessonDuration(activeChapter.duration, activeChapter.lessons)} avg per lesson
                </span>
              </>
            )}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Button
              type="button"
              onClick={toggleComplete}
              disabled={!!active && isLocked(active.id)}
              className={cn(
                "h-10 rounded-full text-sm font-bold disabled:pointer-events-none disabled:opacity-50",
                active && isDone(active.id)
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-gradient-to-r from-brand-500 to-brand-700 text-white"
              )}
            >
              {active && isDone(active.id) ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Completed
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Mark complete
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={toggleBookmark}
              disabled={!!active && isLocked(active.id)}
              className="h-10 rounded-full border-brand-200 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-50"
            >
              {active && isBookmarked(active.id) ? (
                <>
                  <BookmarkCheck className="h-4 w-4" /> Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" /> Bookmark
                </>
              )}
            </Button>

            <label className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              Speed
              <select
                value={progress.speed}
                onChange={(event) => save({ ...progress, speed: Number(event.target.value) })}
                className="h-9 rounded-full border border-border bg-background px-3 text-xs font-bold text-navy-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Playback speed"
              >
                {SPEEDS.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}×
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        {/* Player / locked panel */}
        <div className="mt-5">
          {active && isLocked(active.id) ? (
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="bg-navy-950 p-8 text-center md:p-12">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <Lock className="h-6 w-6 text-cyan-300" />
                </span>
                <h2 className="mt-5 font-display text-xl font-extrabold text-white md:text-2xl">
                  {pendingOrderId
                    ? "Enrolment received — verification in progress"
                    : "This lesson is part of the enrolled course"}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
                  {pendingOrderId ? (
                    <>
                      Request <span className="font-mono font-semibold text-white/80">{pendingOrderId}</span>{" "}
                      is awaiting payment verification. Keep watching the free demo lesson — every
                      other lesson unlocks the moment your payment is approved.
                    </>
                  ) : (
                    <>
                      You are viewing the free demo lesson. Enrol in {course.title} to open all{" "}
                      {totalLessons} lessons, live sessions, notes, quizzes and model tests.
                    </>
                  )}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {pendingOrderId ? (
                    <Link href="/contact">
                      <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-bold text-white shadow-glow-brand">
                        Ask about payment status
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/checkout/${course.slug}`}>
                      <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-bold text-white shadow-glow-brand">
                        Enrol in this course
                      </Button>
                    </Link>
                  )}
                  <Link href={`/courses/${course.slug}`}>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/25 bg-white/5 font-bold text-white hover:bg-white/10"
                    >
                      Course details
                    </Button>
                  </Link>
                </div>
              </div>
              <ul className="grid gap-3 p-6 text-sm sm:grid-cols-2">
                {[
                  "All chapters with resume-from-where-you-left-off",
                  "Notes and bookmarks attached to every lesson",
                  "Chapter-wise practice and full model tests",
                  "Live classes in Bangladesh Standard Time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-foreground/75">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
              <div className="bg-grid-dark relative flex aspect-video flex-col items-center justify-center bg-navy-950 px-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Play className="h-7 w-7 text-cyan-300" />
                </span>
                <p className="mt-5 font-display text-lg font-bold text-white">
                  Lesson {active?.number} video
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                  Video streams here through the academy&apos;s video provider. The player shell,
                  speed preference and resume point are wired up — playback activates as soon as the
                  provider account is connected (see the course page for integration status).
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-300 ring-1 ring-amber-300/30">
                  Provider integration pending
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Circle className="h-3 w-3 text-muted-foreground/50" />
                  {isDone(active?.id ?? "")
                    ? "Marked complete — progress saved on this device"
                    : "Progress, notes and bookmarks are saved as you study"}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => step(-1)}
                    disabled={activeIndex <= 0}
                    className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => step(1)}
                    disabled={activeIndex >= lessons.length - 1}
                    className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white disabled:pointer-events-none disabled:opacity-40"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs: notes / about */}
        <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="flex border-b border-border" role="tablist" aria-label="Lesson tools">
            {(
              [
                { id: "notes", label: "Notes", icon: StickyNote },
                { id: "about", label: "Chapter info", icon: BookOpen },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-bold transition-colors",
                  tab === item.id
                    ? "border-brand-500 text-brand-700"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.id === "notes" && activeNotes.length > 0 && (
                  <span className="rounded-full bg-brand-100 px-1.5 text-[10px] font-extrabold text-brand-700">
                    {activeNotes.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {tab === "notes" ? (
            <div className="p-6">
              <label htmlFor="lesson-note" className="mb-2 block text-sm font-bold text-navy-900">
                Note for Lesson {active?.number}
              </label>
              <textarea
                id="lesson-note"
                ref={noteRef}
                rows={4}
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Write the definition, the step that clicked, or the question to ask in doubt-solving…"
                className="w-full resize-y rounded-2xl border border-input bg-background px-4 py-3 text-sm leading-relaxed outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Notes are stored on this device with your progress.
                </p>
                <Button
                  type="button"
                  onClick={addNote}
                  disabled={noteDraft.trim().length === 0}
                  className="h-9 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-xs font-bold text-white disabled:pointer-events-none disabled:opacity-50"
                >
                  <FileText className="h-3.5 w-3.5" /> Add note
                </Button>
              </div>

              {activeNotes.length === 0 ? (
                <p className="mt-6 rounded-2xl border border-dashed border-border bg-muted/40 p-5 text-center text-sm text-muted-foreground">
                  No notes on this lesson yet.
                </p>
              ) : (
                <ul className="mt-5 space-y-3">
                  {activeNotes.map((note) => (
                    <li
                      key={note.id}
                      className="group flex items-start gap-3 rounded-2xl border border-border bg-background p-4"
                    >
                      <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <div className="min-w-0 flex-1">
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/85">
                          {note.text}
                        </p>
                        <p className="mt-1.5 text-[11px] text-muted-foreground">
                          {new Date(note.createdAt).toLocaleString("en-GB", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNote(note.id)}
                        aria-label="Delete note"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted-foreground opacity-60 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-base font-extrabold text-navy-900">
                  Chapter {(active?.chapterIndex ?? 0) + 1} · {activeChapter?.title}
                </h3>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">Lessons in chapter</dt>
                    <dd className="font-semibold text-navy-900">{activeChapter?.lessons}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">Total chapter runtime</dt>
                    <dd className="font-semibold text-navy-900">{activeChapter?.duration}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="text-muted-foreground">Completed here</dt>
                    <dd className="font-semibold text-navy-900">
                      {active ? chapterCompleted(active.chapterIndex) : 0}/{activeChapter?.lessons}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Your course progress</dt>
                    <dd className="font-semibold text-navy-900">{percent}%</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3">
                <Link
                  href="/exams"
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 transition hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>
                    <span className="block text-sm font-bold text-navy-900">Practice & model tests</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      Chapter-wise MCQ/CQ practice and full syllabus exams with results.
                    </span>
                  </span>
                </Link>
                <Link
                  href="/doubts"
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 transition hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>
                    <span className="block text-sm font-bold text-navy-900">Stuck on this chapter?</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      Send the doubt with the chapter attached — a teacher replies in your dashboard.
                    </span>
                  </span>
                </Link>
                <Link
                  href="/live-classes"
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 transition hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <Radio className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span>
                    <span className="block text-sm font-bold text-navy-900">Live classes</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      This course runs alongside scheduled live sessions in Bangladesh time.
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Signed in as <span className="font-semibold text-navy-900">{userName}</span> · progress,
          notes and bookmarks are saved on this device for {course.title}.
        </p>
      </section>
    </div>
  );
}
