"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, Sigma } from "lucide-react";
import { formulaLibrary } from "@/lib/chemistry";
import { cn } from "@/lib/utils";

const CHAPTERS = ["All", ...Array.from(new Set(formulaLibrary.map((f) => f.chapter)))];

/** Searchable, chapter-filterable formula cards for the SSC Chemistry formula library. */
export default function FormulaLibrary() {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return formulaLibrary.filter((f) => {
      if (chapter !== "All" && f.chapter !== chapter) return false;
      if (!q) return true;
      return (
        f.label.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.note.toLowerCase().includes(q)
      );
    });
  }, [query, chapter]);

  const reset = () => {
    setQuery("");
    setChapter("All");
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by label, formula or note…"
            aria-label="Search formulas"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm font-medium text-navy-900 placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter formulas by chapter">
          {CHAPTERS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChapter(c)}
              aria-pressed={chapter === c}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
                chapter === c
                  ? "bg-navy-900 text-white"
                  : "bg-card text-muted-foreground ring-1 ring-border hover:bg-brand-50 hover:text-brand-700"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-muted-foreground" role="status">
        {results.length} of {formulaLibrary.length} formulas shown
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-display text-lg font-extrabold text-navy-900">No formulas match your search</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Try a different keyword, or reset to see every formula in the library.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            <RotateCcw className="h-4 w-4" /> Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((f) => (
            <article
              key={`${f.label}-${f.formula}`}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-extrabold text-navy-900">{f.label}</h3>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
                  <Sigma className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-4 break-words rounded-2xl bg-background/70 px-4 py-3 font-mono font-bold text-navy-900 ring-1 ring-border">
                {f.formula}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
              <div className="mt-auto pt-5">
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
                  {f.chapter}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
