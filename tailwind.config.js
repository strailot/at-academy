/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        /* ---------- Semantic tokens (shadcn compatible) ---------- */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        /* ---------- Brand palette derived from the AT Academy logo ---------- */
        /* Primary royal blue — the dominant colour of the logo mark (#0860D0) */
        brand: {
          50: "#EBF3FF",
          100: "#D7E6FF",
          200: "#AFCCFF",
          300: "#7FADFF",
          400: "#4A8FF6",
          500: "#1E70E0",
          600: "#0860D0",
          700: "#0649A8",
          800: "#063A80",
          900: "#052C61",
          950: "#04173F",
        },
        /* Accent cyan — the secondary colour of the logo mark (#0CA8DC) */
        cyan: {
          50: "#E8FAFF",
          100: "#C7F1FC",
          200: "#95E5F8",
          300: "#5DD6F2",
          400: "#38C6EE",
          500: "#0CA8DC",
          600: "#0889BC",
          700: "#0A6E97",
          800: "#0C5878",
          900: "#0E3F56",
          950: "#082938",
        },
        /* Ink navy — the darkest shadow tones of the logo (#04173F) */
        navy: {
          50: "#EEF2F8",
          100: "#D6DFEC",
          200: "#AEBFD9",
          300: "#7E97C0",
          400: "#4F6DA0",
          500: "#2F4C7E",
          600: "#1C3562",
          700: "#0E234A",
          800: "#062159",
          900: "#04173F",
          950: "#020D26",
        },

        /* ---------- Legacy brand aliases (kept so existing pages keep working) ---------- */
        "brand-navy-dark": "#04173F",
        "brand-navy": "#0E234A",
        "brand-academic-blue": "#0860D0",
        "brand-primary-blue": "#1E70E0",
        "brand-cyan": "#0CA8DC",
        "brand-cyan-light": "#38C6EE",
        "brand-white": "#ffffff",
        "brand-surface": "#F1F6FF",
        "brand-surface-light": "#F7FAFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(4, 23, 63, 0.04), 0 8px 24px -8px rgba(4, 23, 63, 0.12)",
        elevated: "0 2px 4px rgba(4, 23, 63, 0.04), 0 24px 48px -16px rgba(4, 23, 63, 0.18)",
        glow: "0 0 0 1px rgba(12, 168, 220, 0.25), 0 18px 48px -12px rgba(12, 168, 220, 0.45)",
        "glow-brand": "0 0 0 1px rgba(8, 96, 208, 0.2), 0 18px 48px -12px rgba(8, 96, 208, 0.45)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.14)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0860D0 0%, #0CA8DC 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #EBF3FF 0%, #E8FAFF 100%)",
        "ink-gradient": "linear-gradient(150deg, #020D26 0%, #04173F 45%, #062159 100%)",
        "grid-fade":
          "linear-gradient(to right, rgba(8,96,208,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,96,208,0.07) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(12,168,220,0.18), transparent 60%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(3deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        shimmer: "shimmer 2.2s infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "spin-slow": "spin-slow 22s linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
