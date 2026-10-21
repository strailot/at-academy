import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  CheckCircle2,
  FileCheck2,
  FlaskConical,
  ListChecks,
  RefreshCw,
  Sigma,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { sscChemistryChapters } from "@/lib/chemistry";

export const metadata: Metadata = {
  title: "SSC Chemistry Practice",
  description:
    "SSC Chemistry practice centre — MCQ practice, chapter tests, CQ (সৃজনশীল) practice, numerical problems, equation balancing and full model tests.",
};

const categories = [
  {
    icon: Sigma,
    title: "MCQ Practice",
    body: "Chapter-wise multiple-choice drills with instant feedback and explanations.",
    href: "/chemistry/mcq",
    cta: "Start MCQs",
  },
  {
    icon: FileCheck2,
    title: "Chapter Tests",
    body: "Timed tests on a single chapter — the honest way to check you actually learned it.",
    href: "/exams",
    cta: "Open chapter tests",
  },
  {
    icon: ListChecks,
    title: "CQ Practice",
    body: "সৃজনশীল practice with mark-scheme structure — how to earn full marks on written answers.",
    href: "/exams",
    cta: "Practise CQs",
  },
  {
    icon: FlaskConical,
    title: "Numerical Practice",
    body: "Mole concept, gas laws and calculation drills with step-by-step worked solutions.",
    href: "/chemistry/numericals",
    cta: "Solve numericals",
  },
  {
    icon: Atom,
    title: "Equation Balancing",
    body: "Balance real SSC Chemical equations step by step until it becomes second nature.",
    href: "/chemistry/balancing",
    cta: "Balance equations",
  },
  {
    icon: Timer,
    title: "Model Tests",
    body: "Full board-pattern mock papers — timing, mark distribution and review like the real exam.",
    href: "/exams",
    cta: "See model tests",
  },
  {
    icon: RefreshCw,
    title: "Revision Tests",
    body: "Mixed-syllabus revision tests for the final stretch before the board examination.",
    href: "/exams",
    cta: "Start revision",
  },
];

const stats = [
  { icon: Target, label: "Questions attempted", value: "Tracked per chapter" },
  { icon: TrendingUp, label: "Accuracy", value: "Per topic and question type" },
  { icon: Timer, label: "Time spent", value: "Per practice session" },
  { icon: ListChecks, label: "Weak topics", surface: true, value: "Surfaced in your dashboard" },
];

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Practice centre · প্র্যাকটিস"
        title="SSC Chemistry practice centre"
        description="Practice is where chemistry actually clicks. Drill MCQs, write CQs, solve numericals and balance equations — chapter by chapter, with your accuracy and weak topics tracked."
      >
        <Link href="/chemistry/mcq">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            <Sigma className="h-4 w-4" /> Start free MCQ practice
          </Button>
        </Link>
        <Link href="/exams">
          <Button variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10">
            Model tests
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        {/* Categories */}
        <section>
          <Reveal>
            <SectionHeading
              eyebrow="What to practise"
              title="Seven practice categories"
              description="Every category maps to the board exam format — so practice time converts directly into marks."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item, i) => (
              <Reveal key={item.title} delay={i * 55} className="h-full">
                <Link href={item.href} className="group block h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand-600">
                      {item.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Chapter filter */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Practise by chapter"
              title="Pick a chapter, start drilling"
              description="Filter your practice by any of the 12 NCTB chapters and jump straight to its lessons and resources."
            />
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sscChemistryChapters.map((chapter, i) => (
              <Reveal key={chapter.slug} delay={i * 35} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-elevated">
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-extrabold text-white">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {chapter.mcqCount} MCQs
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-navy-900">{chapter.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{chapter.titleBn}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <Link
                      href="/chemistry/mcq"
                      className="rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100 transition-colors hover:bg-brand-100"
                    >
                      MCQ
                    </Link>
                    <Link
                      href="/chemistry/numericals"
                      className="rounded-full bg-cyan-50 px-3 py-1.5 text-[11px] font-bold text-cyan-700 ring-1 ring-cyan-100 transition-colors hover:bg-cyan-100"
                    >
                      Numericals
                    </Link>
                    <Link
                      href={`/chapters/${chapter.slug}`}
                      className="rounded-full bg-muted px-3 py-1.5 text-[11px] font-bold text-muted-foreground transition-colors hover:bg-muted/70"
                    >
                      Chapter
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tracking */}
        <section className="mt-24">
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
                    Every attempt is tracked
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Questions attempted, accuracy, time spent and weak topics all roll up into your Chemistry
                    dashboard — so you know exactly which chapter to revise next instead of guessing.
                  </p>
                  <Link href="/dashboard">
                    <Button className="mt-6 rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800">
                      Open my dashboard <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-border bg-background/60 p-5">
                      <stat.icon className="h-5 w-5 text-brand-500" />
                      <p className="mt-3 text-sm font-bold text-navy-900">{stat.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  New here? You can start MCQ practice without enrolling — no account needed to try a
                  chapter drill.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
