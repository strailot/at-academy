import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/**
 * `metadataBase` must be an absolute URL. `site.url` is already validated and
 * falls back to a usable origin in src/lib/site.ts, so this can no longer
 * throw — the try/catch stays as a last-resort guard so a future change to
 * site.url can never fail the build during page-data collection.
 */
function metadataBase(): URL {
  try {
    return new URL(site.url);
  } catch {
    return new URL("https://at-academy.netlify.app");
  }
}

export const metadata: Metadata = {
  metadataBase: metadataBase(),
  title: {
    default: "SSC Chemistry Course & Online Learning | AT Academy",
    template: `%s · AT Academy`,
  },
  description:
    "Learn SSC Chemistry through structured lessons, chapter-wise practice, live classes, MCQs, CQ preparation, and board-style exams with AT Academy.",
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  keywords: [
    "SSC Chemistry",
    "SSC Chemistry Bangladesh",
    "SSC Chemistry Course",
    "SSC Chemistry Online Course",
    "SSC Chemistry MCQ",
    "SSC Chemistry CQ",
    "SSC Chemistry Model Test",
    "SSC Chemistry NCTB",
    "SSC Chemistry Preparation",
    "SSC Chemistry Chapters",
  ],
  twitter: {
    card: "summary_large_image",
    title: "SSC Chemistry Course & Online Learning | AT Academy",
    description:
      "Structured SSC Chemistry lessons, live classes, MCQ/CQ practice and board-style exam preparation.",
    images: ["/logo/at-academy-logo.png"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "SSC Chemistry Course & Online Learning | AT Academy",
    description:
      "Learn SSC Chemistry through structured lessons, chapter-wise practice, live classes, MCQs, CQ preparation, and board-style exams.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/logo/at-academy-logo.png", width: 1200, height: 630, alt: `${site.name} logo` }],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo/at-academy-logo-330.jpg",
    apple: "/logo/at-academy-logo-330.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#04173F",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

// Applies the stored (or system-preferred) theme before first paint so the
// page never flashes the wrong colours. Kept in sync with ThemeProvider.
const themeBootScript = `(function(){try{var t=localStorage.getItem("at-academy:theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
