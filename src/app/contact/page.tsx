import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ContactForm from "@/components/site/ContactForm";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, phone and office hours for course, batch and payment enquiries.`,
};

const channels = [
  {
    icon: Mail,
    title: "Email",
    lines: [site.email, site.emailAlt],
    note: "Reply within one working day",
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    title: "Phone",
    lines: [site.phone, site.phoneAlt],
    note: "Saturday–Thursday, 9:00–20:00 (GMT+6)",
    href: `tel:${site.phone.replace(/\s|-/g, "")}`,
  },
  {
    icon: MapPin,
    title: "Location",
    lines: site.addressLines,
    note: "Online across Bangladesh · Office visits by appointment",
  },
  {
    icon: Clock,
    title: "Support hours",
    lines: ["Sat–Thu: 9:00 – 20:00", "Friday: closed"],
    note: "All times Bangladesh Standard Time",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Contact"
        title="We're here to help"
        description="Questions about which batch is right for you, fees, or how enrolment works? Ask us — we would rather answer now than process a refund later."
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 ring-1 ring-white/10">
          <MessageCircle className="h-4 w-4 text-cyan-300" />
          Typical reply within one working day
        </span>
      </PageHero>

      <main className="container pb-24 pt-14 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((channel) => (
                <div key={channel.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
                      <channel.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-base font-bold text-navy-900">{channel.title}</h2>
                      <div className="mt-1.5 space-y-0.5">
                        {channel.lines.map((line, index) =>
                          channel.href && index === 0 ? (
                            <a key={line} href={channel.href} className="block text-sm font-medium text-foreground/85 hover:text-brand-600">
                              {line}
                            </a>
                          ) : (
                            <p key={line} className="text-sm font-medium text-foreground/85">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{channel.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <ContactForm />
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
