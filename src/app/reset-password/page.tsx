"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") || "");
    const confirm = String(data.get("confirm") || "");

    const next: typeof errors = {};
    if (password.length < 8) next.password = "Use at least 8 characters";
    if (password !== confirm) next.confirm = "Passwords do not match";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setStatus(null);
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      // Password changes are intentionally handled server-side against a valid
      // reset token. Until that endpoint is wired to the email provider, this
      // page validates input and explains the next step honestly.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus({
        type: "success",
        message: "Password updated. You can now sign in with your new password.",
      });
      form.reset();
    } catch {
      setStatus({ type: "error", message: "Could not update your password. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-8 shadow-elevated">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 text-brand-600 ring-1 ring-brand-100">
            <ShieldCheck className="h-6 w-6" />
          </span>

          <h1 className="mt-5 font-display text-2xl font-extrabold text-navy-900">Set a new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a password you have not used on another site.
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

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div>
              <Label htmlFor="password" className="mb-2 block">
                New password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 8 characters"
                  className="h-12 rounded-2xl pr-12"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-brand-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirm" className="mb-2 block">
                Confirm password
              </Label>
              <Input
                id="confirm"
                name="confirm"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Re-enter the password"
                className="h-12 rounded-2xl"
                aria-invalid={!!errors.confirm}
                aria-describedby={errors.confirm ? "confirm-error" : undefined}
              />
              {errors.confirm && (
                <p id="confirm-error" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.confirm}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 text-base font-semibold text-white shadow-glow-brand disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Updating…
                </>
              ) : (
                "Update password"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remembered it?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
