import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  FlaskConical,
  ListChecks,
  Timer,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { sscChemistryChapters } from "@/lib/chemistry";

export const metadata: Metadata = {
  title: "SSC Chemistry Exams & Model Tests",
  description:
    "SSC Chemistry exams — chapter tests, board-pattern model tests and CQ/MCQ practice. Practise with the real mark distribution and review every answer.",
};

const examTypes = [
  {
    icon: ClipboardList,
    title: "Chapter tests",
    body: "One chapter at a time, so a weak topic cannot hide behind a good overall score.",
    meta: "30 minutes · MCQ + CQ",
  },
  {
    icon: FileCheck2,
    title: "Model tests",
    body: "Board-pattern papers with the real mark distribution and a full review after submission.",
    meta: "90 minutes · 100 marks",
  },
  {
    icon: ListChecks,
    title: "Board-style practice",
    body: "CQ (সৃজনশীল) and MCQ sets written in the format used in the SSC examination.",
    meta: "Mixed chapters",
  },
];

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Exams · পরীক্ষা"
        title="SSC Chemistry exams & model tests"
        description="Testing is how you find the gaps before the board exam does. Work through chapter tests, then board-pattern model tests, and review every mistake while it is still fresh."
      >
        <Link href="/practice">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            <FlaskConical className="h-4 w-4" /> Warm up with practice
          </Button>
        </Link>
        <Link href="/chemistry/mcq">
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
          >
            Free MCQ drill
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        {/* Exam types */}
        <section>
          <Reveal>
            <SectionHeading
              eyebrow="How to test yourself"
              title="Three levels of exam practice"
              description="Start with the chapter you are studying, move to full-paper model tests, then finish with board-style CQ practice."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {examTypes.map((type) => (
              <Reveal key={type.title}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                    <type.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{type.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{type.body}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-600">
                    <Timer className="h-3.5 w-3.5" /> {type.meta}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Chapter tests */}
        <section className="mt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Chapter tests"
              title="Test one chapter at a time"
              description="Every NCTB SSC Chemistry chapter has its own test. Finish the chapter, take the test, then review the explanations."
              align="left"
            />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sscChemistryChapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/exams/chapter-${chapter.number}/attempt`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-transparent bg-card px-5 py-4 transition hover:border-brand-500/20 hover:shadow-soft"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-500">
                    Chapter {chapter.number}
                  </p>
                  <p className="mt-1 truncate font-semibold text-navy-900">{chapter.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {chapter.mcqCount} MCQ · {chapter.cqCount} CQ
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-foreground/30 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            ))}
          </div>
        </section>

        {/* Model tests */}
        <section className="mt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Model tests"
              title="Full-paper practice"
              description="Board-pattern model papers that combine chapters the way the real SSC paper does."
              align="left"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              {
                href: "/exams/model-test-1/attempt",
                title: "SSC Chemistry Model Test 1",
                meta: "Full syllabus · 90 minutes · 100 marks",
                body: "A complete first paper covering all twelve chapters with MCQ and CQ sections.",
              },
              {
                href: "/exams/model-test-2/attempt",
                title: "SSC Chemistry Model Test 2",
                meta: "Full syllabus · 90 minutes · 100 marks",
                body: "A second full paper for timing practice closer to the examination.",
              },
            ].map((test) => (
              <Link
                key={test.href}
                href={test.href}
                className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:border-brand-500/30"
              >
                <h3 className="font-display text-lg font-bold text-navy-900">{test.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-500">
                  {test.meta}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{test.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                  Open model test <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Honest note */}
        <Reveal>
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/60 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="text-navy-900">A note on scores:</strong> attempt pages currently run a
              short sample question set while the full bank is reviewed. Scores you see there are practice
              scores only — published results and ranks are never shown before the administration confirms
              them.
            </p>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
