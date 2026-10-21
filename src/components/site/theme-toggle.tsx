"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={
        className ??
        "inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-brand-50 hover:text-brand-600"
      }
    >
      {/* Both icons render identically on the server; CSS picks which one to
          show, so hydration can never mismatch on the theme value. */}
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
    </button>
  );
}
