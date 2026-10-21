import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Award,
  Beaker,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Infinity as InfinityIcon,
  Laptop,
  ListChecks,
  Microscope,
  MonitorPlay,
  NotebookPen,
  PlayCircle,
  Radio,
  ShieldCheck,
  Sigma,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountUp from "@/components/site/CountUp";
import CourseCard, { CourseThumb } from "@/components/site/CourseCard";
import FaqAccordion from "@/components/site/FaqAccordion";
import Marquee from "@/components/site/Marquee";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import TiltCard from "@/components/site/TiltCard";
import { Button } from "@/components/ui/button";
import AtomHero from "@/components/site/AtomHero";
import { sscChemistryChapters } from "@/lib/chemistry";
import { accentClasses, courses, faqGroups, site, teachers } from "@/lib/site";

const marqueeItems = [
  "NCTB-aligned SSC Chemistry",
  "Chapter-by-chapter learning",
  "MCQ practice",
  "CQ (সৃজনশীল) preparation",
  "Numerical problem solving",
  "Equation balancing",
  "Live + recorded classes",
  "Model tests",
  "Practical preparation",
  "Doubt solving",
];

const whyItems = [
  {
    icon: BookOpen,
    title: "One subject, taught completely",
    body: "AT Academy teaches SSC Chemistry and nothing else. Every lesson, class and practice set exists to move you through the full NCTB syllabus.",
  },
  {
    icon: ListChecks,
    title: "Chapter-by-chapter structure",
    body: "Chapter → topics → lessons → practice → quiz → revision. You always know where you are in the syllabus and what comes next.",
  },
  {
    icon: Radio,
    title: "Live classes in Bangladesh time",
    body: "Scheduled Chemistry sessions in Bangladesh Standard Time. Miss one and the recording is in your dashboard within hours.",
  },
  {
    icon: Users,
    title: "Real Chemistry teacher access",
    body: "Ask questions in the doubt-solving thread for your batch and get answers from the teacher who took the class.",
  },
  {
    icon: Microscope,
    title: "Chemistry tools built in",
    body: "A periodic table explorer, equation balancer, formula library and equation library sit alongside your lessons.",
  },
  {
    icon: ShieldCheck,
    title: "Exam-focused, not exam-gimmick",
    body: "Board-style practice, model tests and mark-scheme technique — no claims of guaranteed questions, just genuine preparation.",
  },
];

const programFeatures = [
  { icon: MonitorPlay, title: "Recorded lessons", body: "Chapter-wise video with playback speed, resume tracking, notes and bookmarks." },
  { icon: Video, title: "Live classes", body: "Scheduled batch sessions with recording and attendance tracking." },
  { icon: Award, title: "Model tests", body: "Chapter-wise MCQ/CQ practice and full-length board-style mock exams with results." },
  { icon: Sparkles, title: "Revision kit", body: "Formula sheets, condensed notes and revision drills before the board exam." },
];

const announcements = [
  {
    kind: "Demo",
    title: "Free SSC Chemistry demo lesson",
    body: "Watch a full sample lesson on the Periodic Table before you commit to a batch.",
    cta: { href: "/courses/ssc-chemistry", label: "Watch demo" },
  },
  {
    kind: "Exam",
    title: "SSC Chemistry Model Test — full syllabus",
    body: "A timed mock examination covering all 12 SSC Chemistry chapters with results and review.",
    cta: { href: "/exams", label: "See exams" },
  },
  {
    kind: "Notice",
    title: "Revision crash course opens",
    body: "A 6-week live revision sprint for SSC Chemistry candidates starts 05 Dec 2026.",
    cta: { href: "/courses/ssc-chemistry-crash", label: "View course" },
  },
];

