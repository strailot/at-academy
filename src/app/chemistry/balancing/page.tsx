import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import BalancingTrainer from "@/components/chemistry/BalancingTrainer";

export const metadata: Metadata = {
  title: "SSC Chemistry Equation Balancing Practice",
  description:
    "SSC Chemistry equation balancing practice — balance real NCTB equations on paper, reveal the solution and hint, and track what you have completed.",
};

export default function BalancingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Balancing practice"
        title="SSC Chemistry Equation Balancing Practice"
        description="Balance it on paper first — that is where the marks are earned. Reveal the balanced equation and hint when you are stuck, then self-mark honestly and watch your progress climb."
      >
        <Link href="/chemistry/equations">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Browse equation library
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
            eyebrow="Attempt → reveal → self-mark"
            title="Eight equations, no shortcuts"
            description="Each exercise shows the unbalanced equation only. Work it out, reveal the solution with its hint, then mark yourself as done or due for review — your progress updates either way."
          />
        </Reveal>

        <div className="mt-8">
          <BalancingTrainer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
