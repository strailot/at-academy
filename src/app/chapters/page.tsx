import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, FlaskConical, ListChecks, PlayCircle, Sigma } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { sscChemistryChapters } from "@/lib/chemistry";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SSC Chemistry Chapters",
  description:
    "The complete SSC Chemistry syllabus as an interactive chapter map — every NCTB chapter with topics, lessons, practice counts and revision resources.",
};

const flow = [
  { icon: BookOpen, step: "Chapter", body: "One NCTB chapter at a time, in syllabus order." },
  { icon: ListChecks, step: "Topics", body: "Every topic listed with learning objectives." },
  { icon: PlayCircle, step: "Lessons", body: "Concept-focused recorded and live lessons." },
  { icon: Sigma, step: "Practice", body: "MCQ, CQ and numerical practice per chapter." },
  { icon: FlaskConical, step: "Quiz", body: "A chapter quiz checks your understanding." },
  { icon: CheckCircle2, step: "Revision", body: "Formulas, notes and revision drills before the exam." },
];

export default function ChaptersPage() {
  const totals = sscChemistryChapters.reduce(
    (acc, chapter) => ({
      lessons: acc.lessons + chapter.lessons,
      mcq: acc.mcq + chapter.mcqCount,
      cq: acc.cq + chapter.cqCount,
      numerical: acc.numerical + chapter.numericalCount,
    }),
    { lessons: 0, mcq: 0, cq: 0, numerical: 0 }
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="NCTB SSC Chemistry · অধ্যায়ভিত্তিক"
        title="SSC Chemistry chapter map"
        description="Every chapter of the NCTB SSC Chemistry syllabus, structured as a learning path — topics, lessons, practice and revision. Open a chapter to see its objectives, formulas and common mistakes."
      >
        <Link href="/courses/ssc-chemistry">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Explore the course <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/practice">
          <Button variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10">
            Start practice
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        {/* Syllabus totals */}
        <Reveal>
          <div className="grid gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Chapters", value: `${sscChemistryChapters.length}` },
              { label: "Lessons", value: `${totals.lessons}` },
              { label: "MCQ practice questions", value: `${totals.mcq}` },
              { label: "CQ & numerical items", value: `${totals.cq + totals.numerical}` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-background/60 p-5">
                <p className="font-display text-2xl font-extrabold text-navy-900">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Learning flow */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="How each chapter works"
              title="Chapter → Topic → Lesson → Practice → Quiz → Revision"
              description="The same structure repeats for all 12 chapters, so you always know exactly what 'done' looks like."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {flow.map((item, i) => (
              <Reveal key={item.step} delay={i * 50} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-navy-900">
                    <span className="mr-1.5 text-xs font-extrabold text-brand-500">{i + 1}</span>
                    {item.step}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Chapter list */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="The syllabus"
              title="All 12 chapters"
              description="Chapter names follow the current NCTB SSC Chemistry textbook, with Bangla names as used in class."
            />
          </Reveal>

          <div className="mt-10 space-y-4">
            {sscChemistryChapters.map((chapter, i) => (
              <Reveal key={chapter.slug} delay={i * 30}>
                <Link
                  href={`/chapters/${chapter.slug}`}
                  className="group grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-elevated md:grid-cols-[auto_1fr_auto] md:items-center md:p-7"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-extrabold text-white shadow-glow-brand">
                    {String(chapter.number).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg font-bold text-navy-900 transition-colors group-hover:text-brand-600">
                        {chapter.title}
                      </h3>
                      <span className="text-sm font-semibold text-muted-foreground">{chapter.titleBn}</span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {chapter.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <PlayCircle className="h-3.5 w-3.5 text-brand-500" /> {chapter.lessons} lessons · {chapter.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Sigma className="h-3.5 w-3.5 text-cyan-500" /> {chapter.mcqCount} MCQs
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ListChecks className="h-3.5 w-3.5 text-navy-500" /> {chapter.cqCount} CQ items
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FlaskConical className="h-3.5 w-3.5 text-cyan-500" /> {chapter.numericalCount} numericals
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-transform group-hover:translate-x-1 md:self-start">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal delay={80}>
          <div className="mt-20 rounded-[2rem] bg-navy-950 px-8 py-12 text-center text-white shadow-elevated md:px-16">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">
              Learn every chapter with a teacher, not alone
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              The {site.name} complete course pairs this chapter map with live classes, recorded lessons,
              doubt-solving and full exam preparation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/courses/ssc-chemistry">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-7 font-semibold text-white shadow-glow">
                  Explore SSC Chemistry <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
