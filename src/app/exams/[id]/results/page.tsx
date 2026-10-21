import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Exam Results",
  description:
    "SSC Chemistry exam results. Published scores appear only after review by the administration — no result is shown before it is confirmed.",
};

export default function ExamResultsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl pb-24 pt-16 text-center">
        <h1 className="font-display text-3xl font-extrabold text-navy-900">Exam results</h1>
        <p className="mt-3 text-muted-foreground">
          Published results appear here after review. We do not display provisional scores, ranks or pass
          rates before they are confirmed.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-card p-10 shadow-soft">
          <p className="font-display text-lg font-bold text-navy-900">No result published yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Your practice scores stay on the attempt screen. Once an exam has been reviewed, its result
            will be available from your dashboard.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/exams">
              <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white">
                Back to exams
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full border-border px-6 font-semibold">
                Open dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
