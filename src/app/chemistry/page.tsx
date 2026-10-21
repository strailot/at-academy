import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Calculator,
  CheckCircle2,
  FileCheck2,
  FlaskConical,
  ListChecks,
  RefreshCw,
  Sigma,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SSC Chemistry Interactive Tools",
  description:
    "SSC Chemistry interactive tools — formula library, equation library, periodic table, valency practice, equation balancing, numericals and MCQ drills in one hub.",
};

const tools = [
  {
    icon: Sigma,
    title: "Formula Library",
    body: "Every SSC formula — search by name, expression or note and filter by chapter.",
    href: "/chemistry/formulas",
    cta: "Browse formulas",
  },
  {
    icon: FlaskConical,
    title: "Equation Library",
    body: "Exam reactions with reactants, conditions, reaction types and explanations.",
    href: "/chemistry/equations",
    cta: "Explore equations",
  },
  {
    icon: Atom,
    title: "Periodic Table",
    body: "Interactive table of elements 1–54 — groups, periods, families and trends.",
    href: "/chemistry/periodic-table",
    cta: "Open the table",
  },
  {
    icon: ListChecks,
    title: "Valency Practice",
    body: "Drill ion and radical valencies with instant feedback and a full reference.",
    href: "/chemistry/valency",
    cta: "Practise valency",
  },
  {
    icon: RefreshCw,
    title: "Balancing Practice",
    body: "Balance real SSC equations, reveal the solution and self-mark your attempt.",
    href: "/chemistry/balancing",
    cta: "Balance equations",
  },
  {
    icon: Calculator,
    title: "Numerical Practice",
    body: "Mole concept, gas laws and pH numericals with step-by-step worked solutions.",
    href: "/chemistry/numericals",
    cta: "Solve numericals",
  },
  {
    icon: FileCheck2,
    title: "MCQ Practice",
    body: "Chapter-wise MCQs with instant scoring, accuracy and answer explanations.",
    href: "/chemistry/mcq",
    cta: "Start MCQs",
  },
];

export default function ChemistryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Chemistry tools"
        title="SSC Chemistry interactive tools"
        description="Practice is where chemistry clicks. Open a tool, drill it alongside your lessons, and keep every formula, equation and trend one click away — all built around the NCTB SSC syllabus."
      >
        <Link href="/chemistry/mcq">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            <Sigma className="h-4 w-4" /> Start MCQ practice
          </Button>
        </Link>
        <Link href="/practice">
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
          >
            Practice centre
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <section>
          <Reveal>
            <SectionHeading
              eyebrow="Toolbox"
              title="Seven tools, one syllabus"
              description="Each tool maps to a part of the board exam — formulas and equations to memorise, drills to prove you actually know them."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => (
              <Reveal key={tool.title} delay={i * 55} className="h-full">
                <Link href={tool.href} className="group block h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <tool.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand-600">
                      {tool.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Practice centre note */}
        <section className="mt-16">
          <Reveal>
            <div className="flex flex-col items-start gap-5 rounded-[2rem] border border-dashed border-brand-200 bg-brand-50/40 p-7 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-brand-100">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-extrabold text-navy-900">
                    Tools are only half the story
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    The practice centre brings MCQs, numericals, balancing and model tests together in one place —
                    so every attempt rolls up into a picture of which chapter to revise next.
                  </p>
                </div>
              </div>
              <Link
                href="/practice"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Open practice centre <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
