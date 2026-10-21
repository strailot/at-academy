"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, FlaskConical, Menu, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/site/theme-toggle";
import { useAuth } from "@/lib/auth-provider";
import { primaryNav, resourcesNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isActive = (href: string) => {
    const current = pathname ?? "/";
    return current === href || (href !== "/" && current.startsWith(href));
  };

  const resourcesActive = resourcesNav.some((item) => isActive(item.href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-brand-100 bg-background/85 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        {/* Brand */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="relative">
            <Image
              src="/logo/at-academy-logo.png"
              alt={`${site.name} logo`}
              width={44}
              height={44}
              priority
              className="h-10 w-10 rounded-xl object-cover shadow-soft ring-1 ring-brand-100 transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-background" />
          </span>
          <span className="block">
            <span className="block font-display text-[17px] font-extrabold leading-none tracking-tight text-navy-900">
              {site.name}
            </span>
            <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600 xl:block">
              SSC Chemistry
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                isActive(item.href) ? "text-brand-600" : "text-foreground/70 hover:text-navy-900"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400" />
              )}
            </Link>
          ))}

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              aria-expanded={resourcesOpen}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                resourcesActive || resourcesOpen ? "text-brand-600" : "text-foreground/70 hover:text-navy-900"
              )}
            >
              <FlaskConical className="h-3.5 w-3.5" />
              Resources
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", resourcesOpen && "rotate-180")} />
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-elevated">
                {resourcesNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setResourcesOpen(false)}
                    className={cn(
                      "block rounded-xl px-3.5 py-2.5 transition-colors",
                      isActive(item.href) ? "bg-brand-50 text-brand-700" : "hover:bg-brand-50/70"
                    )}
                  >
                    <span className="block text-sm font-bold">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/chemistry/mcq"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-brand-50 hover:text-brand-600 md:inline-flex"
            aria-label="Practice MCQs"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          <ThemeToggle />

          {!loading && user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button size="sm" variant="outline" className="rounded-full">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                className="hidden rounded-full text-muted-foreground sm:inline-flex"
                onClick={() => void logout()}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login">
                <Button size="sm" variant="ghost" className="rounded-full font-semibold text-navy-800">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 font-semibold text-white shadow-glow-brand transition-transform hover:scale-[1.03]">
                  Register
                </Button>
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-brand-50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobile">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3 transition-colors",
                isActive("/") ? "bg-brand-50 text-brand-700" : "text-navy-900 hover:bg-brand-50/60"
              )}
            >
              <span className="block text-sm font-bold">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 transition-colors",
                  isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-navy-900 hover:bg-brand-50/60"
                )}
              >
                <span>
                  <span className="block text-sm font-bold">{item.label}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                  )}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}

            <p className="mt-3 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Chemistry tools
            </p>
            {resourcesNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-colors",
                  isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-navy-900 hover:bg-brand-50/60"
                )}
              >
                <span className="text-sm font-semibold">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              {user ? (
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full font-semibold">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full font-semibold">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}>
                    <Button className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 font-semibold text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
