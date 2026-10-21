import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BookOpen, Trophy, Users, Award, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SSC Chemistry Results',
  description: `Verified SSC Chemistry student outcomes — quiz performance, mock test results and improvement stories published by ${site.name}.`,
};

export default async function ResultsPage() {
  let achievements: any[] = [];
  let testimonials: any[] = [];

  try {
    achievements = await prisma.achievement.findMany({
      where: { approved: true },
      include: { user: { select: { name: true } } },
      take: 20,
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error('Error fetching achievements:', e);
  }

  try {
    testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      include: { user: { select: { name: true } } },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
  } catch (e) {
    console.error('Error fetching testimonials:', e);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-grid bg-navy-950 text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur">
            <PartyPopper className="h-7 w-7 text-cyan-300" />
          </span>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
            Verified by administration
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold md:text-4xl lg:text-5xl">
            SSC Chemistry results &amp; achievements
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Every Chemistry result on this page is entered and approved by our administration — no
            rounded-up numbers, no borrowed success stories.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        {/* Achievements Section */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-8 flex items-center gap-3">
            <Award className="w-7 h-7 text-brand-500" />
            Recent Achievements
          </h2>
          {achievements.length === 0 ? (
            <div className="bg-card border border-transparent rounded-xl p-12 text-center">
              <Trophy className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60">
                Student achievements will be displayed here once approved by the administration.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement: any) => (
                <div key={achievement.id} className="bg-card border border-transparent rounded-xl p-6 hover:border-brand-500/20 transition">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-navy-900">{achievement.title}</h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {achievement.user?.name} • {achievement.subject}
                      </p>
                      <p className="text-sm text-foreground/70 mt-2">{achievement.description}</p>
                      <span className="text-xs text-foreground/40 mt-2 block">
                        {new Date(achievement.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-8 flex items-center gap-3">
            <Users className="w-7 h-7 text-brand-500" />
            Student Feedback
          </h2>
          {testimonials.length === 0 ? (
            <div className="bg-card border border-transparent rounded-xl p-12 text-center">
              <Users className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60">
                Student testimonials will be displayed here once approved by the administration.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="bg-card border border-transparent rounded-xl p-6 hover:border-brand-500/20 transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 font-bold">
                      {(testimonial.user?.name || 'S')[0]}
                    </div>
                    <div>
                      <p className="font-bold text-navy-900">{testimonial.user?.name}</p>
                      <p className="text-xs text-foreground/40">{testimonial.course}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Chemistry Performance Overview */}
        <section>
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-8 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-brand-500" />
            Chemistry Performance Overview
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['MCQ', 'CQ', 'Practical', 'Board Model Test'].map((area) => (
              <div key={area} className="bg-card border border-transparent rounded-xl p-6 text-center hover:border-brand-500/20 transition">
                <h3 className="font-display text-lg font-bold text-navy-900 mb-2">{area}</h3>
                <p className="text-sm text-foreground/60">
                  Chapter-test and model-test scores for this area will appear once results are published.
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-foreground/60">
            We publish verified results only. No scores, ranks, or pass rates are shown before they are confirmed by the administration.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}