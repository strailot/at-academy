"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { numericalProblems } from "@/lib/chemistry";
import { cn } from "@/lib/utils";

/** Stepper over the SSC numerical problem set with on-demand worked solutions and a solved toggle. */
export default function NumericalPractice() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [solved, setSolved] = useState<Partial<Record<number, boolean>>>({});

  const problem = numericalProblems[index];
  const isSolved = solved[index] === true;
  const solvedCount = Object.values(solved).filter(Boolean).length;

  const goTo = (next: number) => {
    if (next < 0 || next >= numericalProblems.length) return;
    setIndex(next);
    setRevealed(false);
  };

  const toggleSolved = () => setSolved((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
          Problem {index + 1} of {numericalProblems.length}
        </span>
        <span className="text-xs font-bold text-muted-foreground" role="status">
          {solvedCount} of {numericalProblems.length} solved this session
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {problem.chapter}
        </span>
        {isSolved && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" /> Solved
          </span>
        )}
      </div>

      <p className="mt-5 text-base font-semibold leading-relaxed text-navy-900 md:text-lg">{problem.question}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-expanded={revealed}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
        >
          {revealed ? (
            <>
              <EyeOff className="h-4 w-4" /> Hide solution
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" /> Show solution
            </>
          )}
        </button>
        <button
          type="button"
          onClick={toggleSolved}
          aria-pressed={isSolved}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
            isSolved
              ? "bg-navy-900 text-white hover:bg-navy-800"
              : "border border-brand-200 text-brand-700 hover:bg-brand-50"
          )}
        >
          <CheckCircle2 className="h-4 w-4" /> {isSolved ? "Marked as solved" : "Mark as solved"}
        </button>
      </div>

      {revealed && (
        <div className="mt-6 rounded-2xl border border-border bg-background/60 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Step by step</p>
          <ol className="mt-3 space-y-2.5">
            {problem.steps.map((step, i) => (
              <li key={`${index}-step-${i}`} className="flex gap-3 text-sm leading-relaxed text-navy-900">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 font-display text-[11px] font-extrabold text-brand-700 ring-1 ring-brand-100">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-emerald-50 px-5 py-4 ring-1 ring-emerald-200">
            <span className="text-sm font-bold text-emerald-700">Answer</span>
            <span className="break-words font-mono text-lg font-bold text-navy-900">{problem.answer}</span>
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <span className="text-xs font-bold text-muted-foreground" aria-hidden="true">
          {index + 1} / {numericalProblems.length}
        </span>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === numericalProblems.length - 1}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