export default function HomePage() {
  const flagship = courses.find((c) => c.featured) ?? courses[0];

  const totals = courses.reduce(
    (acc, course) => ({
      lessons: acc.lessons + course.lessons,
      live: acc.live + (course.liveSessions ?? 0),
      chapters: acc.chapters + course.chaptersCount,
    }),
    { lessons: 0, live: 0, chapters: 0 }
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 bg-ink-gradient opacity-90" />
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="pointer-events-none absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-brand-600/25 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-56 right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-[130px]" />

        <div className="container relative z-10 grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:py-24 xl:gap-12">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 ring-1 ring-white/10">
                <FlaskConical className="h-3.5 w-3.5" />
                SSC Chemistry Learning Platform
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.4rem]">
                Master SSC Chemistry
                <span className="brand-text-gradient text-glow"> with Confidence.</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
                Concept-focused lessons, chapter-wise practice, live classes, and board-style exam
                preparation designed specifically for SSC Chemistry students.
              </p>
              <p className="mt-3 text-sm font-semibold text-cyan-200/80">
                NCTB-aligned <span className="text-white/30">•</span> Chapter-wise{" "}
                <span className="text-white/30">•</span> Exam-focused
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/courses/ssc-chemistry">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-7 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
                  >
                    Explore SSC Chemistry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/chemistry/mcq">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/20 bg-white/5 px-7 font-semibold text-white hover:bg-white/10"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Start Free Practice
                  </Button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  { label: "Chapters", value: totals.chapters, suffix: "" },
                  { label: "Video lessons", value: totals.lessons, suffix: "" },
                  { label: "Live classes", value: totals.live, suffix: "" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-2xl font-extrabold text-white md:text-3xl">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Hero visual — interactive 3D carbon atom */}
          <Reveal delay={160} className="relative flex w-full flex-col items-center lg:items-end">
            <AtomHero />
          </Reveal>
        </div>

        {/* chemistry marquee */}
        <div className="relative z-10 border-t border-white/10 py-5">
          <Marquee speed={44}>
            {marqueeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-3 text-sm font-semibold text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ================= CHAPTER MAP PREVIEW ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="The syllabus, mapped"
            title="All 12 NCTB SSC Chemistry chapters"
            description="Every chapter is a structured path: topics → lessons → practice → quiz → revision. Open any chapter to see objectives, formulas and common mistakes."
            actions={
              <Link href="/chapters" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700">
                Full chapter map <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sscChemistryChapters.map((chapter, i) => (
            <Reveal key={chapter.slug} delay={i * 40} className="h-full">
              <Link
                href={`/chapters/${chapter.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-extrabold text-white">
                    {String(chapter.number).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">{chapter.lessons} lessons</span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-navy-900 transition-colors group-hover:text-brand-600">
                  {chapter.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{chapter.titleBn}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold text-brand-600">
                  Open chapter <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FLAGSHIP SHOWCASE — SSC CHEMISTRY ================= */}
      <section id="courses" className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Flagship programme"
            title="SSC Chemistry — the complete package"
            description="All 12 NCTB chapters, live problem-solving classes, interactive chemistry tools and full board-paper preparation."
          />
        </Reveal>

        <Reveal delay={80}>
          <TiltCard className="mt-10">
            <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated lg:grid-cols-2">
              <div className="relative">
                <CourseThumb course={flagship} className="h-full min-h-[16rem] rounded-none" />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-2">
                  {flagship.includes.slice(0, 3).map((item) => (
                    <span key={item} className="rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-8 md:p-10">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-brand-100">
                    {flagship.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-navy-800">{flagship.rating}</span>
                    <span className="font-medium text-muted-foreground">({flagship.ratingCount} reviews)</span>
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
                  {flagship.title}
                </h3>
                <p className="mt-1 text-base text-muted-foreground">{flagship.level} · {flagship.subject} · NCTB aligned</p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {flagship.outcomes.slice(0, 6).map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-foreground/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                      {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <PlayCircle className="h-4 w-4 text-brand-500" /> {flagship.lessons} lessons
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="h-4 w-4 text-cyan-500" /> {flagship.liveSessions} live sessions
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-navy-600" /> {flagship.startsOn}
                  </span>
                </div>

                <div className="mt-auto flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-extrabold text-navy-900">
                        BDT {flagship.price.toLocaleString("en-BD")}
                      </span>
                      {flagship.compareAt && (
                        <span className="text-sm text-muted-foreground line-through">
                          BDT {flagship.compareAt.toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>
                    {flagship.installment && (
                      <p className="text-xs text-muted-foreground">{flagship.installment}</p>
                    )}
                  </div>
                  <Link href={`/courses/${flagship.slug}`}>
                    <Button size="lg" className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-7 font-semibold text-white shadow-glow-brand transition-transform hover:scale-[1.03]">
                      View course
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {courses
            .filter((c) => c.slug !== flagship.slug)
            .map((course, i) => (
              <Reveal key={course.slug} delay={i * 80} className="h-full">
                <CourseCard course={course} className="h-full" />
              </Reveal>
            ))}
        </div>
      </section>

      {/* ================= PRACTICE + CHEMISTRY TOOLS ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-14 text-white shadow-elevated md:px-12 md:py-20">
            <div className="absolute inset-0 bg-ink-gradient opacity-95" />
            <div className="absolute inset-0 bg-grid-dark opacity-50" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px]" />

            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <SectionHeading
                  tone="dark"
                  eyebrow="Practice & tools"
                  title="Chemistry you can actually practise"
                  description="MCQs, CQs, numericals, equation balancing and interactive tools sit alongside your lessons — a periodic trend or an unbalanced equation is always one click away."
                  align="left"
                />

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { title: "MCQ Practice", body: "Chapter-wise question drills with instant feedback", href: "/chemistry/mcq" },
                    { title: "Equation Balancing", body: "Balance equations step by step", href: "/chemistry/balancing" },
                    { title: "Periodic Table", body: "Explore elements, groups and trends", href: "/chemistry/periodic-table" },
                    { title: "Formula Library", body: "Searchable formula reference by chapter", href: "/chemistry/formulas" },
                    { title: "Equation Library", body: "Reactions with conditions and explanations", href: "/chemistry/equations" },
                    { title: "Valency Practice", body: "Build valency and radical recall", href: "/chemistry/valency" },
                  ].map((tool, i) => (
                    <Reveal key={tool.title} delay={i * 50}>
                      <Link
                        href={tool.href}
                        className="group block rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"
                      >
                        <p className="text-sm font-bold">{tool.title}</p>
                        <p className="mt-1 text-xs text-white/50">{tool.body}</p>
                      </Link>
                    </Reveal>
                  ))}
                </div>

                <Link href="/practice">
                  <Button className="mt-9 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-7 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                    Open practice centre
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Element card visual */}
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative aspect-square">
                  <div className="absolute inset-10 rounded-full border border-white/10" />
                  <div className="absolute inset-20 rounded-full border border-white/[0.07]" />
                  <div className="absolute inset-[38%] grid place-items-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 shadow-glow">
                    <Beaker className="h-12 w-12 text-white" />
                  </div>
                  <span className="absolute left-10 top-10 h-2.5 w-2.5 rounded-full bg-cyan-300 animate-pulse-glow" />
                  <span className="absolute bottom-16 right-12 h-2.5 w-2.5 rounded-full bg-brand-300 animate-pulse-glow [animation-delay:1.6s]" />
                </div>

                <div className="absolute -bottom-4 left-1/2 w-[92%] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-extrabold">H</span>
                    <span className="text-xs text-white/50">1.008</span>
                  </div>
                  <p className="mt-1 text-sm font-bold">Hydrogen</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                    The simplest element — and the best place to start understanding structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= LIVE CLASSES + RECORDED ================= */}
      <section id="live" className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Two ways to learn"
            title="Live classes, or learn at your own pace"
            description="Enrol in a live Chemistry batch for structure and accountability, or study recorded lessons on your own schedule. The complete course includes both."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-navy-950 p-8 text-white shadow-elevated md:p-10">
              <div className="absolute inset-0 bg-ink-gradient opacity-90" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/25 blur-[90px]" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200 ring-1 ring-white/10">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                  Live batches
                </span>

                <h3 className="mt-5 font-display text-2xl font-extrabold md:text-3xl">
                  Scheduled Chemistry classes in Bangladesh time
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                  Every batch publishes its full weekly timetable up front. Join links stay locked until you
                  are enrolled and the class is about to start — then unlock automatically in your dashboard.
                </p>

                <ul className="mt-7 space-y-3">
                  {courses
                    .filter((c) => c.mode !== "Recorded" && c.startsOn)
                    .slice(0, 3)
                    .map((course) => (
                      <li
                        key={course.slug}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">{course.title}</p>
                          <p className="mt-0.5 text-xs text-white/50">
                            {course.startsOn} · {course.mode}
                          </p>
                        </div>
                        <Link href="/live-classes" className="shrink-0 text-xs font-bold text-cyan-300 hover:text-cyan-200">
                          Schedule
                        </Link>
                      </li>
                    ))}
                </ul>

                <Link href="/live-classes">
                  <Button className="mt-8 rounded-full bg-gradient-to-r from-cyan-400 to-brand-500 px-6 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                    View all live classes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-brand-100">
                <MonitorPlay className="h-3.5 w-3.5" /> Recorded library
              </span>

              <h3 className="mt-5 font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
                Learn whenever you can
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                A real learning interface — not a folder of links. Chapter → topic → lesson, with playback
                speed, resume tracking, notes, bookmarks and chapter quizzes.
              </p>

              <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: InfinityIcon, term: "Resume anywhere", def: "Pick up exactly where you stopped, even across devices." },
                  { icon: Laptop, term: "Playback speed", def: "Rewatch a tricky step or fast-forward the review." },
                  { icon: NotebookPen, term: "Notes & bookmarks", def: "Attach notes to a lesson and revisit them later." },
                  { icon: Award, term: "Chapter quizzes", def: "Check your understanding at the end of every chapter." },
                ].map((item) => (
                  <div key={item.term} className="rounded-2xl border border-border bg-background/60 p-4">
                    <item.icon className="h-5 w-5 text-brand-500" />
                    <dt className="mt-2.5 text-sm font-bold text-navy-900">{item.term}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.def}</dd>
                  </div>
                ))}
              </dl>

              <Link href="/courses/ssc-chemistry">
                <Button variant="outline" className="mt-8 rounded-full border-brand-200 px-6 font-semibold text-brand-700 hover:bg-brand-50">
                  Explore the complete course
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= UPCOMING BATCHES ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Upcoming batches"
            title="Small batches, start dates you can plan around"
            description="Seats are capped so the teacher can actually reach everyone in the room."
            actions={
              <Link href="/live-classes" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700">
                Full timetable <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {courses
            .filter((c) => c.seatsLeft != null)
            .map((course, i) => (
              <Reveal key={course.slug} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl text-white ${accentClasses(course.accent, "solid")}`}>
                      <FlaskConical className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-extrabold text-amber-700 ring-1 ring-amber-200">
                      {course.seatsLeft} seats left
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{course.level} · {course.subject} · {course.mode}</p>

                  <dl className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Starts</dt>
                      <dd className="font-semibold text-navy-900">{course.startsOn?.replace("Batch starts ", "")}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Format</dt>
                      <dd className="font-semibold text-navy-900">{course.mode}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Live sessions</dt>
                      <dd className="font-semibold text-navy-900">{course.liveSessions ?? 0} sessions</dd>
                    </div>
                  </dl>

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="font-display text-xl font-extrabold text-navy-900">
                      BDT {course.price.toLocaleString("en-BD")}
                    </span>
                    <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700">
                      Reserve <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* ================= WHY AT ACADEMY ================= */}
      <section id="about" className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Why AT Academy"
            title="Built entirely around SSC Chemistry"
            description="Not a video library with a chemistry section. A complete learning system for one subject — structured lessons, real teacher access and honest progress tracking."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="h-full">
              <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= CHEMISTRY FACULTY ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Meet your teacher"
            title="A Chemistry specialist, not a generalist"
            description="Every class is taught by a Chemistry specialist who has spent years with the SSC syllabus and SSC students."
            actions={
              <Link href="/teachers" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700">
                Teacher profile <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {teachers.map((teacher, i) => (
            <Reveal key={teacher.id} delay={i * 70} className="h-full">
              <Link href={`/teachers/${teacher.id}`} className="group block h-full">
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                  <div className="flex items-center gap-4">
                    <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 font-display text-xl font-extrabold text-white shadow-glow-brand">
                      {teacher.name
                        .split(" ")
                        .map((n) => n.replace(".", "")[0])
                        .slice(0, 2)
                        .join("")}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={teacher.photo}
                        alt={`${teacher.name} — ${teacher.role}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900">{teacher.name}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-brand-600">{teacher.role}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{teacher.institution}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm font-medium text-foreground/80">
                    {teacher.qualifications} · {teacher.experience}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{teacher.focus}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= LEARNING PROGRAMME FEATURES ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="What's inside"
            title="Every SSC Chemistry programme comes with the full toolkit"
            align="center"
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programFeatures.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="h-full">
            <div className="h-full rounded-3xl border border-border bg-brand-gradient-soft p-7 ring-1 ring-brand-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated light-island">
                <item.icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-3xl border border-border bg-card px-8 py-6 text-sm text-muted-foreground shadow-soft">
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-brand-500" /> NCTB-aligned syllabus
            </span>
            <span className="inline-flex items-center gap-2">
              <Atom className="h-5 w-5 text-cyan-500" /> Concept-first instruction
            </span>
            <span className="inline-flex items-center gap-2">
              <Sigma className="h-5 w-5 text-navy-600" /> MCQ · CQ · Numericals
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-500" /> Enrolment-gated content
            </span>
          </div>
        </Reveal>
      </section>

      {/* ================= STUDENT STORIES (real feedback only) ================= */}
      <section id="reviews" className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Student stories"
            title="What Chemistry students say"
            description="We only publish verified feedback from real SSC Chemistry students."
            align="center"
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-dashed border-brand-200 bg-brand-50/40 p-10 text-center">
            <Star className="mx-auto h-10 w-10 text-brand-300" />
            <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
              Verified reviews are coming soon
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Student feedback is collected, verified and then published here. We would rather show nothing
              than show quotes that aren&apos;t real. Have feedback from a course you took? Send it to{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-600 hover:underline">
                {site.email}
              </a>
              .
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/register">
                <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
                  Create free account
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50">
                  Share feedback
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= ANNOUNCEMENTS / DEMO / EXAMS ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="What's new"
            title="Demos, exams and announcements"
            description="Try before you commit, and keep up with what's running this month."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {announcements.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-cyan-700 ring-1 ring-cyan-100">
                  {item.kind}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <Link href={item.cta.href} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand-600 hover:text-brand-700">
                  {item.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= LEARN ON ANY DEVICE ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-brand-gradient-soft p-8 ring-1 ring-brand-100 md:p-12 light-island">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
                  Study on the phone you already have
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  The whole platform — lessons, live classes, practice, exams and progress — runs in the
                  browser on mobile, tablet and desktop. No app install required, and your position is
                  remembered when you come back.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/courses/ssc-chemistry">
                    <Button className="rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800">
                      <Laptop className="h-4 w-4" /> Start learning
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="rounded-full border-brand-200 px-6 font-semibold text-brand-700 hover:bg-white">
                      <PlayCircle className="h-4 w-4" /> Open dashboard
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden shrink-0 lg:block">
                <div className="flex items-end gap-3">
            <div className="w-24 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-soft light-island">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500" />
                    <p className="mt-2 text-center text-[10px] font-bold text-navy-800">Phone</p>
                  </div>
                  <div className="w-40 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-soft light-island">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-cyan-400 to-brand-600" />
                    <p className="mt-2 text-center text-[10px] font-bold text-navy-800">Tablet</p>
                  </div>
                  <div className="w-48 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-soft light-island">
                    <div className="h-28 rounded-xl bg-gradient-to-br from-navy-700 to-brand-600" />
                    <p className="mt-2 text-center text-[10px] font-bold text-navy-800">Desktop</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= FAQ + CTA ================= */}
      <section className="container pt-20 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 ring-1 ring-brand-100">
                FAQ
              </p>
              <h2 className="font-display text-3xl font-extrabold text-navy-900 md:text-4xl">
                Questions SSC Chemistry students ask us most
              </h2>
              <p className="mt-4 text-muted-foreground">
                Still unsure about something? The full help centre covers the course, enrolment, payments,
                live classes and support.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/faq">
                  <Button variant="outline" className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50">
                    All FAQs
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <FaqAccordion items={faqGroups[0].items.concat(faqGroups[2].items)} />
          </Reveal>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="container pt-20 md:pt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-8 py-16 text-center text-white shadow-elevated md:px-16 md:py-20">
            <div className="absolute inset-0 bg-ink-gradient opacity-95" />
            <div className="absolute inset-0 bg-grid-dark opacity-50" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <Image
                src="/logo/at-academy-logo.png"
                alt={`${site.name} logo`}
                width={64}
                height={64}
                className="mx-auto h-16 w-16 rounded-2xl object-cover ring-1 ring-white/15"
              />
              <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Start your SSC Chemistry preparation today
              </h2>
              <p className="mt-4 text-white/60">
                Explore the complete course, reserve a seat in the next batch, and get your lessons, practice
                and live class schedule in one Chemistry dashboard.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/register">
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-8 font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                    Create free account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10">
                    Book a free demo class
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-xs text-white/40">SSC · Chemistry · NCTB-aligned</p>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
