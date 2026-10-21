"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { mcqBank } from "@/lib/chemistry";
import { cn } from "@/lib/utils";

/** Turns an exam id such as `chapter-4` into a readable label. */
function examLabel(id: string): string {
  if (id.startsWith("chapter-")) {
    return `Chapter ${id.replace("chapter-", "")} test`;
  }
  if (id.startsWith("model-test-")) {
    return `Model Test ${id.replace("model-test-", "")}`;
  }
  return "SSC Chemistry practice test";
}

export default function ExamAttemptPage() {
  const params = useParams<{ id: string }>();
  const id = typeof params?.id === "string" ? params.id : "practice";
  const questions = useMemo(() => mcqBank.slice(0, 10), []);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  const score = questions.reduce(
    (sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0),
    0
  );
  const answered = Object.keys(answers).length;

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Practice test"
        title={examLabel(id)}
        description="Answer the sample set, then submit to see your practice score. This is a short sample while the full question bank is being reviewed."
      />

      <main className="container pb-24 pt-10 md:pt-12">
        {submitted && (
          <div className="mb-8 rounded-3xl border border-brand-500/20 bg-card p-6 shadow-soft">
            <p className="font-display text-lg font-bold text-navy-900">
              Practice score: {score} / {questions.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {answered} of {questions.length} questions answered. This score is for practice only and is
              not a published result — review each explanation below.
            </p>
            <Link href="/exams">
              <Button variant="outline" className="mt-4 rounded-full border-border font-semibold">
                Back to exams
              </Button>
            </Link>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-bold text-navy-900 ring-1 ring-border">
            <Clock className="h-4 w-4 text-brand-500" />
            {submitted ? "Submitted" : fmt(timeLeft)}
          </div>
          <Button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={submitted}
            className="rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800 disabled:opacity-40"
          >
            Submit test
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {questions.map((q, i) => {
            const chosen = answers[i];
            return (
              <section key={q.question} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-brand-500/10 text-sm font-extrabold text-brand-600">
                    {i + 1}
                  </span>
                  <h2 className="pt-1 font-semibold text-navy-900">{q.question}</h2>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((option, optionIndex) => {
                    const isChosen = chosen === optionIndex;
                    const isCorrect = q.correct === optionIndex;
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [i]: optionIndex }))}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition",
                          !submitted && isChosen
                            ? "border-brand-500 bg-brand-50 text-brand-700"
                            : "border-border bg-background hover:border-brand-500/40",
                          submitted && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                          submitted && isChosen && !isCorrect && "border-rose-500 bg-rose-50 text-rose-700"
                        )}
                      >
                        {submitted && isCorrect && <CheckCircle2 className="h-4 w-4 flex-shrink-0" />}
                        {submitted && isChosen && !isCorrect && <XCircle className="h-4 w-4 flex-shrink-0" />}
                        {option}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <p className="mt-3 rounded-xl bg-background px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {q.explanation}
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
