"use client";

import { useMemo, useRef, useState } from "react";
import { Check, Eye, RotateCcw } from "lucide-react";
import { valencyTable, type ValencyEntry } from "@/lib/chemistry";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function pickRandom(exclude?: ValencyEntry): ValencyEntry {
  let next = valencyTable[Math.floor(Math.random() * valencyTable.length)];
  while (exclude && next.symbol === exclude.symbol && valencyTable.length > 1) {
    next = valencyTable[Math.floor(Math.random() * valencyTable.length)];
  }
  return next;
}

/**
 * Drill ion and radical valencies: a random ion is shown, the student types
 * the valency, and gets instant feedback. Session-only score, no storage.
 */
export default function ValencyTrainer() {
  const [current, setCurrent] = useState<ValencyEntry>(() => pickRandom());
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalized = value.trim().replace(/^[+]/, "");

  function check() {
    if (!normalized || result) return;
    const isCorrect = normalized === current.valency;
    setResult(isCorrect ? "correct" : "wrong");
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), attempts: s.attempts + 1 }));
  }

  function next() {
    setCurrent(pickRandom(current));
    setValue("");
    setResult(null);
    setShowAnswer(false);
    inputRef.current?.focus();
  }

  const accuracy = useMemo(
    () => (score.attempts ? Math.round((score.correct / score.attempts) * 100) : null),
    [score]
  );

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl bg-card p-7 shadow-soft sm:p-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          What is the valency of
        </p>
        <p className="mt-3 font-display text-5xl font-extrabold text-navy-900">{current.symbol}</p>
        <p className="mt-2 text-sm text-muted-foreground">{current.name}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (result) next();
                else check();
              }
            }}
            placeholder="e.g. 2"
            aria-label="Valency"
            className="h-12 w-28 rounded-xl border border-border bg-background text-center font-display text-lg font-bold text-navy-900 outline-none ring-brand-500/30 transition focus:ring-2"
          />
          {result ? (
            <Button
              type="button"
              onClick={next}
              className="h-12 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white"
            >
              Next ion <RotateCcw className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={check}
              disabled={!normalized}
              className="h-12 rounded-xl bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800 disabled:opacity-40"
            >
              <Check className="h-4 w-4" /> Check
            </Button>
          )}
        </div>

        {result === "correct" && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-600">
            <Check className="h-4 w-4" /> Correct — {current.symbol} has valency {current.valency}.
          </p>
        )}
        {result === "wrong" && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-500/10 px-4 py-2 text-sm font-bold text-rose-600">
            Not quite — {current.name} ({current.symbol}) has valency {current.valency}.
          </p>
        )}
        {!result && showAnswer && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-4 py-2 text-sm font-bold text-brand-600">
            Answer: valency {current.valency} (not counted in your score).
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <span>
            Score:{" "}
            <strong className="text-navy-900">
              {score.correct} · {score.attempts}
            </strong>
            {accuracy !== null && <> · {accuracy}% accuracy</>}
          </span>
          {!result && (
            <button
              type="button"
              onClick={() => setShowAnswer(true)}
              className="inline-flex items-center gap-1.5 font-semibold text-brand-600 hover:text-brand-700"
            >
              <Eye className="h-4 w-4" /> Show answer
            </button>
          )}
        </div>
      </div>

      {/* Reference table */}
      <details className="mt-8 rounded-3xl border border-border bg-card p-6">
        <summary className="cursor-pointer font-display font-bold text-navy-900">
          Full valency reference table ({valencyTable.length} ions &amp; radicals)
        </summary>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {valencyTable.map((entry) => (
            <div
              key={entry.symbol}
              className={cn(
                "flex items-center justify-between rounded-xl bg-background px-4 py-2.5 text-sm"
              )}
            >
              <span>
                <span className="font-semibold text-navy-900">{entry.symbol}</span>{" "}
                <span className="text-muted-foreground">{entry.name}</span>
              </span>
              <span className="font-display font-extrabold text-brand-600">{entry.valency}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
