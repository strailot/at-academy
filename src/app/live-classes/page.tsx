import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  Lock,
  MapPin,
  Radio,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Countdown from "@/components/site/Countdown";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SSC Chemistry Live Classes",
  description: `Upcoming SSC Chemistry live class schedule for ${site.name} batches — all times shown in Bangladesh Standard Time (GMT+6).`,
};

type Session = {
  id: string;
  course: string;
  slug: string;
  topic: string;
  batch: string;
  /** ISO-8601 with the +06:00 Dhaka offset. */
  startsAt: string;
  durationMin: number;
  host: string;
};

const upcomingSessions: Session[] = [
  {
    id: "chem-w1",
    course: "SSC Chemistry",
    slug: "ssc-chemistry",
    topic: "Chapter 01 — Concept of Chemistry: matter, pure substances & mixtures",
    batch: "SSC Chemistry Batch 2026",
    startsAt: "2026-11-02T19:00:00+06:00",
    durationMin: 120,
    host: "Md. Tareque Aziz",
  },
  {
    id: "chem-w2",
    course: "SSC Chemistry",
    slug: "ssc-chemistry",
    topic: "Chapter 02 — States of Matter: kinetic molecular theory",
    batch: "SSC Chemistry Batch 2026",
    startsAt: "2026-11-04T19:00:00+06:00",
    durationMin: 120,
    host: "Md. Tareque Aziz",
  },
  {
    id: "chem-w3",
    course: "SSC Chemistry",
    slug: "ssc-chemistry",
    topic: "Chapter 04 — Periodic Table: periodic properties & trends",
    batch: "SSC Chemistry Batch 2026",
    startsAt: "2026-11-09T19:00:00+06:00",
    durationMin: 120,
    host: "Md. Tareque Aziz",
  },
  {
    id: "chem-crash-w1",
    course: "SSC Chemistry",
    slug: "ssc-chemistry-crash",
    topic: "Revision Sprint — Weeks 1–2: core concepts rapid review",
    batch: "Revision Crash Batch 2026",
    startsAt: "2026-12-07T19:00:00+06:00",
    durationMin: 90,
    host: "Md. Tareque Aziz",
  },
];

const recentSessions = [
  {
    topic: "Introduction & syllabus walkthrough",
    batch: "SSC Chemistry Batch 2026",
    date: "26 Oct 2026",
    attendance: "Recorded",
    notes: true,
  },
  {
    topic: "Diagnostic model test (chapter 1)",
    batch: "SSC Chemistry Batch 2026",
    date: "28 Oct 2026",
    attendance: "Marked",
    notes: true,
  },
  {
    topic: "Concept of Chemistry — problem solving clinic",
    batch: "SSC Chemistry Batch 2026",
    date: "29 Oct 2026",
    attendance: "Recorded",
    notes: false,
  },
];

const weeklyTimetable = [
  { day: "Monday", time: "7:00 PM — 9:00 PM", batch: "SSC Chemistry Batch 2026", host: "Md. Tareque Aziz" },
  { day: "Wednesday", time: "7:00 PM — 9:00 PM", batch: "SSC Chemistry Batch 2026", host: "Md. Tareque Aziz" },
  { day: "Thursday", time: "6:30 PM — 8:30 PM", batch: "SSC Chemistry Batch 2026", host: "Md. Tareque Aziz" },
  { day: "Sunday", time: "9:00 AM — 10:30 AM", batch: "Revision Crash Batch 2026", host: "Md. Tareque Aziz" },
];

function formatDhaka(iso: string) {
  const date = new Date(iso);
  return {
    day: date.toLocaleDateString("en-GB", { weekday: "long", timeZone: "Asia/Dhaka" }),
    date: date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }),
    time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" }),
  };
}

