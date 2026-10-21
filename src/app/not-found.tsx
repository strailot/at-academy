import Link from "next/link";
import { ArrowRight, Compass, Search } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container flex min-h-[70vh] items-center justify-center py-20">
        <div className="max-w-xl text-center">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-glow">
            <Compass className="h-10 w-10" />
          </span>

          <p className="mt-8 font-display text-6xl font-extrabold tracking-tight text-navy-900">404</p>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-navy-900 md:text-3xl">
            This page doesn&apos;t exist
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            The link may be out of date, or the page may have moved. Try the course catalogue or search for
            what you were looking for.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/">
              <Button className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 font-semibold text-white">
                Back home <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" className="rounded-full border-brand-200 px-6 font-semibold text-brand-700 hover:bg-brand-50">
                <Search className="h-4 w-4" /> Browse courses
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
