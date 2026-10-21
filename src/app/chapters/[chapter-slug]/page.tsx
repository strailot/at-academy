import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  ListChecks,
  PlayCircle,
  Sigma,
  Sparkles,
  Target,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Reveal from "@/components/site/Reveal";
import ChapterProgress from "@/components/site/ChapterProgress";
import { Button } from "@/components/ui/button";
import { equationLibrary, formulaLibrary, getChapter, sscChemistryChapters } from "@/lib/chemistry";
import { getCourse } from "@/lib/site";

type Props = { params: { "chapter-slug": string } };

export function generateStaticParams() {
  return sscChemistryChapters.map((chapter) => ({ "chapter-slug": chapter.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const chapter = getChapter(params["chapter-slug"]);
  if (!chapter) return { title: "Chapter not found" };
  return {
    title: `SSC Chemistry Chapter ${chapter.number} — ${chapter.title}`,
    description: `${chapter.summary} Topics, lessons, formulas, practice questions and revision for SSC Chemistry Chapter ${chapter.number} (${chapter.titleBn}).`,
    keywords: [
      `SSC Chemistry Chapter ${chapter.number}`,
      `${chapter.title} SSC Chemistry`,
      "SSC Chemistry NCTB",
      "SSC Chemistry Bangladesh",
    ],
  };
}

export default function ChapterDetailPage({ params }: Props) {
  const chapter = getChapter(params["chapter-slug"]);
  if (!chapter) notFound();

  const course = getCourse("ssc-chemistry");
  const chapterIndex = chapter.number - 1;

  const chapterEquations = equationLibrary.filter((e) => e.chapter === chapter.title).slice(0, 4);
  const chapterFormulas = [
    ...chapter.keyFormulas.map((f) => ({ label: f.label, formula: f.formula, note: "" })),
    ...formulaLibrary.filter((f) => f.chapter === chapter.title).map((f) => ({ label: f.label, formula: f.formula, note: f.note })),
  ].slice(0, 6);

  const previous = sscChemistryChapters[chapterIndex - 1];
  const next = sscChemistryChapters[chapterIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Chapter hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 bg-ink-gradient opacity-95" />
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-600/25 blur-[120px]" />

        <div className="container relative z-10 py-14 md:py-16">
          <Link
            href="/chapters"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All chapters
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 font-display text-lg font-extrabold text-white shadow-glow">
              {String(chapter.number).padStart(2, "0")}
            </span>
            <span className="rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200 ring-1 ring-white/10">
              SSC Chemistry · Chapter {chapter.number}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {chapter.title}
          </h1>
          <p className="mt-2 text-lg font-semibold text-white/60">{chapter.titleBn}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">{chapter.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <PlayCircle className="h-4 w-4 text-brand-300" /> {chapter.lessons} lessons · {chapter.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sigma className="h-4 w-4 text-cyan-300" /> {chapter.mcqCount} MCQs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ListChecks className="h-4 w-4 text-cyan-300" /> {chapter.cqCount} CQ items
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FlaskConical className="h-4 w-4 text-brand-300" /> {chapter.numericalCount} numericals
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={course ? `/learn/${course.slug}` : "/courses/ssc-chemistry"}>
              <Button size="lg" className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-7 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                <PlayCircle className="h-4 w-4" /> Start lessons
              </Button>
            </Link>
            <Link href="/chemistry/mcq">
              <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 px-7 font-semibold text-white hover:bg-white/10">
                <Sigma className="h-4 w-4" /> Practise MCQs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container pb-24 pt-12 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* Main column */}
          <div className="space-y-12">
            {/* Learning objectives */}
            <Reveal>
              <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <Target className="h-5 w-5 text-brand-500" /> Learning objectives
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {chapter.objectives.map((objective) => (
                    <li key={objective} className="flex items-start gap-2 text-sm text-foreground/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Topics / lessons */}
            <Reveal>
              <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <BookOpen className="h-5 w-5 text-brand-500" /> Topics &amp; lessons
                </h2>
                <ol className="mt-4 divide-y divide-border">
                  {chapter.topics.map((topic, i) => (
                    <li key={topic} className="flex items-center justify-between gap-4 py-3.5">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 font-display text-xs font-extrabold text-brand-700">
                          {i + 1}
                        </span>
                        <span className="min-w-0 truncate text-sm font-medium text-navy-900">{topic}</span>
                      </span>
                      <Link
                        href={course ? `/learn/${course.slug}` : "/courses/ssc-chemistry"}
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                      >
                        <PlayCircle className="h-3.5 w-3.5" /> Lesson
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            {/* Formulas */}
            {chapterFormulas.length > 0 && (
              <Reveal>
                <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                    <Sparkles className="h-5 w-5 text-cyan-500" /> Key formulas
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {chapterFormulas.map((formula) => (
                      <div key={formula.label} className="rounded-2xl border border-border bg-background/60 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {formula.label}
                        </p>
                        <p className="mt-1.5 font-mono text-sm font-bold text-navy-900">{formula.formula}</p>
                        {formula.note && (
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{formula.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/chemistry/formulas"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                  >
                    Full formula library <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>
              </Reveal>
            )}

            {/* Equations */}
            {chapterEquations.length > 0 && (
              <Reveal>
                <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                    <FlaskConical className="h-5 w-5 text-brand-500" /> Reactions in this chapter
                  </h2>
                  <div className="mt-4 space-y-3">
                    {chapterEquations.map((entry) => (
                      <div key={entry.reaction} className="rounded-2xl border border-border bg-background/60 p-4">
                        <p className="font-mono text-sm font-bold text-navy-900">{entry.reaction}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700 ring-1 ring-brand-100">
                            {entry.type}
                          </span>
                          <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{entry.condition}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{entry.explanation}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/chemistry/equations"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                  >
                    Full equation library <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>
              </Reveal>
            )}

            {/* Common mistakes */}
            <Reveal>
              <section className="rounded-3xl border border-amber-200 bg-amber-50/50 p-7">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> Common mistakes to avoid
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {chapter.commonMistakes.map((mistake) => (
                    <li key={mistake} className="flex items-start gap-2 text-sm text-foreground/80">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {mistake}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Prev / next */}
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {previous ? (
                  <Link
                    href={`/chapters/${previous.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-brand-200"
                  >
                    <ArrowLeft className="h-5 w-5 shrink-0 text-brand-500 transition-transform group-hover:-translate-x-1" />
                    <span>
                      <span className="block text-xs text-muted-foreground">Previous chapter</span>
                      <span className="block text-sm font-bold text-navy-900">
                        {previous.number}. {previous.title}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/chapters/${next.slug}`}
                    className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-card p-5 text-right shadow-soft transition-colors hover:border-brand-200"
                  >
                    <span>
                      <span className="block text-xs text-muted-foreground">Next chapter</span>
                      <span className="block text-sm font-bold text-navy-900">
                        {next.number}. {next.title}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-brand-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>

          {/* Side column */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ChapterProgress courseSlug="ssc-chemistry" chapterIndex={chapterIndex} lessons={chapter.lessons} />

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-base font-extrabold text-navy-900">Practice this chapter</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { href: "/chemistry/mcq", label: `${chapter.mcqCount} MCQ questions`, body: "Instant feedback with explanations" },
                  { href: "/chemistry/numericals", label: `${chapter.numericalCount} numerical problems`, body: "Step-by-step worked solutions" },
                  { href: "/chemistry/balancing", label: "Equation balancing drills", body: "Practice balancing reactions" },
                  { href: "/exams", label: "Chapter quiz & model test", body: "Board-style timed practice" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3 transition-colors hover:border-brand-200"
                    >
                      <span>
                        <span className="block text-sm font-bold text-navy-900">{item.label}</span>
                        <span className="block text-xs text-muted-foreground">{item.body}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-6">
              <h3 className="font-display text-base font-extrabold text-navy-900">Revision resources</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Condensed notes, formula sheets and revision drills for this chapter are published to your
                dashboard as the batch reaches the end of the chapter.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/dashboard">
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-xs font-semibold text-white">
                    My Chemistry dashboard
                  </Button>
                </Link>
                <Link href="/courses/ssc-chemistry">
                  <Button size="sm" variant="outline" className="rounded-full border-brand-200 text-xs font-semibold text-brand-700 hover:bg-white">
                    Course details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
