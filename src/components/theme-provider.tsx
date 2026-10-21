"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "at-academy:theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Applies the theme class + native colour scheme to the document root. */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start on "light" so the server render and the first client render
  // agree. The real theme is applied in the effect below.
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const sync = (next: Theme) => {
      applyTheme(next);
      setThemeState(next);
    };

    sync(document.documentElement.classList.contains("dark") ? "dark" : "light");

    const readStored = (): Theme | null => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return stored === "light" || stored === "dark" ? stored : null;
      } catch {
        return null;
      }
    };

    // Follow the OS preference until the visitor picks a theme themselves.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (readStored() === null) sync(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onPreferenceChange);

    // Keep tabs in sync.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === "light" || event.newValue === "dark") sync(event.newValue);
    };
    window.addEventListener("storage", onStorage);

    return () => {
      media.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this page load */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
