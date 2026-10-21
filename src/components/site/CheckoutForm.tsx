"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertCircle, CheckCircle2, CreditCard, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Method = "bkash" | "nagad" | "card" | "bank";

const methods: { value: Method; label: string; hint: string }[] = [
  { value: "bkash", label: "bKash", hint: "Send the fee, then enter the transaction ID" },
  { value: "nagad", label: "Nagad", hint: "Send the fee, then enter the transaction ID" },
  { value: "card", label: "Card", hint: "Enter the last 4 digits of the card used" },
  { value: "bank", label: "Bank transfer", hint: "Enter the deposit reference" },
];

type Props = {
  courseSlug: string;
  courseTitle: string;
  amount: number;
};

export default function CheckoutForm({ courseSlug, courseTitle, amount }: Props) {
  const [method, setMethod] = useState<Method>("bkash");
  const [reference, setReference] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ orderId: string; amount: number } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (reference.trim().length < 4) {
      setError("Enter the transaction ID or reference (at least 4 characters).");
      return;
    }
    if (!terms) {
      setError("Please accept the terms to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: courseSlug, method, reference, acceptTerms: true }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error || "Could not start checkout. Please try again.");
        return;
      }

      setReceipt({ orderId: json.orderId, amount: json.amount });
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-elevated">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-navy-900">Enrolment requested</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your request for <span className="font-semibold text-navy-900">{courseTitle}</span> has been
          recorded. Access unlocks as soon as our team verifies the payment.
        </p>

        <dl className="mx-auto mt-6 max-w-xs space-y-2 text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <dt className="text-muted-foreground">Reference</dt>
            <dd className="font-mono font-semibold text-navy-900">{receipt.orderId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Amount</dt>
            <dd className="font-semibold text-navy-900">BDT {receipt.amount.toLocaleString("en-BD")}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard">
            <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
              Go to dashboard
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline" className="rounded-full border-brand-200 font-semibold text-brand-700 hover:bg-brand-50">
              Browse more courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-8" noValidate>
      <h2 className="font-display text-xl font-extrabold text-navy-900">Payment details</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Choose a method and send <span className="font-semibold text-navy-900">BDT {amount.toLocaleString("en-BD")}</span> for{" "}
        <span className="font-semibold text-navy-900">{courseTitle}</span>.
      </p>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-navy-900">Payment method</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map((item) => (
            <label
              key={item.value}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 transition-colors",
                method === item.value
                  ? "border-brand-400 bg-brand-50 ring-1 ring-brand-300"
                  : "border-border hover:border-brand-200"
              )}
            >
              <input
                type="radio"
                name="method"
                value={item.value}
                checked={method === item.value}
                onChange={() => setMethod(item.value)}
                className="sr-only"
              />
              <span className="flex items-center gap-2 text-sm font-bold text-navy-900">
                <CreditCard className="h-4 w-4 text-brand-500" />
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="reference" className="mb-2 block text-sm font-semibold text-navy-900">
          {method === "card" ? "Last 4 digits of card" : "Transaction ID / reference"}
        </label>
        <Input
          id="reference"
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder={method === "card" ? "1234" : "e.g. 8N4KQ2LMX7"}
          className="h-12 rounded-2xl"
          aria-invalid={!!error}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {method === "bank"
            ? "Bank details are shared by our team after you submit this form."
            : "You will find this in your payment confirmation SMS or app history."}
        </p>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-foreground/80">
        <input
          type="checkbox"
          checked={terms}
          onChange={(event) => setTerms(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-input accent-brand-600"
        />
        <span>
          I accept the{" "}
          <Link href="/terms" className="font-semibold text-brand-600 hover:underline">
            terms of service
          </Link>{" "}
          and{" "}
          <Link href="/refund" className="font-semibold text-brand-600 hover:underline">
            refund policy
          </Link>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 py-5 text-base font-bold text-white shadow-glow-brand disabled:pointer-events-none disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Processing…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" /> Confirm enrolment · BDT {amount.toLocaleString("en-BD")}
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Payment is verified by our team before course access is granted. No card details are stored on this site.
      </p>
    </form>
  );
}
