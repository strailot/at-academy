"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CourseCard from "@/components/site/CourseCard";
import { Button } from "@/components/ui/button";
import { courseTypes, courses, modes, type CourseMode, type CourseType } from "@/lib/site";

type TypeFilter = CourseType | "All";
type ModeFilter = CourseMode | "All";
type PriceFilter = "All" | "Free" | "Paid";
type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function CourseCatalog() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("All");
  const [mode, setMode] = useState<ModeFilter>("All");
  const [price, setPrice] = useState<PriceFilter>("All");
  const [sort, setSort] = useState<SortKey>("popular");

  const hasFilters = query.trim() !== "" || type !== "All" || mode !== "All" || price !== "All";

  const reset = () => {
    setQuery("");
    setType("All");
    setMode("All");
    setPrice("All");
    setSort("popular");
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = courses.filter((course) => {
      if (type !== "All" && course.type !== type) return false;
      if (mode !== "All" && course.mode !== mode) return false;
      if (price === "Free" && course.price > 0) return false;
      if (price === "Paid" && course.price <= 0) return false;
      if (q) {
        const haystack = [course.title, course.subject, course.type, course.instructor, course.summary]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating || b.ratingCount - a.ratingCount;
        case "popular":
        default:
          return b.ratingCount - a.ratingCount;
      }
    });
  }, [query, type, mode, price, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-soft md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search SSC Chemistry courses, chapters or teacher…"
              aria-label="Search courses"
              className="h-12 w-full rounded-2xl border border-input bg-background pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Sort</span>
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort courses"
              className="h-12 rounded-2xl border border-input bg-background px-4 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-3">
          <FilterGroup label="Course type">
            {(["All", ...courseTypes] as TypeFilter[]).map((value) => (
              <Chip key={value} active={type === value} onClick={() => setType(value)}>
                {value}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Learning mode">
            {(["All", ...modes] as ModeFilter[]).map((value) => (
              <Chip key={value} active={mode === value} onClick={() => setMode(value)}>
                {value}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Price">
            {(["All", "Free", "Paid"] as PriceFilter[]).map((value) => (
              <Chip key={value} active={price === value} onClick={() => setPrice(value)}>
                {value}
              </Chip>
            ))}
          </FilterGroup>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Showing <span className="font-bold text-navy-900">{results.length}</span>{" "}
            {results.length === 1 ? "course" : "courses"}
            {hasFilters && <span className="text-muted-foreground"> (filtered from {courses.length})</span>}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={reset} className="rounded-full text-muted-foreground">
              <X className="h-4 w-4" /> Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((course) => (
            <div key={course.slug} className="h-full">
              <CourseCard course={course} className="h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[2rem] border border-dashed border-brand-200 bg-brand-50/40 px-8 py-20 text-center">
          <Search className="mx-auto h-10 w-10 text-brand-300" />
          <h3 className="mt-5 font-display text-xl font-bold text-navy-900">No courses match your filters</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Try a different course type or learning mode, or clear the filters to see every SSC Chemistry programme.
          </p>
          <Button onClick={reset} className="mt-6 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow-soft transition-colors"
          : "rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground/70 transition-colors hover:border-brand-300 hover:text-brand-700"
      }
    >
      {children}
    </button>
  );
}
