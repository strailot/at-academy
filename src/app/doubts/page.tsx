import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenCheck,
  Clock3,
  Inbox,
  MessageCircleQuestion,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DoubtComposer from "@/components/site/DoubtComposer";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Doubt Solving",
  description: `Ask curriculum questions and get teacher replies at ${site.name}. Doubts are tracked per course and chapter so answers stay in context.`,
};

const steps = [
  {
    icon: MessageCircleQuestion,
    title: "Write the doubt",
    body: "Pick the course and chapter, then describe exactly where you got stuck — a photo of your working can follow in the reply thread.",
  },
  {
    icon: Inbox,
    title: "Teacher picks it up",
    body: "Your doubt enters the subject teacher's queue during support hours (Sat–Thu, 9:00–20:00 GMT+6).",
  },
  {
    icon: BookOpenCheck,
    title: "Answered in context",
    body: "The reply is attached to the chapter it belongs to, so revision later includes the explanation — not just the final answer.",
  },
];

export default async function DoubtsPage() {
  const session = await auth().catch(() => null);

  let answered: {
    id: string;
    question: string;
    course: string;
    chapter: string;
    updatedAt: Date | null;
  }[] = [];

  try {
    const rows = await prisma.doubt.findMany({
      where: { status: "ANSWERED" },
      orderBy: { updatedAt: "desc" },
      take: 12,
    });
    answered = (rows ?? []) as typeof answered;
  } catch {
    answered = [];
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Student support"
        align="left"
        title="Doubt solving, one clear step at a time"
        description="Stuck on a step? Send the doubt with its course and chapter attached — a subject teacher replies in your dashboard, and the answer stays linked to that chapter for revision."
      >
        <a href="#ask" className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-glow-brand transition hover:brightness-110">
          Ask a doubt
        </a>
        <Link
          href="/contact"
          className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 backdrop-blur transition hover:bg-white/10"
        >
          Talk to the team
        </Link>
      </PageHero>

      <main className="pb-24">
        {/* How it works */}
        <section className="container pt-14 md:pt-16">
          <SectionHeading
            eyebrow="How it works"
            title="From confused to clear in three moves"
            description="Doubts are routed by course and chapter so the right teacher answers with the right context."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <div className="surface h-full rounded-[1.75rem] p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow-brand">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Composer */}
        <section id="ask" className="container scroll-mt-28 pt-16 md:pt-20">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
            <Reveal>
              <DoubtComposer signedIn={!!session?.user} />
            </Reveal>

            <Reveal delay={80}>
              <div className="space-y-5">
                <div className="rounded-[1.75rem] border border-border bg-card p-7">
                  <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-navy-900">
                    <Clock3 className="h-5 w-5 text-brand-500" /> Support hours
                  </h3>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Days</dt>
                      <dd className="font-semibold text-navy-900">Saturday – Thursday</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Hours</dt>
                      <dd className="font-semibold text-navy-900">9:00 – 20:00 (GMT+6)</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Typical first reply</dt>
                      <dd className="font-semibold text-navy-900">Within one working day</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[1.75rem] border border-dashed border-brand-200 bg-brand-50/50 p-7">
                  <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-900">
                    <ShieldCheck className="h-5 w-5 text-brand-500" /> Keep it useful
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    <li>· One doubt per submission — split mixed questions so each gets a proper answer.</li>
                    <li>· Name the step where you got stuck, not just the final answer you expected.</li>
                    <li>· For live discussion, bring it to the next class or the weekly Q&amp;A session.</li>
                  </ul>
                  <Link href="/live-classes" className="mt-4 inline-block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-white"
                    >
                      See live class schedule
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Answered doubts */}
        <section className="container pt-16 md:pt-20">
          <SectionHeading
            eyebrow="Recent answers"
            title="Answered doubts"
            description="Published replies from teachers, grouped by course. Only approved answers appear here."
            align="center"
          />

          {answered.length === 0 ? (
            <div className="mx-auto mt-10 max-w-2xl rounded-[1.75rem] border border-dashed border-border bg-card/60 p-10 text-center">
              <Inbox className="mx-auto h-10 w-10 text-brand-400" />
              <h3 className="mt-5 font-display text-lg font-bold text-navy-900">
                No published answers yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Answers appear here once a teacher replies and it is approved for sharing. Yours could be
                the first — send your doubt above and we will notify you when the reply lands in your
                dashboard.
              </p>
              <a href="#ask" className="mt-6 inline-block rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-glow-brand transition hover:brightness-110">
                Ask the first doubt
              </a>
            </div>
          ) : (
            <ul className="mx-auto mt-10 max-w-3xl space-y-4">
              {answered.map((doubt) => (
                <li key={doubt.id} className="surface rounded-3xl p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                    {doubt.course}
                    {doubt.chapter ? ` · ${doubt.chapter}` : ""}
                  </p>
                  <p className="mt-2 font-semibold leading-relaxed text-navy-900">{doubt.question}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
