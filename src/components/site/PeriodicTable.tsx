"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Category =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble";

type Element = {
  z: number;
  sym: string;
  name: string;
  mass: string;
  cat: Category;
  period: number;
  group: number;
};

/** Elements 1–54 (Hydrogen → Xenon) — the span relevant to the SSC syllabus. */
const ELEMENTS: Element[] = [
  ["H", "Hydrogen", "1.008", "nonmetal", 1, 1], ["He", "Helium", "4.003", "noble", 1, 18],
  ["Li", "Lithium", "6.94", "alkali", 2, 1], ["Be", "Beryllium", "9.012", "alkaline", 2, 2],
  ["B", "Boron", "10.81", "metalloid", 2, 13], ["C", "Carbon", "12.011", "nonmetal", 2, 14],
  ["N", "Nitrogen", "14.007", "nonmetal", 2, 15], ["O", "Oxygen", "15.999", "nonmetal", 2, 16],
  ["F", "Fluorine", "18.998", "halogen", 2, 17], ["Ne", "Neon", "20.180", "noble", 2, 18],
  ["Na", "Sodium", "22.990", "alkali", 3, 1], ["Mg", "Magnesium", "24.305", "alkaline", 3, 2],
  ["Al", "Aluminium", "26.982", "post-transition", 3, 13], ["Si", "Silicon", "28.085", "metalloid", 3, 14],
  ["P", "Phosphorus", "30.974", "nonmetal", 3, 15], ["S", "Sulfur", "32.060", "nonmetal", 3, 16],
  ["Cl", "Chlorine", "35.45", "halogen", 3, 17], ["Ar", "Argon", "39.948", "noble", 3, 18],
  ["K", "Potassium", "39.098", "alkali", 4, 1], ["Ca", "Calcium", "40.078", "alkaline", 4, 2],
  ["Sc", "Scandium", "44.956", "transition", 4, 3], ["Ti", "Titanium", "47.867", "transition", 4, 4],
  ["V", "Vanadium", "50.942", "transition", 4, 5], ["Cr", "Chromium", "51.996", "transition", 4, 6],
  ["Mn", "Manganese", "54.938", "transition", 4, 7], ["Fe", "Iron", "55.845", "transition", 4, 8],
  ["Co", "Cobalt", "58.933", "transition", 4, 9], ["Ni", "Nickel", "58.693", "transition", 4, 10],
  ["Cu", "Copper", "63.546", "transition", 4, 11], ["Zn", "Zinc", "65.380", "transition", 4, 12],
  ["Ga", "Gallium", "69.723", "post-transition", 4, 13], ["Ge", "Germanium", "72.630", "metalloid", 4, 14],
  ["As", "Arsenic", "74.922", "metalloid", 4, 15], ["Se", "Selenium", "78.971", "nonmetal", 4, 16],
  ["Br", "Bromine", "79.904", "halogen", 4, 17], ["Kr", "Krypton", "83.798", "noble", 4, 18],
  ["Rb", "Rubidium", "85.468", "alkali", 5, 1], ["Sr", "Strontium", "87.620", "alkaline", 5, 2],
  ["Y", "Yttrium", "88.906", "transition", 5, 3], ["Zr", "Zirconium", "91.224", "transition", 5, 4],
  ["Nb", "Niobium", "92.906", "transition", 5, 5], ["Mo", "Molybdenum", "95.950", "transition", 5, 6],
  ["Tc", "Technetium", "(98)", "transition", 5, 7], ["Ru", "Ruthenium", "101.07", "transition", 5, 8],
  ["Rh", "Rhodium", "102.906", "transition", 5, 9], ["Pd", "Palladium", "106.42", "transition", 5, 10],
  ["Ag", "Silver", "107.868", "transition", 5, 11], ["Cd", "Cadmium", "112.414", "transition", 5, 12],
  ["In", "Indium", "114.818", "post-transition", 5, 13], ["Sn", "Tin", "118.710", "post-transition", 5, 14],
  ["Sb", "Antimony", "121.760", "metalloid", 5, 15], ["Te", "Tellurium", "127.60", "metalloid", 5, 16],
  ["I", "Iodine", "126.904", "halogen", 5, 17], ["Xe", "Xenon", "131.293", "noble", 5, 18],
].map(([sym, name, mass, cat, period, group]) => ({
  z: 0,
  sym: sym as string,
  name: name as string,
  mass: mass as string,
  cat: cat as Category,
  period: period as number,
  group: group as number,
})).map((e, i) => ({ ...e, z: i + 1 }));

