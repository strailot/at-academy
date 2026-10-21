"use client";

import { useEffect, useState } from "react";

type ElectronCard = {
  type: "formula" | "ad";
  title: string;
  text: string;
};

/** Cards revealed when an electron is hovered or tapped. */
const electronCards: ElectronCard[] = [
  {
    type: "formula",
    title: "Glucose · C₆H₁₂O₆",
    text: "Molar mass ≈ 180 g/mol — C = 12, H = 1, O = 16",
  },
  {
    type: "ad",
    title: "SSC Chemistry Crash Course",
    text: "20 live revision classes · 12 timed model tests · doubt-solving support",
  },
  {
    type: "formula",
    title: "Electrolysis of water",
    text: "2H₂O → 2H₂ + O₂ — decomposition by passing electric current",
  },
  {
    type: "ad",
    title: "Free chapter-wise MCQs",
    text: "All 12 NCTB chapters — start practising free at /chemistry/mcq",
  },
  {
    type: "formula",
    title: "Blast furnace",
    text: "Fe₂O₃ + 3CO → 2Fe + 3CO₂ — haematite reduced by carbon monoxide",
  },
  {
    type: "formula",
    title: "Combustion of methane",
    text: "CH₄ + 2O₂ → CO₂ + 2H₂O — complete combustion reaction",
  },
];

/** Round to 2dp so the server and client always produce identical strings. */
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Three orbital rings in real 3D. Each ring is a circle of radius R in its own
 * plane.
 *
 * Geometry order matters: the flat circle is first tilted around X (which
 * foreshortens it into an ellipse and gives it depth), then the resulting
 * ellipse is spun around Z to place it on its own axis. Tilting after the spin
 * would only rotate each ellipse inside its own plane and stack all three on
 * top of one another.
 */
const RING_RADIUS = 96;
const ORBITS = [
  { tiltX: 68, spinZ: 0 },
  { tiltX: 68, spinZ: 60 },
  { tiltX: 68, spinZ: 120 },
];

/** Two electrons per ring, kept opposite each other. */
const ELECTRONS_PER_RING = 2;

/** Camera distance for the perspective divide. */
const CAMERA_Z = 620;

/** Point on a ring's circle, tilted around X then spun around Z into world space. */
function ringPoint(orbit: (typeof ORBITS)[number], angle: number, radius = RING_RADIUS) {
  // circle in the ring's own plane
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const z = 0;

  // 1. tilt around X — foreshortens the circle into an ellipse and adds depth
  const tilt = (orbit.tiltX * Math.PI) / 180;
  const yTilted = y * Math.cos(tilt) - z * Math.sin(tilt);
  const zTilted = y * Math.sin(tilt) + z * Math.cos(tilt);

  // 2. spin around Z — places the ellipse on its own axis
  const spin = (orbit.spinZ * Math.PI) / 180;
  const xSpun = x * Math.cos(spin) - yTilted * Math.sin(spin);
  const ySpun = x * Math.sin(spin) + yTilted * Math.cos(spin);

  return { x: xSpun, y: ySpun, z: zTilted };
}

/** Perspective-project a world point onto the SVG viewBox. */
function project(p: { x: number; y: number; z: number }, cx: number, cy: number) {
  const scale = CAMERA_Z / (CAMERA_Z + p.z);
  return { x: cx + p.x * scale, y: cy + p.y * scale, scale };
}

