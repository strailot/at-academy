import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LockKeyhole, LogIn, UserPlus } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LearnWorkspace from "@/components/learn/LearnWorkspace";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { requireCourseAccess } from "@/lib/require-course-access";
import { prisma } from "@/lib/prisma";
import { courses, getCourse } from "@/lib/site";

type Props = { params: { courseSlug: string } };

export function generateStaticParams() {
  return courses.map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse(params.courseSlug);
  if (!course) return { title: "Lesson not found" };
  return {
    title: `Learn · ${course.title}`,
    description: `Recorded lessons, notes and progress for ${course.title} at AT Academy.`,
  };
}

/** The demo lesson any signed-in student may watch before enrolling. */
const PREVIEW_LESSON_ID = "c0l1";

export default async function LearnPage({ params }: Props) {
  const course = getCourse(params.courseSlug);
  if (!course) notFound();

  const session = await auth().catch(() => null);

  // ---------------------------------------------------------------- signed out
  if (!session?.user) {
    const callbackUrl = encodeURIComponent(`/learn/${course.slug}`);
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-2xl pb-24 pt-16 md:pt-24">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card text-center shadow-elevated">
            <div className="bg-grid-dark bg-navy-950 px-8 py-12">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <LogIn className="h-6 w-6 text-cyan-300" />
              </span>
              <h1 className="mt-5 font-display text-2xl font-extrabold text-white md:text-3xl">
                Sign in to open the classroom
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/60">
                Lessons, progress, notes and bookmarks live inside your student account. Sign in and
                we&apos;ll bring you straight back to this course.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 p-8">
              <Link href={`/login?callbackUrl=${encodeURIComponent(`/learn/${course.slug}`)}`}>
                <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-bold text-white shadow-glow-brand">
                  <LogIn className="h-4 w-4" /> Sign in
                </Button>
              </Link>
              <Link href={`/register?callbackUrl=${encodeURIComponent(`/learn/${course.slug}`)}`}>
                <Button
                  variant="outline"
                  className="rounded-full border-brand-200 font-bold text-brand-700 hover:bg-brand-50"
                >
                  <UserPlus className="h-4 w-4" /> Create account
                </Button>
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Looking for the syllabus first?{" "}
            <Link href={`/courses/${course.slug}`} className="font-semibold text-brand-600 hover:underline">
              View the {course.title} course page
            </Link>
            .
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // -------------------------------------------------- server-side access check
  // Enrolment rows are checked on the server before any lesson content or
  // progress data reaches the client. Students without an ACTIVE enrolment get
  // preview mode: the single free demo lesson, everything else locked.
  const dbCourse = await prisma.course
    .findUnique({ where: { slug: course.slug } })
    .catch(() => null);
  const courseId = (dbCourse as { id?: string } | null)?.id ?? course.slug;

  let access: "full" | "preview" = "preview";
  try {
    await requireCourseAccess(courseId, session.user.id);
    access = "full";
  } catch {
    access = "preview";
  }

  // An enrolment request that is still awaiting payment verification lets the
  // classroom explain *why* lessons stay locked instead of just upselling.
  let pendingOrderId: string | null = null;
  if (access !== "full") {
    const pendingOrder = await prisma.order
      .findFirst({
        where: { userId: session.user.id, courseId: course.slug, status: "PENDING_VERIFICATION" },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => null);
    pendingOrderId = (pendingOrder as { id?: string } | null)?.id ?? null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container pb-24 pt-10 md:pt-12">
        {access === "preview" && (
          <div
            className={
              pendingOrderId
                ? "mb-6 flex flex-wrap items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
                : "mb-6 flex flex-wrap items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 text-sm text-cyan-900"
            }
          >
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="min-w-0 flex-1 leading-relaxed">
              {pendingOrderId ? (
                <>
                  <span className="font-bold">Enrolment pending verification.</span> We received your
                  request <span className="font-mono font-bold">{pendingOrderId}</span> — lessons
                  unlock as soon as the payment is verified. The free demo lesson stays open in the
                  meantime.{" "}
                  <Link
                    href="/contact"
                    className="font-bold underline underline-offset-2 hover:text-amber-800"
                  >
                    Ask about payment status
                  </Link>
                  .
                </>
              ) : (
                <>
                  <span className="font-bold">Preview mode.</span> You are not enrolled in{" "}
                  {course.title} yet, so lesson 1 is open as a free demo and the rest of the course
                  stays locked.{" "}
                  <Link
                    href={`/checkout/${course.slug}`}
                    className="font-bold underline underline-offset-2 hover:text-cyan-800"
                  >
                    Enrol to unlock all {course.chapters.length} chapters
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        )}

        <LearnWorkspace
          course={{
            slug: course.slug,
            title: course.title,
            level: course.level,
            chapters: course.chapters.map((chapter) => ({
              title: chapter.title,
              lessons: chapter.lessons,
              duration: chapter.duration,
            })),
          }}
          access={access}
          userName={session.user.name ?? session.user.email ?? "Student"}
          previewLessonId={PREVIEW_LESSON_ID}
          pendingOrderId={pendingOrderId}
        />
      </main>

      <Footer />
    </div>
  );
}
