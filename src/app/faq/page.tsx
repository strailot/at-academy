import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LifeBuoy, MessageCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FaqAccordion from "@/components/site/FaqAccordion";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { faqGroups, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about ${site.name} courses, enrolment, payments, live classes and support.`,
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Courses, enrolment, payments and live classes — the questions students ask us most, answered plainly."
      >
        <Link href="/contact">
          <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white shadow-glow">
            <MessageCircle className="h-4 w-4" /> Ask a question
          </Button>
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 ring-1 ring-brand-100">
                Browse by topic
              </p>
              <ul className="space-y-3">
                {faqGroups.map((group) => (
                  <li key={group.title} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <p className="font-display text-sm font-bold text-navy-900">{group.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{group.items.length} questions</p>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-5">
                <LifeBuoy className="h-6 w-6 text-brand-500" />
                <p className="mt-3 text-sm font-semibold text-navy-900">Still stuck?</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Write to <a href={`mailto:${site.email}`} className="font-semibold text-brand-600 hover:underline">{site.email}</a>{" "}
                  and our team will reply within one working day.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-12">
            {faqGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 50}>
                <section>
                  <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-extrabold text-navy-900">
                    <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-brand-500 to-cyan-500" />
                    {group.title}
                  </h2>
                  <FaqAccordion items={group.items} />
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <div className="mt-20 rounded-[2rem] bg-navy-950 px-8 py-12 text-center text-white shadow-elevated md:px-16">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">Can&apos;t find your answer?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
              Our team can walk you through courses, batches, fees and how enrolment works — before you commit
              to anything.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 font-semibold text-white">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10">
                  Browse courses
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
