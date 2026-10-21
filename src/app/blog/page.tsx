import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "SSC Chemistry Blog & Study Guides",
  description:
    "SSC Chemistry study guides — chapter explanations, numerical methods, equation balancing and CQ answer structure for NCTB Class 9–10 students.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Blog · পড়াশোনা"
        title="SSC Chemistry study guides"
        description="Short, practical guides for the chapters that cause the most trouble — written around the NCTB SSC Chemistry syllabus, not around exam shortcuts."
      >
        <Link
          href="/chapters"
          className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          Browse chapter map
        </Link>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-transparent bg-card p-6 shadow-soft transition hover:border-brand-500/20"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 font-semibold text-brand-600">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-navy-900 transition group-hover:text-brand-600">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Read <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/60 p-6">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
            <span>
              Looking for formulas and equations instead? Open the{" "}
              <Link href="/chemistry" className="font-semibold text-brand-600 hover:underline">
                chemistry tools
              </Link>{" "}
              or the{" "}
              <Link href="/chapters" className="font-semibold text-brand-600 hover:underline">
                chapter map
              </Link>
              .
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
