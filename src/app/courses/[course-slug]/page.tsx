import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Infinity as InfinityIcon,
  Layers,
  PlayCircle,
  Radio,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CourseCard from "@/components/site/CourseCard";
import FaqAccordion from "@/components/site/FaqAccordion";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { accentClasses, courses, getCourse } from "@/lib/site";

export function generateStaticParams() {
  return courses.map((course) => ({ "course-slug": course.slug }));
}

export function generateMetadata({ params }: { params: { "course-slug": string } }): Metadata {
  const course = getCourse(params["course-slug"]);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.summary,
    openGraph: { title: course.title, description: course.summary, type: "website" },
  };
}

export default function CourseDetailPage({ params }: { params: { "course-slug": string } }) {
  const course = getCourse(params["course-slug"]);
  if (!course) notFound();

  const related = courses.filter((c) => c.slug !== course.slug && c.subject === course.subject).slice(0, 3);
  const more = related.length > 0 ? related : courses.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow={`${course.level} · ${course.subject} · ${course.mode}`}
        align="left"
        title={course.title}
        description={course.summary}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-current text-amber-400" />
            <span className="font-bold text-white">{course.rating}</span> ({course.ratingCount})
          </span>
          <span className="inline-flex items-center gap-1.5">
            <PlayCircle className="h-4 w-4 text-cyan-300" /> {course.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-cyan-300" /> {course.chaptersCount} chapters
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-cyan-300" /> {course.hours} hours
          </span>
        </div>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            {/* Outcomes */}
            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-extrabold text-navy-900">What you&apos;ll achieve</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Curriculum */}
            <Reveal delay={60}>
              <section className="mt-16">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-display text-2xl font-extrabold text-navy-900">Curriculum</h2>
                  <p className="text-sm text-muted-foreground">
                    {course.chapters.length} chapters · {course.lessons} lessons
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {course.chapters.map((chapter, index) => (
                    <details
                      key={chapter.title}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-brand-50/60">
                        <span className="flex min-w-0 items-center gap-4">
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg font-display text-xs font-extrabold text-white ${accentClasses(
                              course.accent,
                              "solid"
                            )}`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate text-sm font-semibold text-navy-900 sm:text-[15px]">
                            {chapter.title}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground">
                          <span className="hidden sm:inline">{chapter.lessons} lessons</span>
                          <span className="hidden md:inline">{chapter.duration}</span>
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-muted transition-transform group-open:rotate-180">
                            ▾
                          </span>
                        </span>
                      </summary>
                      <ul className="border-t border-border bg-background/60 px-5 py-4">
                        {Array.from({ length: chapter.lessons }).map((_, lessonIndex) => (
                          <li
                            key={lessonIndex}
                            className="flex items-center justify-between gap-4 border-b border-border/60 py-2.5 last:border-0"
                          >
                            <span className="flex items-center gap-3 text-sm text-foreground/80">
                              <PlayCircle className="h-4 w-4 shrink-0 text-brand-400" />
                              Lesson {lessonIndex + 1}
                            </span>
                            <span className="text-xs text-muted-foreground">Video</span>
                          </li>
                        ))}
                        <li className="mt-3 flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-2.5 text-xs font-semibold text-brand-700">
                          <BookOpen className="h-4 w-4" />
                          Chapter notes and practice set included
                        </li>
                      </ul>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* What's included */}
            <Reveal delay={60}>
              <section className="mt-16">
                <h2 className="font-display text-2xl font-extrabold text-navy-900">What&apos;s included</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.includes.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Instructor */}
            <Reveal delay={60}>
              <section className="mt-16">
                <h2 className="font-display text-2xl font-extrabold text-navy-900">Your teacher</h2>
                <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-border bg-card p-7 shadow-soft sm:flex-row sm:items-center">
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 font-display text-2xl font-extrabold text-white shadow-glow-brand">
                    {course.instructor
                      .split(" ")
                      .map((part) => part.replace(".", "")[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-navy-900">{course.instructor}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-600">{course.instructorTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Leads the {course.subject} programme at AT Academy with a focus on exam technique and
                      concept-first teaching in plain English.
                    </p>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* FAQs */}
            <Reveal delay={60}>
              <section className="mt-16">
                <h2 className="font-display text-2xl font-extrabold text-navy-900">Course FAQs</h2>
                <FaqAccordion items={course.faqs} className="mt-6" />
              </section>
            </Reveal>

            {/* Related */}
            {more.length > 0 && (
              <section className="mt-16">
                <h2 className="font-display text-2xl font-extrabold text-navy-900">You may also like</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {more.map((item) => (
                    <CourseCard key={item.slug} course={item} className="h-full" />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Enrollment sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
              <div className="bg-navy-950 p-6 text-white">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold">BDT {course.price.toLocaleString("en-BD")}</span>
                  {course.compareAt && (
                    <span className="text-sm text-white/50 line-through">
                      BDT {course.compareAt.toLocaleString("en-BD")}
                    </span>
                  )}
                </div>
                {course.compareAt && (
                  <p className="mt-2 inline-flex rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-200 ring-1 ring-cyan-300/30">
                    {Math.round((1 - course.price / course.compareAt) * 100)}% off
                  </p>
                )}
                {course.installment && <p className="mt-2 text-xs text-white/50">{course.installment}</p>}

                {course.startsOn && (
                  <p className="mt-4 flex items-center gap-2 text-sm text-white/80">
                    <CalendarDays className="h-4 w-4 text-cyan-300" />
                    {course.startsOn}
                  </p>
                )}
                {course.seatsLeft != null && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-cyan-200">
                    <Users className="h-4 w-4" />
                    Only {course.seatsLeft} seats left in this batch
                  </p>
                )}

                <Link href={`/checkout/${course.slug}`} className="mt-6 block">
                  <Button className="w-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-5 text-base font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
                    Enrol now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="mt-3 block">
                  <Button variant="outline" className="w-full rounded-full border-white/20 bg-white/5 py-5 font-semibold text-white hover:bg-white/10">
                    Book a free demo
                  </Button>
                </Link>
              </div>

              <ul className="space-y-3 p-6 text-sm">
                {[
                  { icon: Radio, label: `${course.liveSessions ?? 0} live classes` },
                  { icon: PlayCircle, label: `${course.lessons} recorded lessons` },
                  { icon: InfinityIcon, label: "Full access for 12 months" },
                  { icon: BookOpen, label: "Notes, quizzes and model tests" },
                  { icon: ShieldCheck, label: "Access tied to your enrolment" },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-foreground/80">
                    <item.icon className="h-4 w-4 shrink-0 text-brand-500" />
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border p-6">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Payment is confirmed by our team before access is granted. You will receive dashboard access
                  as soon as your enrolment is verified.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
