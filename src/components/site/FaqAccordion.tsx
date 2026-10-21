"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={className}>
      <ul className="space-y-3">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <li
              key={item.q}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-colors data-[open=true]:border-brand-200"
              data-open={isOpen}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-50/60"
                >
                  <span className="font-display text-[15px] font-semibold leading-snug text-navy-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