export default function LiveClassesPage() {
  const sorted = [...upcomingSessions].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="SSC Chemistry live batches"
        title="Live Chemistry class schedule"
        description={`Every SSC Chemistry session below is scheduled in Bangladesh Standard Time (${site.timezone}). Class links stay locked until you are enrolled in the batch.`}
      >
        <Link href="/courses">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Enrol in a batch <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        {/* Access notice */}
        <Reveal>
          <div className="flex items-start gap-4 rounded-3xl border border-brand-100 bg-brand-50/60 p-6">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" />
            <div>
              <h2 className="font-display text-base font-bold text-navy-900">Class links are never public</h2>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Meeting links are issued per enrolled student and only appear in your{" "}
                <Link href="/dashboard" className="font-semibold text-brand-600 hover:underline">
                  dashboard
                </Link>{" "}
                shortly before the class begins. Visiting this page does not grant access — server-side
                enrolment checks decide who can see a link.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Upcoming sessions */}
        <section className="mt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Up next"
              title="Upcoming sessions"
              description="Countdowns are live. Refreshes automatically — no need to reload the page."
            />
          </Reveal>

          <div className="mt-8 space-y-4">
            {sorted.map((session, index) => {
              const when = formatDhaka(session.startsAt);
              return (
                <Reveal key={session.id} delay={index * 60}>
                  <article className="grid gap-6 rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors hover:border-brand-200 md:grid-cols-[1fr_auto] md:items-center md:p-7">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-100">
                          <Radio className="h-3.5 w-3.5" /> {session.course}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Users className="h-3.5 w-3.5" /> {session.batch}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy-900">
                        {session.topic}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4 text-brand-500" />
                          {when.day}, {when.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-cyan-500" />
                          {when.time} (GMT+6) · {Math.round(session.durationMin / 60)}h
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-navy-600" />
                          {session.host}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                      <Countdown target={session.startsAt} className="flex items-center gap-1.5" />
                      <Link href="/dashboard">
                        <Button
                          className="rounded-full bg-navy-900 px-5 font-semibold text-white hover:bg-navy-800"
                          title="Available in your dashboard when you are enrolled"
                        >
                          <Lock className="h-4 w-4" /> Enrolled students only
                        </Button>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Weekly timetable */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Weekly rhythm"
              title="Batch timetable"
              description="The same slots repeat each week of the batch, so you can plan around them."
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-50/70 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">Day</th>
                    <th scope="col" className="px-5 py-4 font-bold">Time (GMT+6)</th>
                    <th scope="col" className="px-5 py-4 font-bold">Batch</th>
                    <th scope="col" className="hidden px-5 py-4 font-bold md:table-cell">Teacher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {weeklyTimetable.map((row) => (
                    <tr key={row.day} className="transition-colors hover:bg-brand-50/40">
                      <td className="px-5 py-4 font-semibold text-navy-900">{row.day}</td>
                      <td className="px-5 py-4 text-foreground/80">{row.time}</td>
                      <td className="px-5 py-4 text-foreground/80">{row.batch}</td>
                      <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">{row.host}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* Recent sessions + notes */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading eyebrow="Class history" title="Recent sessions, recordings and notes" />
          </Reveal>

          <div className="mt-8 space-y-3">
            {recentSessions.map((row, index) => (
              <Reveal key={row.topic} delay={index * 50}>
                <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-900">{row.topic}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {row.batch} · {row.date}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {row.attendance}
                    </span>
                    {row.notes ? (
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100"
                      >
                        <FileText className="h-3.5 w-3.5" /> Notes
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">
                        <FileText className="h-3.5 w-3.5" /> Notes pending
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              Recordings, attendance and downloadable notes are published to your dashboard within 4 hours of a
              session ending.
            </p>
          </Reveal>
        </section>

        {/* Integration boundary */}
        <section className="mt-20">
          <Reveal>
            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-8">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy-900">
                <Video className="h-5 w-5 text-brand-600" /> Video provider integration
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                AT Academy does not yet have a Google Meet or Zoom account connected, so no live meeting links
                are generated today. The platform is designed so that connecting a provider only requires:
              </p>
              <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-foreground/80">
                <li>
                  Adding provider credentials (for example Google OAuth or a Zoom JWT) to the environment —
                  never to the client bundle.
                </li>
                <li>
                  Creating the meeting from a server route when a{" "}
                  <code className="rounded bg-white px-1.5 py-0.5 text-xs text-navy-950">LiveClass</code> record is scheduled,
                  then storing the returned join URL against the batch.
                </li>
                <li>
                  Serving that URL only after an enrolment check, ideally as a per-student signed link rather
                  than a shared meeting room.
                </li>
              </ol>
              <p className="mt-4 text-sm text-muted-foreground">
                Until a provider is configured, teachers share the meeting link directly with enrolled students
                and the platform shows the schedule, countdowns and access rules you see here.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
