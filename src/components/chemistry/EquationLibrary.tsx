"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { equationLibrary } from "@/lib/chemistry";
import { cn } from "@/lib/utils";

const TYPES = ["All", ...Array.from(new Set(equationLibrary.map((eq) => eq.type)))];

/** Searchable, type-filterable equation cards for the SSC Chemistry equation library. */
export default function EquationLibrary() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return equationLibrary.filter((eq) => {
      if (type !== "All" && eq.type !== type) return false;
      if (!q) return true;
      return (
        eq.reaction.toLowerCase().includes(q) ||
        eq.reactants.toLowerCase().includes(q) ||
        eq.products.toLowerCase().includes(q) ||
        eq.condition.toLowerCase().includes(q) ||
        eq.explanation.toLowerCase().includes(q)
      );
    });
  }, [query, type]);

  const reset = () => {
    setQuery("");
    setType("All");
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
            placeholder="Search by reaction, reactant, product or condition…"
            aria-label="Search equations"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm font-medium text-navy-900 placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter equations by type">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
                type === t
                  ? "bg-navy-900 text-white"
                  : "bg-card text-muted-foreground ring-1 ring-border hover:bg-brand-50 hover:text-brand-700"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-muted-foreground" role="status">
        {results.length} of {equationLibrary.length} equations shown
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-display text-lg font-extrabold text-navy-900">No equations match your search</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Try a different keyword, or reset to browse every reaction in the library.
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
          {results.map((eq) => (
            <article
              key={eq.reaction}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <p className="break-words font-mono text-sm font-bold text-navy-900">{eq.reaction}</p>

              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 font-semibold text-muted-foreground">Reactants</dt>
                  <dd className="text-navy-900">{eq.reactants}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 font-semibold text-muted-foreground">Products</dt>
                  <dd className="text-navy-900">{eq.products}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-700 ring-1 ring-cyan-100">
                  {eq.condition}
                </span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100">
                  {eq.chapter}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">
                  {eq.type}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{eq.explanation}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
