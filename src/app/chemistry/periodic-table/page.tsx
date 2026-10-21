import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import PeriodicTable from "@/components/site/PeriodicTable";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "SSC Chemistry Periodic Table",
  description:
    "Interactive periodic table for SSC Chemistry — explore elements, groups, periods and periodic trends across elements 1 to 54.",
};

const tips = [
  {
    title: "Group number → valency",
    body: "For main-group elements, the group number gives the valency directly: groups 1–2 match the valency, and for groups 13–17 it is 8 − group number. This is the fastest way to write formulae under time pressure.",
  },
  {
    title: "Period number → shells",
    body: "The period an element sits in equals its number of electron shells. That is why atomic radius grows down a group but shrinks across a period — the same shell feels a stronger pull from the nucleus.",
  },
  {
    title: "The staircase → metals vs non-metals",
    body: "Metalloids sit along the B–Si–Ge–As–Sb–Te staircase. Everything to its left is a metal, everything to its right is a non-metal — a favourite SSC identification question.",
  },
];

export default function PeriodicTablePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Periodic table"
        title="Interactive periodic table"
        description="Explore elements, groups, periods and periodic trends — click any element from hydrogen to xenon and see how its position in the table predicts its behaviour in SSC Chemistry."
      >
        <Link href="/chemistry/valency">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Practise valency
          </Button>
        </Link>
        <Link href="/chemistry">
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
          >
            All chemistry tools
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Explore elements"
            title="Elements 1–54, one click at a time"
            description="Filter by family to isolate alkali metals, halogens or noble gases, then click any element for its atomic number, mass, group, period and valence electrons."
          />
        </Reveal>

        <div className="mt-8">
          <PeriodicTable />
        </div>

        {/* How to use this for SSC */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="How to use this for SSC"
              title="Three ways the table earns marks"
              description="Position in the periodic table is not trivia — it answers valency, structure and property-trend questions directly."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 55} className="h-full">
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-extrabold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
