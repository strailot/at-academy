import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import EquationLibrary from "@/components/chemistry/EquationLibrary";

export const metadata: Metadata = {
  title: "SSC Chemistry Equation Library",
  description:
    "SSC Chemistry equation library — combination, decomposition, displacement, redox and combustion reactions with conditions, types and explanations.",
};

export default function EquationLibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Equation library"
        title="SSC Chemistry Equation Library"
        description="The reactions the board exam keeps coming back to — each one with its reactants, products, condition, reaction type and a short explanation of why it happens."
      >
        <Link href="/chemistry/balancing">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Practise balancing
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
            eyebrow="Search & filter"
            title="Reactions grouped by type"
            description="Filter by reaction type — combination, displacement, combustion, redox — or search for a reactant by name to find the equation you need."
          />
        </Reveal>

        <div className="mt-8">
          <EquationLibrary />
        </div>
      </main>

      <Footer />
    </div>
  );
}
