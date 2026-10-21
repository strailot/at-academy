import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, PlayCircle, Radio, ShieldCheck } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CheckoutForm from "@/components/site/CheckoutForm";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { courses, getCourse } from "@/lib/site";

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.slug }));
}

export function generateMetadata({ params }: { params: { courseId: string } }): Metadata {
  const course = getCourse(params.courseId);
  if (!course) return { title: "Checkout" };
  return { title: `Enrol · ${course.title}`, description: `Enrol in ${course.title} at AT Academy.` };
}

export default async function CheckoutPage({ params }: { params: { courseId: string } }) {
  const course = getCourse(params.courseId);
  if (!course) notFound();

  const session = await auth().catch(() => null);
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/checkout/${course.slug}`)}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow={`Secure enrolment · ${course.level}`}
        align="left"
        title="Checkout"
        description="Review your order, choose a payment method and send the fee. Our team verifies payment before access is unlocked."
      />

      <main className="container pb-24 pt-14 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <Reveal>
            <CheckoutForm courseSlug={course.slug} courseTitle={course.title} amount={course.price} />
          </Reveal>

          <Reveal delay={60}>
            <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
                <div className="bg-navy-950 p-6 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">Your order</p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug">{course.title}</h2>
                  <p className="mt-1 text-sm text-white/55">{course.subject} · {course.level}</p>

                  <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-white/60">Level</dt>
                      <dd className="font-semibold">{course.level}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/60">Format</dt>
                      <dd className="font-semibold">{course.mode}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/60">Lessons</dt>
                      <dd className="font-semibold">{course.lessons}</dd>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <dt className="text-white/60">Total</dt>
                      <dd className="font-display font-extrabold">BDT {course.price.toLocaleString("en-BD")}</dd>
                    </div>
                  </dl>

                  {course.compareAt && (
                    <p className="mt-3 inline-flex rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-bold text-cyan-200 ring-1 ring-cyan-300/30">
                      You save BDT {(course.compareAt - course.price).toLocaleString("en-BD")}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 p-6 text-sm">
                  {[
                    { icon: Radio, label: `${course.liveSessions ?? 0} live classes` },
                    { icon: PlayCircle, label: `${course.lessons} recorded lessons` },
                    { icon: CheckCircle2, label: "Notes, quizzes and model tests" },
                    { icon: ShieldCheck, label: "12 months of full access" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-foreground/80">
                      <item.icon className="h-4 w-4 shrink-0 text-brand-500" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                <ArrowRight className="h-4 w-4 rotate-180" /> Back to course details
              </Link>

              <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-5">
                <p className="text-sm font-semibold text-navy-900">Need help before paying?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Ask about batches, fees or syllabus coverage — we reply within one working day.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full rounded-full border-brand-200 text-xs font-semibold text-brand-700 hover:bg-white"
                  >
                    Contact the team
                  </Button>
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
