import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { blogPosts, getBlogPost } from "@/lib/blog";

type BlogPostPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-3xl pb-24 pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <article className="mt-6 rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 font-semibold text-brand-600">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-navy-900 md:text-4xl">
            {post.title}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-foreground/70">{post.intro}</p>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-bold text-navy-900">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-foreground/70">{section.body}</p>
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground/70">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-8 border-t border-border pt-6 leading-relaxed text-foreground/70">
            {post.closing}
          </p>
        </article>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/chemistry/mcq"
            className="rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Practise this chapter
          </Link>
          <Link
            href="/chapters"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy-900"
          >
            Chapter map
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
