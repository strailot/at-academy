import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  LifeBuoy,
  PlayCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { courses } from "@/lib/site";

export const metadata: Metadata = { title: "My SSC Chemistry" };

const enrolled = [courses[0]].filter(Boolean);

const progress = [
  { slug: "ssc-chemistry", chapter: "Chapter 4 · Periodic Table", done: 14, total: 48 },
];

const studyPlan = [
  { day: "Mon", focus: "Chemistry — States of Matter", hours: "2h", done: true },
  { day: "Tue", focus: "Chemistry — Mole concept numericals", hours: "1.5h", done: true },
  { day: "Wed", focus: "Chemistry live class + notes", hours: "2h", done: false },
  { day: "Thu", focus: "Chemistry — Equation balancing drill", hours: "1.5h", done: false },
  { day: "Sat", focus: "Chemistry — Chapter 4 model test", hours: "1h", done: false },
];

const homework = [
  { title: "Mole concept numerical set (Ch 6)", course: "SSC Chemistry", due: "Due 02 Nov" },
  { title: "Periodic trends worksheet (Ch 4)", course: "SSC Chemistry", due: "Due 03 Nov" },
  { title: "Chapter 3 model test", course: "SSC Chemistry", due: "Due 06 Nov" },
];

const exams = [
  { title: "SSC Chemistry — Chapter 3 Model Test", when: "06 Nov 2026, 8:00 PM", duration: "45 min", questions: 30 },
  { title: "SSC Chemistry — Full Syllabus Mock", when: "21 Nov 2026, 10:00 AM", duration: "2h 30m", questions: 100 },
];

const results = [
  { title: "Chapter 2 — States of Matter", score: 26, total: 30, when: "28 Oct 2026" },
  { title: "Diagnostic test (Ch 1)", score: 18, total: 25, when: "24 Oct 2026" },
];

const weakTopics = [
  { topic: "Mole concept calculations", accuracy: 54, course: "SSC Chemistry" },
  { topic: "Periodic trends", accuracy: 61, course: "SSC Chemistry" },
];

const announcements = [
  { title: "Wednesday's Chemistry class starts 15 min early", when: "1 hour ago" },
  { title: "Chapter 3 notes and formula sheet uploaded", when: "Yesterday" },
  { title: "Full syllabus mock test date confirmed — 21 Nov", when: "2 days ago" },
];

