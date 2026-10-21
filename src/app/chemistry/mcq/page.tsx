import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import McqTrainer from "@/components/chemistry/McqTrainer";

export const metadata: Metadata = {
  title: "SSC Chemistry MCQ Practice",
  description:
    "SSC Chemistry MCQ practice — chapter-wise multiple-choice questions with instant feedback, answer explanations, running score and accuracy.",
};

export default function McqPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="MCQ practice"
        title="SSC Chemistry MCQ Practice"
        description="One question at a time, instant feedback and an explanation for every answer — filter by chapter and drill until your accuracy stops dropping."
      >
        <Link href="/chemistry">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            All chemistry tools
          </Button>
        </Link>
        <Link href="/exams">
          <Button
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10"
          >
            Full model tests
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <Reveal>
          <SectionHeading
            eyebrow="Drill"
            title="Answer, understand, move on"
            description="Pick a chapter (or the whole bank), choose an option, and read the explanation before the next question. Your score and accuracy reflect only what you answer in this session."
          />
        </Reveal>

        <div className="mt-8">
          <McqTrainer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
