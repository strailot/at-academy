"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  CalendarRange,
  CreditCard,
  FileCheck2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  ScrollText,
  Settings,
  Users,
  X,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/batches", label: "Batches", icon: CalendarRange },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/enrollments", label: "Enrollments", icon: GraduationCap },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/exams", label: "Exams", icon: FileCheck2 },
  { href: "/admin/content", label: "CMS", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const links = adminNav.map((item) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-cyan-300" : "text-white/40")} />
        {item.label}
        {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden />}
      </Link>
    );
  });

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-y-auto border-r border-white/5 bg-navy-950 p-4 md:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2 pt-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 font-display text-sm font-extrabold text-white">
            AT
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            {site.name}
            <span className="ml-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              Admin
            </span>
          </span>
        </Link>

        <nav className="flex-1 space-y-1" aria-label="Admin navigation">
          {links}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4 text-white/40" />
            Student dashboard
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 backdrop-blur md:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xs font-extrabold text-white">
              AT
            </span>
            <span className="font-display text-sm font-extrabold text-white">
              Admin
              <span className="ml-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                AT
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close admin menu" : "Open admin menu"}
            className="grid h-9 w-9 place-items-center rounded-lg text-white/70 ring-1 ring-white/15 transition hover:bg-white/10 hover:text-white"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <nav
            className="max-h-[70vh] space-y-1 overflow-y-auto border-t border-white/10 px-3 pb-4 pt-3"
            aria-label="Admin navigation"
          >
            {links}
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4 text-white/40" />
              Student dashboard
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
