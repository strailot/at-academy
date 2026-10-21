"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, HelpCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = { type: "success" | "error"; message: string } | null;

const fieldClass =
  "h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

export default function DoubtComposer({ signedIn }: { signedIn: boolean }) {
  const [status, setStatus] = useState<Status>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/doubts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: data.get("course"),
          chapter: data.get("chapter"),
          question: data.get("question"),
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({ type: "error", message: json.error || "Could not submit your doubt." });
        return;
      }

      setStatus({ type: "success", message: json.message || "Your doubt has been submitted." });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "Network error — please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (!signedIn) {
    return (
      <div className="rounded-[2rem] border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center">
        <HelpCircle className="mx-auto h-10 w-10 text-brand-400" />
        <h2 className="mt-5 font-display text-xl font-bold text-navy-900">Sign in to ask a doubt</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Doubt-solving is tied to your batch so teachers know which syllabus and chapter you are asking about.
          Sign in and the composer will appear here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/login">
            <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
              Sign in
            </Button>
          </a>
          <a href="/register">
            <Button variant="outline" className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-white">
              Create account
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-8">
      <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-navy-900">
        <HelpCircle className="h-5 w-5 text-brand-500" /> Ask a doubt
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        One doubt at a time, as clearly as you can — include the step where you got stuck.
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
            <label htmlFor="course" className="mb-2 block text-sm font-semibold text-navy-900">
              Course
            </label>
            <select id="course" name="course" required defaultValue={courses[0].slug} className={fieldClass}>
              {courses.map((course) => (
                <option key={course.slug} value={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="chapter" className="mb-2 block text-sm font-semibold text-navy-900">
              Chapter <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input id="chapter" name="chapter" placeholder="e.g. Chapter 6 — Mole concept" className={fieldClass} />
          </div>
        </div>

        <div>
          <label htmlFor="question" className="mb-2 block text-sm font-semibold text-navy-900">
            Your doubt
          </label>
          <textarea
            id="question"
            name="question"
            required
            rows={7}
            placeholder="I understand the formula, but when I substitute the values I get a different answer…"
            className={cn(fieldClass, "h-auto resize-y py-3 leading-relaxed")}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Minimum 15 characters. Teachers reply during support hours (Sat–Thu, 9:00–20:00 GMT+6).
          </p>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white shadow-glow-brand disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit doubt
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
