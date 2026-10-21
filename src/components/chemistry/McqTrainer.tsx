"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Info, RotateCcw, XCircle } from "lucide-react";
import { mcqBank, sscChemistryChapters } from "@/lib/chemistry";
import { cn } from "@/lib/utils";

function chapterTitle(slug: string): string {
  return sscChemistryChapters.find((c) => c.slug === slug)?.title ?? slug;
}

const FILTERS = [
  { slug: "all", title: "All chapters" },
  ...Array.from(new Set(mcqBank.map((q) => q.chapter))).map((slug) => ({
    slug,
    title: chapterTitle(slug),
  })),
];

/** One-question-at-a-time MCQ drill with instant feedback, running score and an end-of-set summary. */
export default function McqTrainer() {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(
    () => (filter === "all" ? mcqBank : mcqBank.filter((q) => q.chapter === filter)),
    [filter]
  );
  const question = questions[index];
  const answered = selected !== null;
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;

  const resetRun = () => {
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setAttempts(0);
    setFinished(false);
  };

  const changeFilter = (slug: string) => {
    setFilter(slug);
    resetRun();
  };

  const choose = (optionIndex: number) => {
    if (answered || !question) return;
    setSelected(optionIndex);
    setAttempts((a) => a + 1);
    if (optionIndex === question.correct) setCorrect((c) => c + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  return (
    <div>
      {/* Chapter filter */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter MCQs by chapter">
        {FILTERS.map((f) => (
          <button
            key={f.slug}
            type="button"
            onClick={() => changeFilter(f.slug)}
            aria-pressed={filter === f.slug}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
              filter === f.slug
                ? "bg-navy-900 text-white"
                : "bg-card text-muted-foreground ring-1 ring-border hover:bg-brand-50 hover:text-brand-700"
            )}
          >
            {f.title}
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
        <span className="text-xs font-bold text-muted-foreground" role="status">
          {correct} correct · {attempts} attempts · {accuracy}% accuracy
        </span>
        {!finished && (
          <span className="text-xs font-bold text-muted-foreground">
            Question {Math.min(index + 1, questions.length)} of {questions.length}
          </span>
        )}
      </div>

      {finished ? (
        <div className="mt-6 rounded-3xl border border-border bg-card p-8 text-center shadow-soft md:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-glow">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-extrabold text-navy-900">Set complete</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You answered <strong className="text-navy-900">{correct}</strong> of{" "}
            <strong className="text-navy-900">{attempts}</strong> questions correctly — {accuracy}% accuracy.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetRun}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
            >
              <RotateCcw className="h-4 w-4" /> Practise again
            </button>
            <button
              type="button"
              onClick={() => changeFilter("all")}
              className="rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Switch chapter
            </button>
          </div>
        </div>
      ) : (
        question && (
          <div className="mt-6 rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
              {chapterTitle(question.chapter)}
            </span>

            <h3 className="mt-5 font-display text-lg font-extrabold leading-relaxed text-navy-900 md:text-xl">
              {question.question}
            </h3>

            <div className="mt-5 space-y-3">
              {question.options.map((option, i) => {
                const isCorrectOption = answered && i === question.correct;
                const isChosenWrong = answered && i === selected && i !== question.correct;
                return (
                  <button
                    key={`${index}-option-${i}`}
                    type="button"
                    onClick={() => choose(i)}
                    disabled={answered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${option}`}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition-all",
                      !answered &&
                        "border-border bg-background/60 text-navy-900 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft",
                      isCorrectOption && "border-emerald-300 bg-emerald-50 text-emerald-800",
                      isChosenWrong && "border-red-300 bg-red-50 text-red-800",
                      answered &&
                        !isCorrectOption &&
                        !isChosenWrong &&
                        "border-border bg-background/40 text-muted-foreground opacity-70"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold",
                        isCorrectOption
                          ? "bg-emerald-600 text-white"
                          : isChosenWrong
                            ? "bg-red-500 text-white"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="pt-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="mt-5 space-y-4">
                <p
                  role="status"
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold",
                    selected === question.correct ? "text-emerald-600" : "text-red-500"
                  )}
                >
                  {selected === question.correct ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Correct!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" /> Incorrect — the correct option is{" "}
                      {String.fromCharCode(65 + question.correct)}.
                    </>
                  )}
                </p>

                <div className="rounded-2xl bg-cyan-50 p-5 ring-1 ring-cyan-100">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-700">
                    <Info className="h-4 w-4" /> Explanation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900">{question.explanation}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
                  >
                    {index + 1 >= questions.length ? "See results" : "Next question"}{" "}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
