import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import ValencyTrainer from "@/components/chemistry/ValencyTrainer";

export const metadata: Metadata = {
  title: "SSC Chemistry Valency Practice",
  description:
    "SSC Chemistry valency practice — drill ion and radical valencies with instant feedback, an in-session score and a full valency reference table.",
};

export default function ValencyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Valency practice"
        title="SSC Chemistry Valency Practice"
        description="Valency decides every formula you write in the exam. Drill ions and radicals until recall is instant — type your answer, get feedback on the spot, and keep your session score honest."
      >
        <Link href="/chemistry/periodic-table">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            Open periodic table
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
            eyebrow="Drill"
            title="Type the valency, check instantly"
            description="Each round shows a random ion — type its valency and check. Got it wrong? The feedback tells you the element and its valency, and the reference table below keeps everything one glance away."
          />
        </Reveal>

        <div className="mt-8">
          <ValencyTrainer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
