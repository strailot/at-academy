import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import NumericalPractice from "@/components/chemistry/NumericalPractice";

export const metadata: Metadata = {
  title: "SSC Chemistry Numerical Practice",
  description:
    "SSC Chemistry numerical practice — mole concept, gas laws, pH and stoichiometry problems with step-by-step worked solutions and a solved tracker.",
};

export default function NumericalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Numerical practice"
        title="SSC Chemistry Numerical Practice"
        description="Numericals carry the marks most students leave behind. Attempt each problem first, reveal the worked steps only when you need them, and mark what you have genuinely solved."
      >
        <Link href="/chemistry/formulas">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Open formula library
          </Button>
        </Link>
        <Link href="/practice">
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
          >
            Practice centre
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Attempt → reveal → mark"
            title="Worked solutions, one step at a time"
            description="Each problem shows the question first. Reveal the full step-by-step solution when you are ready, compare your working, then toggle it as solved — your solved count only reflects this session."
          />
        </Reveal>

        <div className="mt-8">
          <NumericalPractice />
        </div>
      </main>

      <Footer />
    </div>
  );
}
