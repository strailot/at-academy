"use client";

import { useState } from "react";
import { CheckCircle2, Lightbulb, RotateCcw, Undo2 } from "lucide-react";
import { balancingExercises } from "@/lib/chemistry";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Equation balancing drill: attempt on paper, reveal the solution and hint,
 * then self-mark honestly. Progress is session-only state.
 */
export default function BalancingTrainer() {
  const [index, setIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  // "done" | "review" | undefined per exercise index
  const [marks, setMarks] = useState<Record<number, "done" | "review">>({});

  const exercise = balancingExercises[index];
  const completed = Object.keys(marks).length;
  const mark = marks[index];

  function go(next: number) {
    setIndex((next + balancingExercises.length) % balancingExercises.length);
    setShowSolution(false);
  }

  function selfMark(value: "done" | "review") {
    setMarks((m) => ({ ...m, [index]: value }));
    go(index + 1);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Exercise {index + 1} of {balancingExercises.length}
        </span>
        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold text-brand-600 ring-1 ring-border">
          {exercise.chapter}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-foreground/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${(completed / balancingExercises.length) * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {completed} of {balancingExercises.length} completed
      </p>

      <div className="mt-4 rounded-3xl bg-card p-8 text-center shadow-soft">
        <p className="font-mono text-xl font-bold text-navy-900 sm:text-2xl">{exercise.unbalanced}</p>

        {showSolution ? (
          <div className="mt-6 space-y-3">
            <p className="inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-5 py-3 font-mono text-lg font-bold text-brand-600">
              <CheckCircle2 className="h-5 w-5" />
              {exercise.balanced}
            </p>
            <p className="mx-auto flex max-w-md items-start gap-2 text-left text-sm text-muted-foreground">
              <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
              {exercise.hint}
            </p>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Balance it on paper first, then reveal the solution when you are ready to check.
          </p>
        )}

        {mark && (
          <p
            className={cn(
              "mt-4 text-xs font-bold uppercase tracking-[0.14em]",
              mark === "done" ? "text-emerald-600" : "text-amber-600"
            )}
          >
            {mark === "done" ? "Marked as done" : "Marked for review"}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!showSolution ? (
          <Button
            type="button"
            onClick={() => setShowSolution(true)}
            className="rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800"
          >
            <Lightbulb className="h-4 w-4" /> Show solution &amp; hint
          </Button>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => selfMark("done")}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 font-semibold text-white"
            >
              <CheckCircle2 className="h-4 w-4" /> Got it
            </Button>
            <Button
              type="button"
              onClick={() => selfMark("review")}
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 font-semibold text-white"
            >
              <Undo2 className="h-4 w-4" /> Review again
            </Button>
          </>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => go(index - 1)}
          className="rounded-full border-border px-6"
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => go(index + 1)}
          className="rounded-full border-border px-6"
        >
          Next <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
