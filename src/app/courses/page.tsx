import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Radio, Video } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CourseCatalog from "@/components/site/CourseCatalog";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { courses, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SSC Chemistry Courses",
  description: `Browse ${site.name} SSC Chemistry programmes — the complete course and the exam-season revision course, live or recorded, aligned with the NCTB syllabus.`,
};

const formats = [
  {
    icon: Radio,
    title: "Live",
    body: "Fixed batch timetable with scheduled classes in Bangladesh Standard Time, recorded for later.",
  },
  {
    icon: Video,
    title: "Recorded",
    body: "Fully self-paced lessons with playback speed, resume tracking, notes and chapter quizzes.",
  },
  {
    icon: BookOpen,
    title: "Hybrid",
    body: "The full experience — a live batch plus a permanent recorded library for revision.",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow={`${courses.length} SSC Chemistry programmes`}
        title="SSC Chemistry courses"
        description="Filter by course type, learning mode and price — every course maps chapter by chapter to the NCTB SSC Chemistry syllabus."
      >
        <Link href="/live-classes">
          <Button variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10">
            <Radio className="h-4 w-4" /> Live timetable
          </Button>
        </Link>
        <Link href="/contact">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Book a free demo <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <CourseCatalog />

        {/* Format explainer */}
        <section className="mt-24">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
              Understanding the formats
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {formats.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} className="h-full">
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