export default function AtomHero() {
  const [active, setActive] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  // Continuous spin: re-render on every animation frame.
  // The first render (tick = 0) matches the server output exactly, so hydration
  // is clean and the animation only starts once the loop is running.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    let raf = 0;
    let started = 0;

    const loop = (now: number) => {
      if (!started) started = now;
      setTick(now - started);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const CX = 150;
  const CY = 150;

  // Ring outlines (static geometry, drawn behind everything).
  const ringPaths = ORBITS.map((orbit, i) => {
    const pts = Array.from({ length: 73 }, (_, s) => {
      const p = project(ringPoint(orbit, (s / 72) * Math.PI * 2), CX, CY);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    });
    return { key: i, points: pts.join(" ") };
  });

  // Electron positions, spun at different rates per ring.
  const electrons = ORBITS.flatMap((orbit, orbitIndex) =>
    Array.from({ length: ELECTRONS_PER_RING }).map((_, slot) => {
      const base = (slot * Math.PI * 2) / ELECTRONS_PER_RING;
      const speed = 0.00045 - orbitIndex * 0.00012;
      const angle = base + tick * speed + orbitIndex * 1.1;
      const world = ringPoint(orbit, angle);
      const p = project(world, CX, CY);

      // depth drives size + brightness so near electrons read as closer
      const depth = (world.z + RING_RADIUS) / (RING_RADIUS * 2); // 0 far → 1 near
      return {
        card: orbitIndex * ELECTRONS_PER_RING + slot,
        x: r2(p.x),
        y: r2(p.y),
        r: r2(3.4 + depth * 4.6),
        opacity: r2(0.45 + depth * 0.55),
        depth,
      };
    })
  );

  // Paint far objects first so near ones overlap correctly.
  const ordered = [...electrons].sort((a, b) => a.depth - b.depth);

  return (
    <div className="relative mx-auto w-full max-w-[26rem] select-none sm:max-w-[32rem] lg:max-w-[38rem] xl:max-w-[42rem]">
      {/* ================= ATOM ================= */}
      <div className="relative aspect-square w-full">
        {/* glow behind the atom */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.28),transparent_64%)] blur-xl" />

        <svg
          viewBox="0 0 300 300"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Animated 3D model of a carbon atom. Six protons and six neutrons form the nucleus at the centre, and six electrons orbit it on three tilted planes."
        >
          <defs>
            <radialGradient id="atom-nucleus" cx="34%" cy="28%" r="78%">
              <stop offset="0%" stopColor="#a5f3fc" />
              <stop offset="26%" stopColor="#38bdf8" />
              <stop offset="56%" stopColor="#1e70e0" />
              <stop offset="82%" stopColor="#063a80" />
              <stop offset="100%" stopColor="#04173f" />
            </radialGradient>
            <radialGradient id="atom-proton" cx="34%" cy="30%" r="76%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="45%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#9f1239" />
            </radialGradient>
            <radialGradient id="atom-neutron" cx="34%" cy="30%" r="76%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="45%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
            <radialGradient id="atom-electron" cx="34%" cy="30%" r="76%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
            <filter id="atom-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* ---- orbital rings, drawn back-to-front ---- */}
          {ringPaths.map((ring) => (
            <polyline
              key={ring.key}
              points={ring.points}
              fill="none"
              stroke="rgba(125,211,252,0.42)"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          ))}

          {/* ---- electrons ---- */}
          {ordered.map((e) => {
            const isActive = active === e.card;
            return (
              <g key={e.card} opacity={e.opacity}>
                {isActive && (
                  <circle
                    cx={e.x}
                    cy={e.y}
                    r={e.r * 3}
                    fill="rgba(34,211,238,0.45)"
                    filter="url(#atom-soft)"
                  />
                )}
                <circle
                  cx={e.x}
                  cy={e.y}
                  r={isActive ? e.r * 1.45 : e.r}
                  fill="url(#atom-electron)"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={isActive ? 1.6 : 0.9}
                />
                {/* generous invisible hit target, so the small electron is easy to hover */}
                <circle
                  cx={e.x}
                  cy={e.y}
                  r={13}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(e.card)}
                  onMouseLeave={() => setActive((cur) => (cur === e.card ? null : cur))}
                  onClick={() => setActive((cur) => (cur === e.card ? null : e.card))}
                  role="button"
                  tabIndex={0}
                  aria-label={`Electron ${e.card + 1}: ${electronCards[e.card].title}`}
                  onFocus={() => setActive(e.card)}
                  onBlur={() => setActive((cur) => (cur === e.card ? null : cur))}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      setActive((cur) => (cur === e.card ? null : e.card));
                    }
                  }}
                />
              </g>
            );
          })}

          {/* ---- nucleus: protons + neutrons in a shaded sphere ---- */}
          <circle cx={CX} cy={CY} r="46" fill="rgba(34,211,238,0.22)" filter="url(#atom-soft)" />
          <circle cx={CX} cy={CY} r="31" fill="url(#atom-nucleus)" />

          {/* nucleon clusters, offset so protons and neutrons interlock */}
          <g>
            <circle cx={CX - 12} cy={CY - 9} r="7.4" fill="url(#atom-proton)" />
            <circle cx={CX + 11} cy={CY - 11} r="7" fill="url(#atom-proton)" />
            <circle cx={CX + 1} cy={CY + 4} r="7.2" fill="url(#atom-proton)" />
            <circle cx={CX - 9} cy={CY + 13} r="6.6" fill="url(#atom-proton)" />
            <circle cx={CX + 13} cy={CY + 9} r="6.4" fill="url(#atom-proton)" />
            <circle cx={CX - 1} cy={CY - 17} r="5.6" fill="url(#atom-proton)" />

            <circle cx={CX + 3} cy={CY - 6} r="6.8" fill="url(#atom-neutron)" />
            <circle cx={CX - 14} cy={CY + 4} r="6.4" fill="url(#atom-neutron)" />
            <circle cx={CX + 14} cy={CY - 1} r="6" fill="url(#atom-neutron)" />
            <circle cx={CX - 5} cy={CY + 20} r="5.4" fill="url(#atom-neutron)" />
            <circle cx={CX + 8} cy={CY + 17} r="5.6" fill="url(#atom-neutron)" />
            <circle cx={CX - 18} cy={CY - 7} r="5.2" fill="url(#atom-neutron)" />
          </g>

          {/* glossy highlight */}
          <ellipse cx={CX - 11} cy={CY - 16} rx="11" ry="7" fill="rgba(255,255,255,0.4)" transform={`rotate(-28 ${CX - 11} ${CY - 16})`} />
          <text
            x={CX}
            y={CY + 4}
            textAnchor="middle"
            className="font-display"
            fontSize="15"
            fontWeight="800"
            fill="#ffffff"
            style={{ paintOrder: "stroke" }}
          >
            C
          </text>
        </svg>
      </div>

      {/* ================= CARD ================= */}
      <div
        className={`relative mx-auto -mt-2 min-h-[7.5rem] w-full max-w-[26rem] overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 sm:max-w-[28rem] lg:mr-0 lg:ml-auto ${
          active !== null
            ? "border-cyan-300/40 bg-navy-900/90 opacity-100 shadow-[0_18px_50px_-18px_rgba(34,211,238,0.5)]"
            : "border-white/10 bg-white/[0.04] opacity-75"
        }`}
        aria-live="polite"
      >
        {active === null ? (
          <div className="flex h-full min-h-[5.5rem] flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
              Interactive carbon atom
            </p>
            <p className="mt-1 text-sm font-semibold text-white/70">
              Hover an orbiting electron to reveal a formula card or a course offer.
            </p>
          </div>
        ) : (
          <>
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                electronCards[active].type === "ad" ? "text-cyan-300" : "text-brand-300"
              }`}
            >
              {electronCards[active].type === "ad" ? "Course offer" : "Formula card"} · Electron{" "}
              {active + 1}
            </p>
            <p className="mt-1.5 font-display text-base font-bold text-white">
              {electronCards[active].title}
            </p>
            <p className="mt-1 text-sm leading-snug text-white/70">{electronCards[active].text}</p>
          </>
        )}
      </div>
    </div>
  );
}
