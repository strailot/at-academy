import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import FormulaLibrary from "@/components/chemistry/FormulaLibrary";

export const metadata: Metadata = {
  title: "SSC Chemistry Formula Library",
  description:
    "Searchable SSC Chemistry formula library — mole concept, gas laws, pH, calorimetry and more, filterable by NCTB chapter for board exam revision.",
};

export default function FormulaLibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Formula library"
        title="SSC Chemistry Formula Library"
        description="Every formula you need for the SSC board exam in one place — search by label, expression or note, and filter down to a single chapter when you are revising."
      >
        <Link href="/chemistry/numericals">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Practise with numericals
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
            title="Formulas organised the way you revise"
            description="Each card shows the expression in exam notation, a plain-language note and the chapter it belongs to — so you can revise a whole chapter or hunt down one formula."
          />
        </Reveal>

        <div className="mt-8">
          <FormulaLibrary />
        </div>
      </main>

      <Footer />
    </div>
  );
}
