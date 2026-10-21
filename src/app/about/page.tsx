import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Target,
  Users,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { site, teachers } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${site.name} exists — a focused SSC Chemistry learning platform built around concept-first teaching, NCTB alignment and exam-focused preparation.`,
};

const principles = [
  {
    icon: Target,
    title: "One syllabus, fully covered",
    body: "We teach the NCTB SSC Chemistry textbook chapter by chapter rather than selling a bag of loose videos. Students always know where they are in the syllabus and what comes next.",
  },
  {
    icon: FlaskConical,
    title: "Concept-first teaching",
    body: "Every chapter starts from the idea behind the chemistry — then moves to equations, numericals and exam technique. Memorisation is the last step, never the first.",
  },
  {
    icon: Users,
    title: "Small batches, real access",
    body: "Batch sizes are capped so a teacher can answer questions in class instead of talking at a crowd. Doubt-solving continues between classes.",
  },
  {
    icon: BookOpen,
    title: "Plain-language teaching",
    body: "Concepts are explained in clear English with every technical term defined before students meet it in exams and higher study — with Bangla terminology where it helps.",
  },
  {
    icon: GraduationCap,
    title: "Exam technique matters",
    body: "Knowing the material is only half of it. We practise mark-scheme structure for CQ (সৃজনশীল) answers, timing for MCQs, and full exam simulation.",
  },
  {
    icon: Microscope,
    title: "Practicals are not an afterthought",
    body: "Practical preparation is built into the course rather than crammed into the final week.",
  },
];

const faculty = teachers.map((teacher) => ({
  name: teacher.name,
  subject: teacher.specialization,
  institution: teacher.institution,
  qualifications: teacher.qualifications,
  experience: teacher.experience,
  focus: teacher.focus,
  photo: teacher.photo,
  id: teacher.id,
}));

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow={`Since day one · ${site.name}`}
        title="Built to make SSC Chemistry easier"
        description="AT Academy is built to make SSC Chemistry easier to understand, practice, and master — through structured lessons, active practice, and exam-focused preparation."
      />

      <main className="container pb-24 pt-14 md:pt-16">
        {/* Mission */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 ring-1 ring-brand-100">
                Our mission
              </p>
              <h2 className="font-display text-3xl font-extrabold text-navy-900 md:text-4xl">
                One subject, taught properly
              </h2>
              <p className="mt-4 text-muted-foreground">
                Not the loudest marketing — the clearest explanation of the SSC Chemistry syllabus, delivered
                by teachers who know it deeply.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/courses">
                  <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
                    Explore courses <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50">
                    Talk to us
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="space-y-5 rounded-[2rem] border border-border bg-card p-8 shadow-soft md:p-10">
              <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                AT Academy is a Bangladeshi online learning platform built specifically for SSC Chemistry
                candidates. Instead of spreading across every subject, we went deep on the one subject students
                most often need real help with — structured chapter by chapter, from fundamentals to board-style
                exam preparation.
              </p>
              <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                Our vision is straightforward: a student anywhere in Bangladesh, on any phone or laptop, should
                be able to get the same quality of Chemistry teaching that used to be limited to a handful of
                coaching centres in Dhaka.
              </p>
              <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-display text-2xl font-extrabold text-navy-900">NCTB</p>
                  <p className="mt-1 text-xs text-muted-foreground">Aligned syllabus coverage</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-navy-900">English</p>
                  <p className="mt-1 text-xs text-muted-foreground">Clear, plain-language instruction</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-navy-900">Live + VOD</p>
                  <p className="mt-1 text-xs text-muted-foreground">Structure plus flexibility</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Methodology */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="How we teach"
              title="A methodology built for board exams"
              description="Six principles shape every programme we run."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 55} className="h-full">
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-elevated">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Faculty */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Who teaches"
              title="A qualification you can check"
              description="Your class is led by a Chemistry specialist with a postgraduate degree in Chemistry and years of SSC board-exam teaching experience."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {faculty.map((teacher, i) => (
              <Reveal key={teacher.name} delay={i * 70} className="h-full">
                <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <div className="flex items-center gap-4">
                    <span className="relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-cyan-500 font-display text-xl font-extrabold text-white shadow-glow-brand">
                      {teacher.name
                        .split(" ")
                        .map((part) => part.replace(".", "")[0])
                        .slice(0, 2)
                        .join("")}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy-900">{teacher.name}</h3>
                      <p className="mt-0.5 text-sm font-semibold text-brand-600">{teacher.subject}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{teacher.institution}</p>
                    </div>
                  </div>
                  <dl className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Degree</dt>
                      <dd className="text-right font-medium text-navy-900">{teacher.qualifications}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Experience</dt>
                      <dd className="text-right font-medium text-navy-900">{teacher.experience}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{teacher.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact block */}
        <section className="mt-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-brand-gradient-soft p-8 ring-1 ring-brand-100 md:p-12 light-island">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
                  Come and talk to us
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Not sure which batch is right for you? Ask us about the syllabus, the timetable or the fee —
                  we would rather answer before you pay than process a refund later.
                </p>
                <Link href="/contact">
                  <Button className="mt-6 rounded-full bg-navy-900 px-6 font-semibold text-white hover:bg-navy-800">
                    Contact the team <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <ul className="space-y-4 text-sm">
                {[
                  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
                  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s|-/g, "")}` },
                  { icon: MapPin, label: "Location", value: `${site.addressLines[0]}, ${site.addressLines[1]}` },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="mt-0.5 block font-medium text-navy-900 hover:text-brand-600">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-medium text-navy-900">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
