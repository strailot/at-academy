import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Clock,
  ExternalLink,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  School,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { courses, teachers } from "@/lib/site";

type Props = { params: { "teacher-id": string } };

export function generateStaticParams() {
  return teachers.map((teacher) => ({ "teacher-id": teacher.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const teacher = teachers.find((t) => t.id === params["teacher-id"]);
  if (!teacher) return { title: "Teacher not found" };
  return {
    title: `SSC Chemistry Teacher — ${teacher.name}`,
    description: `${teacher.name}, ${teacher.role} at ${teacher.institution} — ${teacher.qualifications}. Teaches SSC Chemistry across all 12 NCTB chapters.`,
  };
}

export default function TeacherDetailPage({ params }: Props) {
  const teacher = teachers.find((t) => t.id === params["teacher-id"]);
  if (!teacher) notFound();

  const initials = teacher.name
    .split(" ")
    .map((n) => n.replace(".", "")[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 bg-ink-gradient opacity-95" />
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-600/25 blur-[120px]" />

        <div className="container relative z-10 py-14 md:py-16">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All teachers
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-500 font-display text-3xl font-extrabold text-white shadow-glow ring-1 ring-white/20">
              {initials}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={teacher.photo}
                alt={`${teacher.name} — ${teacher.role}`}
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </span>
            <div>
              <span className="rounded-full bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-200 ring-1 ring-white/10">
                SSC Chemistry Teacher
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                {teacher.name}
              </h1>
              <p className="mt-1 text-lg font-semibold text-white/70">{teacher.nameBn}</p>
              <p className="mt-1 text-lg font-semibold text-white/80">{teacher.role}</p>
              <p className="mt-0.5 text-sm text-white/50">
                {teacher.roleBn} · {teacher.institutionBn} ({teacher.institution})
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <FlaskConical className="h-4 w-4 text-brand-300" /> {teacher.specialization}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-cyan-300" /> {teacher.qualifications}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-cyan-300" /> {teacher.experience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container pb-24 pt-12 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <BookOpen className="h-5 w-5 text-brand-500" /> Teaching approach
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80 md:text-base">{teacher.focus}</p>
              </section>
            </Reveal>

            <Reveal>
              <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <School className="h-5 w-5 text-brand-500" /> School &amp; training
                </h2>
                <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Current posting
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-navy-900">{teacher.institution}</dd>
                    <dd className="text-xs text-muted-foreground">{teacher.institutionBn}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      First government posting
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-navy-900">{teacher.joined}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      PDS ID
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-semibold text-navy-900">{teacher.pdsId}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Home district
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-navy-900">{teacher.district}</dd>
                    <dd className="text-xs text-muted-foreground">{teacher.districtBn}</dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Training &amp; accreditation
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {teacher.training.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100"
                      >
                        <BadgeCheck className="h-3.5 w-3.5" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <FlaskConical className="h-5 w-5 text-brand-500" /> Chapters taught
                </h2>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {teacher.teaches.map((chapter) => (
                    <span
                      key={chapter}
                      className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100"
                    >
                      {chapter}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Every live class, recorded lesson and doubt reply for all 12 NCTB chapters comes from your
                  teacher.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                  <GraduationCap className="h-5 w-5 text-brand-500" /> Courses
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {courses
                    .filter((course) => course.instructor === teacher.name)
                    .map((course) => (
                      <Link
                        key={course.slug}
                        href={`/courses/${course.slug}`}
                        className="group rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:border-brand-200"
                      >
                        <h3 className="text-sm font-bold text-navy-900 transition-colors group-hover:text-brand-600">
                          {course.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {course.level} · {course.type} · {course.lessons} lessons
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-600">
                          View course <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <div className="p-7 pb-4">
                  <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                    <MapPin className="h-5 w-5 text-brand-500" /> School location
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{teacher.location}</p>
                </div>
                <iframe
                  src={teacher.mapEmbedUrl}
                  title={`Map showing ${teacher.institution}`}
                  width="600"
                  height="320"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ border: 0 }}
                  allowFullScreen
                  className="h-72 w-full"
                />
              </section>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-base font-extrabold text-navy-900">Profile</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="shrink-0 text-muted-foreground">Role</dt>
                  <dd className="text-right font-medium text-navy-900">{teacher.role}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="shrink-0 text-muted-foreground">School</dt>
                  <dd className="text-right font-medium text-navy-900">{teacher.institution}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="shrink-0 text-muted-foreground">Specialization</dt>
                  <dd className="text-right font-medium text-navy-900">{teacher.specialization}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="shrink-0 text-muted-foreground">Qualifications</dt>
                  <dd className="text-right font-medium text-navy-900">{teacher.qualifications}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="shrink-0 text-muted-foreground">PDS ID</dt>
                  <dd className="text-right font-mono font-medium text-navy-900">{teacher.pdsId}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="shrink-0 text-muted-foreground">Contact</dt>
                  <dd className="text-right font-medium text-navy-900">
                    <a href={`mailto:${teacher.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-600">
                      <Mail className="h-3.5 w-3.5" /> {teacher.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-brand-100 bg-brand-50/50 p-6">
              <h3 className="font-display text-base font-extrabold text-navy-900">Study resource</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {teacher.resource.note}
              </p>
              <a
                href={teacher.resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
              >
                {teacher.resource.label} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-6">
              <h3 className="font-display text-base font-extrabold text-navy-900">Learn with this teacher</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Live classes, recorded lessons and doubt replies all come from your Chemistry teacher.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/courses/ssc-chemistry">
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-xs font-semibold text-white">
                    Explore course
                  </Button>
                </Link>
                <Link href="/live-classes">
                  <Button size="sm" variant="outline" className="rounded-full border-brand-200 text-xs font-semibold text-brand-700 hover:bg-white">
                    Class schedule
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
