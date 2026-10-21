"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = { type: "success" | "error"; message: string } | null;

const fieldClass =
  "h-12 rounded-2xl border border-input bg-background px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({ type: "error", message: json.error || "Could not send your message. Please try again." });
        return;
      }

      setStatus({ type: "success", message: json.message || "Your message has been sent." });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "Network error — please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-9">
      <h2 className="font-display text-2xl font-extrabold text-navy-900">Send us a message</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We reply within one working day (Saturday–Thursday, GMT+6).
      </p>

      {status && (
        <div
          role="status"
          className={cn(
            "mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm",
            status.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          )}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          )}
          <span className="leading-relaxed">{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy-900">
              Full name
            </label>
            <Input id="name" name="name" required placeholder="Your name" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy-900">
              Email address
            </label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy-900">
              Phone <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input id="phone" name="phone" type="tel" placeholder="01XXXXXXXXX" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-navy-900">
              Subject
            </label>
            <Input id="subject" name="subject" required placeholder="Course enquiry, fee, batch…" className={fieldClass} />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-navy-900">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="How can we help?"
            className={cn(fieldClass, "h-auto resize-y py-3 leading-relaxed")}
          />
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-base font-semibold text-white shadow-glow-brand transition-transform hover:scale-[1.01] disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send message
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By sending a message you agree to our{" "}
          <a href="/privacy" className="font-semibold text-brand-600 hover:underline">
            privacy policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}