const payments = [
  { id: "INV-2026-0412", course: "SSC Chemistry Complete Course", amount: 4999, method: "bKash", status: "Paid", date: "20 Oct 2026" },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const name = session.user.name || "Student";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container pb-24 pt-10 md:pt-12">
        {/* Greeting */}
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-600">Welcome back</p>
              <h1 className="mt-1 font-display text-2xl font-extrabold text-navy-900 md:text-3xl">{name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                SSC Chemistry Batch 2026 · Bangladesh Standard Time (GMT+6)
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/live-classes">
                <Button variant="outline" className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50">
                  <CalendarDays className="h-4 w-4" /> Class schedule
                </Button>
              </Link>
              <Link href="/courses">
                <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
                  <BookOpen className="h-4 w-4" /> My courses
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Stat strip */}
        <Reveal delay={50}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, label: "Enrolled courses", value: `${enrolled.length} active`, tone: "brand" },
              {
                icon: TrendingUp,
                label: "Course progress",
                value: `${Math.round(
                  (progress.reduce((sum, p) => sum + p.done, 0) /
                    Math.max(1, progress.reduce((sum, p) => sum + p.total, 0))) *
                    100
                )}%`,
                tone: "cyan",
              },
              { icon: Clock, label: "Next live class", value: "Wed 7:00 PM", tone: "navy" },
              { icon: CreditCard, label: "Payments", value: `${payments.length} settled`, tone: "brand" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
                  <stat.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-xl font-extrabold text-navy-900">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Left column */}
          <div className="space-y-10">
            {/* Continue learning */}
            <section>
              <h2 className="font-display text-lg font-extrabold text-navy-900">My SSC Chemistry</h2>
              <div className="mt-4 space-y-4">
                {progress.map((item) => {
                  const course = courses.find((c) => c.slug === item.slug);
                  if (!course) return null;
                  const pct = Math.round((item.done / item.total) * 100);
                  return (
                    <div key={item.slug} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">{course.subject}</p>
                          <h3 className="mt-1 font-display text-base font-bold text-navy-900">{course.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{item.chapter}</p>
                        </div>
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                          {pct}% complete
                        </span>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {item.done} of {item.total} lessons watched
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <Link href={`/learn/${course.slug}`}>
                          <Button size="sm" className="rounded-full bg-navy-900 font-semibold text-white hover:bg-navy-800">
                            <PlayCircle className="h-4 w-4" /> Resume lesson
                          </Button>
                        </Link>
                        <Link href={`/courses/${course.slug}`}>
                          <Button size="sm" variant="outline" className="rounded-full border-border font-semibold">
                            Course details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Study plan */}
            <section>
              <h2 className="font-display text-lg font-extrabold text-navy-900">This week&apos;s study plan</h2>
              <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <ul className="divide-y divide-border">
                  {studyPlan.map((item) => (
                    <li key={item.day} className="flex items-center gap-4 px-5 py-3.5">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-extrabold ${
                          item.done ? "bg-gradient-to-br from-brand-500 to-cyan-500 text-white" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.day}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-navy-900">{item.focus}</span>
                        <span className="block text-xs text-muted-foreground">{item.hours} planned</span>
                      </span>
                      {item.done ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      ) : (
                        <span className="h-5 w-5 shrink-0 rounded-full border-2 border-border" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Homework */}
            <section>
              <h2 className="font-display text-lg font-extrabold text-navy-900">Pending homework</h2>
              <div className="mt-4 space-y-3">
                {homework.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
                    <FileText className="h-5 w-5 shrink-0 text-brand-500" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-navy-900">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.course}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">
                      {item.due}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Exams & results */}
            <section>
              <h2 className="font-display text-lg font-extrabold text-navy-900">Upcoming exams</h2>
              <div className="mt-4 space-y-3">
                {exams.map((exam) => (
                  <div key={exam.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{exam.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {exam.when} · {exam.duration} · {exam.questions} questions
                        </p>
                      </div>
                      <Link href="/exams">
                        <Button size="sm" variant="outline" className="rounded-full border-brand-200 text-xs font-semibold text-brand-700 hover:bg-brand-50">
                          Open exam
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 font-display text-base font-extrabold text-navy-900">Recent results</h3>
              <div className="mt-3 space-y-3">
                {results.map((result) => {
                  const pct = Math.round((result.score / result.total) * 100);
                  return (
                    <div key={result.title} className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold text-white ${
                          pct >= 85 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"
                        }`}
                      >
                        {pct}%
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-navy-900">{result.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.score}/{result.total} marks · {result.when}
                        </p>
                      </div>
                      <Link href="/results" className="shrink-0 text-xs font-bold text-brand-600 hover:underline">
                        Review
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Next live class */}
            <div className="overflow-hidden rounded-3xl bg-navy-950 p-6 text-white shadow-elevated">
              <div className="absolute" />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">Next live class</p>
              <h3 className="mt-2 font-display text-lg font-bold">SSC Chemistry — States of Matter</h3>
              <p className="mt-1 text-sm text-white/60">Wednesday, 7:00 PM – 9:00 PM (GMT+6)</p>
              <Link href="/live-classes">
                <Button className="mt-5 w-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 font-semibold text-white">
                  <PlayCircle className="h-4 w-4" /> Join class
                </Button>
              </Link>
              <p className="mt-3 text-center text-[11px] text-white/40">
                Link unlocks 15 minutes before class
              </p>
            </div>

            {/* Weak topics */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-900">
                <Target className="h-5 w-5 text-cyan-500" /> Focus areas
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">Based on your recent quiz accuracy</p>
              <ul className="mt-4 space-y-4">
                {weakTopics.map((item) => (
                  <li key={item.topic}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-navy-900">{item.topic}</span>
                      <span className="text-xs text-muted-foreground">{item.accuracy}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-cyan-500" style={{ width: `${item.accuracy}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{item.course}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Announcements */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-900">
                <Bell className="h-5 w-5 text-brand-500" /> Announcements
              </h3>
              <ul className="mt-4 space-y-3">
                {announcements.map((item) => (
                  <li key={item.title} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium leading-snug text-navy-900">{item.title}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{item.when}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payments */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-900">
                <CreditCard className="h-5 w-5 text-brand-500" /> Payment history
              </h3>
              <ul className="mt-4 space-y-3">
                {payments.map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-navy-900">{payment.course}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {payment.id} · {payment.method} · {payment.date}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-navy-900">BDT {payment.amount.toLocaleString("en-BD")}</span>
                  </li>
                ))}
              </ul>
              <Link href="/account/payments">
                <Button variant="outline" size="sm" className="mt-4 w-full rounded-full border-border font-semibold">
                  View all receipts
                </Button>
              </Link>
            </div>

            {/* Support */}
            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-900">
                <LifeBuoy className="h-5 w-5 text-brand-600" /> Need help?
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Stuck on a concept or a payment? Raise a doubt or open a support ticket and our team will get
                back to you.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/contact">
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-xs font-semibold text-white">
                    Raise a doubt
                  </Button>
                </Link>
                <Link href="/account">
                  <Button size="sm" variant="outline" className="rounded-full border-brand-200 text-xs font-semibold text-brand-700 hover:bg-white">
                    Account area <ArrowRight className="h-3.5 w-3.5" />
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
