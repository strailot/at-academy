import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Learning",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/chapters", label: "Chapters" },
      { href: "/practice", label: "Practice" },
      { href: "/live-classes", label: "Live Classes" },
      { href: "/teachers", label: "Teachers" },
      { href: "/results", label: "Results" },
    ],
  },
  {
    title: "Chemistry Tools",
    links: [
      { href: "/chemistry/formulas", label: "Formula Library" },
      { href: "/chemistry/equations", label: "Equation Library" },
      { href: "/chemistry/periodic-table", label: "Periodic Table" },
      { href: "/chemistry/balancing", label: "Equation Balancing" },
      { href: "/chemistry/mcq", label: "MCQ Practice" },
      { href: "/chemistry/numericals", label: "Numerical Practice" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/doubts", label: "Doubt solving" },
      { href: "/dashboard", label: "Student dashboard" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/refund", label: "Refund policy" },
    ],
  },
];

const socials = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="container relative z-10 pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo/at-academy-logo.png"
                alt={`${site.name} logo`}
                width={52}
                height={52}
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/15"
              />
              <span className="leading-none">
                <span className="block font-display text-lg font-extrabold">{site.name}</span>
                <span className="mt-1 block text-xs text-white/55">{site.tagline}</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              A focused SSC Chemistry learning platform — chapter-by-chapter lessons, live classes, MCQ &amp;
              CQ practice and board-style exam preparation built around the NCTB syllabus.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-all hover:bg-brand-500 hover:text-white hover:ring-brand-400"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/90">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-14 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3 md:p-8">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-sm text-white/90 hover:text-cyan-300">
                {site.email}
              </a>
              <a href={`mailto:${site.emailAlt}`} className="mt-0.5 block text-sm text-white/60 hover:text-cyan-300">
                {site.emailAlt}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Phone</p>
              <a href={`tel:${site.phone.replace(/\s|-/g, "")}`} className="mt-1 block text-sm text-white/90 hover:text-cyan-300">
                {site.phone}
              </a>
              <p className="mt-0.5 text-xs text-white/50">Sat–Thu, 9:00–20:00 (GMT+6)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Location</p>
              <p className="mt-1 text-sm text-white/90">{site.addressLines[0]}</p>
              <p className="mt-0.5 text-sm text-white/60">{site.addressLines[1]}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.timezoneLabel}</p>
        </div>
      </div>
    </footer>
  );
}