const CATEGORY: Record<Category, { label: string; chip: string; box: string; ring: string }> = {
  alkali: { label: "Alkali metal", chip: "bg-cyan-500", box: "bg-cyan-50 text-cyan-800", ring: "ring-cyan-300" },
  alkaline: { label: "Alkaline earth metal", chip: "bg-cyan-400", box: "bg-cyan-50/60 text-cyan-700", ring: "ring-cyan-200" },
  transition: { label: "Transition metal", chip: "bg-brand-500", box: "bg-brand-50 text-brand-700", ring: "ring-brand-200" },
  "post-transition": { label: "Post-transition metal", chip: "bg-brand-600", box: "bg-brand-50/60 text-brand-600", ring: "ring-brand-200" },
  metalloid: { label: "Metalloid", chip: "bg-navy-400", box: "bg-navy-50 text-navy-600", ring: "ring-navy-200" },
  nonmetal: { label: "Non-metal", chip: "bg-brand-700", box: "bg-brand-100/60 text-brand-800", ring: "ring-brand-200" },
  halogen: { label: "Halogen", chip: "bg-cyan-600", box: "bg-cyan-100/60 text-cyan-700", ring: "ring-cyan-300" },
  noble: { label: "Noble gas", chip: "bg-navy-600", box: "bg-navy-100/70 text-navy-700", ring: "ring-navy-200" },
};

function valenceFor(el: Element) {
  if (el.group <= 2) return el.group;
  if (el.group >= 13) return el.group - 10;
  return null;
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState<Element>(ELEMENTS[5]);
  const [filter, setFilter] = useState<Category | "all">("all");

  const categories = useMemo(() => Object.keys(CATEGORY) as Category[], []);

  return (
      <div className="grid gap-8 lg:grid-cols-[1fr_18rem] light-island">
      <div>
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold transition-colors",
              filter === "all" ? "bg-navy-900 text-white" : "bg-white/80 text-navy-800 ring-1 ring-white/20 hover:bg-white"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-navy-800 ring-1 ring-white/20 transition-colors",
                filter === cat ? "bg-white text-navy-950" : "bg-white/70 hover:bg-white"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", CATEGORY[cat].chip)} />
              {CATEGORY[cat].label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto pb-3">
          <div
            className="grid min-w-[46rem] gap-1.5"
            style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}
          >
            {ELEMENTS.map((el) => {
              const dim = filter !== "all" && el.cat !== filter;
              const active = selected.z === el.z;
              return (
                <button
                  key={el.z}
                  type="button"
                  onClick={() => setSelected(el)}
                  aria-pressed={active}
                  style={{ gridColumn: el.group, gridRow: el.period }}
                  className={cn(
                    "group relative flex aspect-square flex-col items-center justify-center rounded-lg border text-center transition-all duration-200",
                    dim ? "opacity-25" : "opacity-100",
                    active
                      ? cn("scale-110 border-transparent text-white shadow-glow", CATEGORY[el.cat].chip)
                      : cn("border-white/20 bg-white/85 hover:scale-105 hover:border-white", CATEGORY[el.cat].box)
                  )}
                >
                  <span className="absolute left-1 top-0.5 text-[8px] font-semibold opacity-60">{el.z}</span>
                  <span className="font-display text-[13px] font-extrabold leading-none">{el.sym}</span>
                  <span className="mt-0.5 hidden text-[8px] font-semibold uppercase tracking-wide opacity-70 sm:block">
                    {el.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
          {categories.map((cat) => (
            <span key={cat} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-navy-800/80">
              <span className={cn("h-2.5 w-2.5 rounded-full", CATEGORY[cat].chip)} />
              {CATEGORY[cat].label}
            </span>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <aside className="h-fit rounded-3xl border border-white/20 bg-white/90 p-6 shadow-elevated backdrop-blur-md">
        <div
          className={cn(
            "mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-2xl text-white shadow-glow",
            CATEGORY[selected.cat].chip
          )}
        >
          <span className="text-xs font-bold opacity-80">{selected.z}</span>
          <span className="font-display text-4xl font-extrabold leading-none">{selected.sym}</span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
            {selected.mass}
          </span>
        </div>

        <h3 className="mt-5 text-center font-display text-xl font-extrabold text-navy-900">{selected.name}</h3>
        <p className="mt-1 text-center text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {CATEGORY[selected.cat].label}
        </p>

        <dl className="mt-5 space-y-3 text-sm">
          {[
            ["Atomic number", `${selected.z}`],
            ["Atomic mass", selected.mass],
            ["Period", `${selected.period}`],
            ["Group", `${selected.group}`],
            ["Valence electrons", valenceFor(selected) ? `${valenceFor(selected)}` : "Variable"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-semibold text-navy-900">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Tip: click any element to inspect it. Use the filters to focus on one family of elements while
          studying periodic trends.
        </p>
      </aside>
    </div>
  );
}
