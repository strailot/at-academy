import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, GraduationCap, Users } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { site, teachers } from "@/lib/site";

export const metadata: Metadata = {
  title: "SSC Chemistry Teacher",
  description: `Meet the Chemistry teacher behind ${site.name} — a qualified, experienced SSC Chemistry specialist who teaches every class, live and recorded.`,
};

const approach = [
  {
    icon: BookOpen,
    title: "Concept before calculation",
    body: "Every chapter starts from the idea behind the chemistry, then moves to equations, numericals and exam technique — never memorisation alone.",
  },
  {
    icon: Users,
    title: "Doubts answered by the teacher",
    body: "Questions go to the teacher who took the class, not a queue. Doubt threads stay open between live sessions.",
  },
  {
    icon: GraduationCap,
    title: "Exam technique taught explicitly",
    body: "MCQ timing, CQ mark-scheme structure and practical viva answers are taught as skills in their own right.",
  },
];

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="SSC Chemistry teacher"
        title="Your Chemistry teacher"
        description="AT Academy teaches one subject, so your teacher is a Chemistry specialist — a postgraduate-qualified government school educator who has spent years with the SSC syllabus and SSC students."
      >
        <Link href="/courses/ssc-chemistry">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Explore the course <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        {/* Faculty */}
        <section>
          <Reveal>
            <SectionHeading
              eyebrow="Who teaches"
              title="A Chemistry specialist, not a generalist"
              description="Every live class, recorded lesson and doubt reply comes from your teacher."
            />
          </Reveal>

          <div className="mt-10 space-y-6">
            {teachers.map((teacher, i) => (
              <Reveal key={teacher.id} delay={i * 70}>
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  <div className="grid gap-8 p-7 md:grid-cols-[auto_1fr] md:p-9">
                    {/* Photo */}
                    <div className="mx-auto md:mx-0">
                      <span className="relative grid h-40 w-40 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-500 font-display text-4xl font-extrabold text-white shadow-glow-brand ring-1 ring-brand-100">
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
                    </div>

                    {/* Details */}
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-brand-100">
                        <BadgeCheck className="h-3.5 w-3.5" /> SSC Chemistry Teacher
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-navy-900">
                        {teacher.name}
                      </h3>
                      <p className="mt-0.5 text-base font-semibold text-brand-600">{teacher.role}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {teacher.roleBn} · {teacher.institutionBn} ({teacher.institution})
                      </p>

                      <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt className="text-muted-foreground">Qualifications</dt>
                          <dd className="text-right font-medium text-navy-900">{teacher.qualifications}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt className="text-muted-foreground">Experience</dt>
                          <dd className="text-right font-medium text-navy-900">{teacher.experience}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt className="text-muted-foreground">PDS ID</dt>
                          <dd className="text-right font-mono font-medium text-navy-900">{teacher.pdsId}</dd>
                        </div>
                        <div className="flex justify-between gap-4 border-b border-border pb-2">
                          <dt className="text-muted-foreground">Home district</dt>
                          <dd className="text-right font-medium text-navy-900">{teacher.district}</dd>
                        </div>
                      </dl>

                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{teacher.focus}</p>

                      <div className="mt-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Training &amp; accreditation
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {teacher.training.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 border-t border-border pt-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                          Chapters taught
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {teacher.teaches.map((chapter) => (
                            <span
                              key={chapter}
                              className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100"
                            >
                              {chapter}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/teachers/${teacher.id}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                      >
                        Full profile <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Teaching approach */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Teaching approach"
              title="How your teacher teaches"
              description="Three commitments that shape every SSC Chemistry class at AT Academy."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {approach.map((item, i) => (
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

        {/* CTA */}
        <Reveal delay={80}>
          <div className="mt-20 rounded-[2rem] bg-navy-950 px-8 py-12 text-center text-white shadow-elevated md:px-16">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">Learn Chemistry from your teacher</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
              Join a live batch for scheduled classes with your teacher, or study the recorded lessons at your
              own pace — doubt support included either way.
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
