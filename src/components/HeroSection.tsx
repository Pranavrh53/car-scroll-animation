"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────── */
const headlineText = "WELCOME  ITZFIZZ";

const stats = [
  { value: 58, suffix: "%", label: "Mission success rate", icon: "🛰️" },
  { value: 23, suffix: "%", label: "Fuel efficiency gain", icon: "⛽" },
  { value: 27, suffix: "%", label: "Orbit accuracy boost", icon: "🎯" },
  { value: 40, suffix: "%", label: "Payload optimization", icon: "📦" },
];

/* ── Seeded PRNG (avoids hydration mismatch) ──────── */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const starRng = seededRandom(42);
const STAR_DATA = Array.from({ length: 100 }, () => ({
  size: 1 + starRng() * 2.5,
  left: starRng() * 100,
  top: starRng() * 100,
  opacity: 0.1 + starRng() * 0.6,
}));

const smokeRng = seededRandom(99);
const SMOKE_PARTICLES = Array.from({ length: 18 }, () => ({
  size: 6 + smokeRng() * 20,
  x: -40 + smokeRng() * 80,
  y: smokeRng() * 60,
  opacity: 0.04 + smokeRng() * 0.08,
  duration: 2 + smokeRng() * 3,
  delay: smokeRng() * 2,
}));

/* ── Stars background ─────────────────────────────── */
function Starfield() {
  return (
    <div className="starfield pointer-events-none absolute inset-0 overflow-hidden">
      {STAR_DATA.map((star, i) => (
        <div
          key={`s-${i}`}
          className="star absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
          }}
        />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`sh-${i}`}
          className="shooting-star absolute"
          style={{
            left: `${15 + i * 30}%`,
            top: `${8 + i * 18}%`,
            width: "100px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #fff 40%, transparent)",
            opacity: 0,
            transform: "rotate(-35deg)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Realistic Rocket SVG ─────────────────────────── */
function RocketSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 520"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 20px rgba(180,200,255,0.15))" }}
    >
      <defs>
        {/* Body metallic gradient */}
        <linearGradient id="bodyMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8bcc8" />
          <stop offset="20%" stopColor="#e8eaf0" />
          <stop offset="40%" stopColor="#f8f9fc" />
          <stop offset="55%" stopColor="#e0e2ea" />
          <stop offset="80%" stopColor="#c0c4d0" />
          <stop offset="100%" stopColor="#9a9eb0" />
        </linearGradient>
        {/* Nose cone gradient */}
        <linearGradient id="noseCone" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c8c8d0" />
          <stop offset="30%" stopColor="#e8e8f0" />
          <stop offset="60%" stopColor="#dddde8" />
          <stop offset="100%" stopColor="#a8a8b8" />
        </linearGradient>
        {/* Nose tip heat gradient */}
        <linearGradient id="noseTip" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff6644" />
          <stop offset="40%" stopColor="#cc4433" />
          <stop offset="100%" stopColor="#882222" />
        </linearGradient>
        {/* Dark band */}
        <linearGradient id="darkBand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2a3a" />
          <stop offset="50%" stopColor="#3a3a4a" />
          <stop offset="100%" stopColor="#222233" />
        </linearGradient>
        {/* Engine bell gradient */}
        <linearGradient id="engineBell" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#555566" />
          <stop offset="30%" stopColor="#888899" />
          <stop offset="70%" stopColor="#777788" />
          <stop offset="100%" stopColor="#444455" />
        </linearGradient>
        {/* Fin gradient */}
        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8d8e0" />
          <stop offset="100%" stopColor="#888898" />
        </linearGradient>
        {/* Window reflection */}
        <radialGradient id="windowReflect" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#66ddff" />
          <stop offset="50%" stopColor="#0088bb" />
          <stop offset="100%" stopColor="#003355" />
        </radialGradient>
      </defs>

      {/* === NOSE CONE === */}
      <path d="M 100 8 Q 100 8 92 40 L 108 40 Z" fill="url(#noseTip)" />
      <path d="M 92 40 Q 85 65 78 100 L 122 100 Q 115 65 108 40 Z" fill="url(#noseCone)" />
      <rect x="76" y="98" width="48" height="6" rx="1" fill="#555568" />

      {/* === MAIN BODY === */}
      <rect x="76" y="104" width="48" height="240" fill="url(#bodyMetal)" />

      {/* Panel lines */}
      <line x1="76" y1="140" x2="124" y2="140" stroke="#a0a0b0" strokeWidth="0.5" opacity="0.4" />
      <line x1="76" y1="180" x2="124" y2="180" stroke="#a0a0b0" strokeWidth="0.5" opacity="0.4" />
      <line x1="76" y1="220" x2="124" y2="220" stroke="#a0a0b0" strokeWidth="0.5" opacity="0.4" />
      <line x1="76" y1="260" x2="124" y2="260" stroke="#a0a0b0" strokeWidth="0.5" opacity="0.4" />
      <line x1="76" y1="300" x2="124" y2="300" stroke="#a0a0b0" strokeWidth="0.5" opacity="0.4" />
      <line x1="100" y1="104" x2="100" y2="344" stroke="#b0b0c0" strokeWidth="0.3" opacity="0.3" />

      {/* === VIEWPORT WINDOW === */}
      <ellipse cx="100" cy="155" rx="11" ry="13" fill="#1a2a3a" stroke="#667" strokeWidth="2.5" />
      <ellipse cx="100" cy="155" rx="8" ry="10" fill="url(#windowReflect)" />
      <ellipse cx="96" cy="150" rx="3" ry="4" fill="rgba(255,255,255,0.25)" />

      {/* === MARKING BAND === */}
      <rect x="76" y="195" width="48" height="30" fill="url(#darkBand)" />
      <text x="100" y="214" fill="#00ccff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace" letterSpacing="2" opacity="0.9">ITZFIZZ</text>

      {/* === SECOND VIEWPORT === */}
      <circle cx="100" cy="248" r="6" fill="#1a2a3a" stroke="#667" strokeWidth="2" />
      <circle cx="100" cy="248" r="4" fill="url(#windowReflect)" opacity="0.7" />

      {/* === INTER-STAGE === */}
      <rect x="74" y="340" width="52" height="8" rx="1" fill="#444458" />
      <rect x="74" y="342" width="52" height="2" fill="#555570" />

      {/* === LOWER BODY === */}
      <path d="M 76 348 L 72 400 L 128 400 L 124 348 Z" fill="url(#bodyMetal)" />
      <line x1="74" y1="370" x2="126" y2="370" stroke="#888898" strokeWidth="0.5" opacity="0.5" />
      <rect x="78" y="355" width="2" height="40" rx="1" fill="#666678" />
      <rect x="120" y="355" width="2" height="40" rx="1" fill="#666678" />
      <rect x="90" y="360" width="1.5" height="35" rx="0.75" fill="#555568" />
      <rect x="108" y="360" width="1.5" height="35" rx="0.75" fill="#555568" />

      {/* === FINS === */}
      <path d="M 76 310 L 36 410 L 40 415 L 76 380 Z" fill="url(#finGrad)" stroke="#9999aa" strokeWidth="0.5" />
      <path d="M 76 310 L 56 360 L 76 350 Z" fill="rgba(255,255,255,0.05)" />
      <path d="M 124 310 L 164 410 L 160 415 L 124 380 Z" fill="url(#finGrad)" stroke="#9999aa" strokeWidth="0.5" />
      <path d="M 124 310 L 144 360 L 124 350 Z" fill="rgba(255,255,255,0.05)" />
      <path d="M 36 410 L 40 415 L 38 418 L 34 413 Z" fill="#cc3344" />
      <path d="M 164 410 L 160 415 L 162 418 L 166 413 Z" fill="#cc3344" />
      <path d="M 95 395 L 100 425 L 105 395 Z" fill="#999aaa" stroke="#888898" strokeWidth="0.5" />

      {/* === ENGINE BELLS === */}
      <path d="M 90 400 Q 88 420 84 440 L 116 440 Q 112 420 110 400 Z" fill="url(#engineBell)" />
      <ellipse cx="100" cy="440" rx="16" ry="5" fill="#3a3a4a" />
      <ellipse cx="100" cy="440" rx="12" ry="3.5" fill="#222233" />
      <ellipse cx="100" cy="438" rx="9" ry="2.5" fill="#443322" opacity="0.6" />
      <path d="M 80 400 Q 78 412 76 425 L 88 425 Q 87 412 86 400 Z" fill="url(#engineBell)" opacity="0.8" />
      <ellipse cx="82" cy="425" rx="6" ry="2" fill="#3a3a4a" />
      <path d="M 114 400 Q 113 412 112 425 L 124 425 Q 122 412 120 400 Z" fill="url(#engineBell)" opacity="0.8" />
      <ellipse cx="118" cy="425" rx="6" ry="2" fill="#3a3a4a" />

      {/* === SURFACE DETAILS (rivets) === */}
      {[130, 170, 210, 250, 290, 330].map((y) => (
        <g key={y}>
          <circle cx="79" cy={y} r="1" fill="#a0a0b0" opacity="0.3" />
          <circle cx="121" cy={y} r="1" fill="#a0a0b0" opacity="0.3" />
        </g>
      ))}

      {/* Antenna */}
      <line x1="100" y1="8" x2="100" y2="0" stroke="#888" strokeWidth="1" />
      <circle cx="100" cy="0" r="1.5" fill="#cc3344" />

      {/* Highlight reflection */}
      <rect x="78" y="110" width="6" height="220" rx="3" fill="rgba(255,255,255,0.06)" />
    </svg>
  );
}

/* ── Thrust Gauge ─────────────────────────────────── */
function ThrustGauge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="thrustGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="50%" stopColor="#7b2ff7" />
          <stop offset="100%" stopColor="#ff4466" />
        </linearGradient>
        <filter id="gaugeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#151530" strokeWidth="10" strokeLinecap="round" />
      <path
        id="thrustArc"
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="url(#thrustGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        filter="url(#gaugeGlow)"
        strokeDasharray="251"
        strokeDashoffset="251"
      />
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = -180 + i * 22.5;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 65 * Math.cos(rad);
        const y1 = 100 + 65 * Math.sin(rad);
        const x2 = 100 + 72 * Math.cos(rad);
        const y2 = 100 + 72 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334" strokeWidth="1.5" />;
      })}
      <g id="thrustNeedle" style={{ transformOrigin: "100px 100px" }}>
        <line x1="100" y1="100" x2="35" y2="100" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" filter="url(#gaugeGlow)" />
        <circle cx="100" cy="100" r="6" fill="#00e5ff" filter="url(#gaugeGlow)" />
        <circle cx="100" cy="100" r="3" fill="#050515" />
      </g>
      <text id="thrustValue" x="100" y="82" fill="#fff" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="monospace">0</text>
      <text x="100" y="96" fill="#556" fontSize="8" textAnchor="middle" letterSpacing="2">THRUST %</text>
    </svg>
  );
}

/* ── Mini space gauge ─────────────────────────────── */
function MiniSpaceGauge({ color, id }: { color: string; id: string }) {
  return (
    <svg viewBox="0 0 60 36" className="w-[50px] sm:w-[60px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`mg-${id}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M 6 32 A 24 24 0 0 1 54 32" fill="none" stroke="#151530" strokeWidth="4" strokeLinecap="round" />
      <path
        id={`miniArc-${id}`}
        d="M 6 32 A 24 24 0 0 1 54 32"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        filter={`url(#mg-${id})`}
        strokeDasharray="75"
        strokeDashoffset="75"
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   Main HeroSection
   ══════════════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const exhaustRef = useRef<HTMLDivElement>(null);
  const smokeTextRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const altitudeRef = useRef<HTMLDivElement>(null);
  const smokeCloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rocket = rocketRef.current;
    const exhaust = exhaustRef.current;
    const smokeText = smokeTextRef.current;
    const gauge = gaugeRef.current;
    const statsContainer = statsRef.current;
    const altitude = altitudeRef.current;
    const smokeCloud = smokeCloudRef.current;

    if (!section || !track || !rocket || !exhaust || !smokeText || !gauge || !statsContainer || !altitude || !smokeCloud) return;

    const smokeLetters = smokeText.querySelectorAll<HTMLSpanElement>(".smoke-letter");
    const statCards = statsContainer.querySelectorAll<HTMLDivElement>(".stat-card");
    const shootingStars = section.querySelectorAll<HTMLDivElement>(".shooting-star");
    const stars = section.querySelectorAll<HTMLDivElement>(".star");
    const smokeParticles = smokeCloud.querySelectorAll<HTMLDivElement>(".smoke-p");

    const thrustArc = section.querySelector("#thrustArc") as SVGPathElement | null;
    const thrustNeedle = section.querySelector("#thrustNeedle") as SVGGElement | null;
    const thrustValue = section.querySelector("#thrustValue") as SVGTextElement | null;

    const ctx = gsap.context(() => {
      /* ═══ INTRO ANIMATIONS ═══ */

      // Rocket entrance
      gsap.set(rocket, { y: 300, opacity: 0, scale: 0.4 });
      gsap.to(rocket, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Exhaust flickers in
      gsap.set(exhaust, { opacity: 0, scaleY: 0 });
      gsap.to(exhaust, {
        opacity: 1,
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        delay: 1.2,
      });

      // Smoke cloud particles drift in
      gsap.set(smokeParticles, { opacity: 0, scale: 0 });
      gsap.to(smokeParticles, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.06,
        delay: 1.4,
      });

      // Gauge fades in
      gsap.set(gauge, { opacity: 0, y: 40 });
      gsap.to(gauge, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.6,
      });

      // Stats stagger in
      gsap.set(statCards, { opacity: 0, y: 30, scale: 0.85 });
      gsap.to(statCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        delay: 1.8,
      });

      // Altitude display
      gsap.set(altitude, { opacity: 0, x: -30 });
      gsap.to(altitude, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 1.5,
      });

      // Shooting stars loop
      shootingStars.forEach((star, i) => {
        gsap.to(star, {
          x: 200,
          opacity: 0.8,
          duration: 0.6,
          ease: "power1.in",
          delay: 3 + i * 4,
          repeat: -1,
          repeatDelay: 6 + i * 2,
        });
      });

      // Twinkling stars (deterministic per-index)
      stars.forEach((star, idx) => {
        gsap.to(star, {
          opacity: 0.1 + (idx % 5) * 0.08,
          duration: 1.2 + (idx % 4) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (idx % 7) * 0.3,
        });
      });

      /* ═══ SCROLL-BASED ANIMATIONS ═══ */

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: track,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          scrub: 3,
        },
      });

      /* ── Phase 1 (0→0.3): Rocket launches, smoke text materialises from exhaust ── */

      // Thrust gauge fills
      const thrustObj = { val: 0 };
      tl.to(thrustObj, {
        val: 100,
        duration: 0.35,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(thrustObj.val);
          if (thrustValue) thrustValue.textContent = String(v);
          const rotation = -180 + (v / 100) * 180;
          if (thrustNeedle) thrustNeedle.style.transform = `rotate(${rotation}deg)`;
          const offset = 251 - (v / 100) * 251;
          if (thrustArc) thrustArc.style.strokeDashoffset = String(offset);
        },
      }, 0);

      // Rocket rises
      tl.to(rocket, {
        y: -80,
        scale: 1.05,
        duration: 0.35,
        ease: "power3.out",
      }, 0);

      // Exhaust grows
      tl.to(exhaust, {
        scaleY: 2.5,
        scaleX: 1.4,
        duration: 0.35,
        ease: "power1.inOut",
      }, 0);

      // Smoke cloud intensifies
      tl.to(smokeParticles, {
        scale: 1.8,
        opacity: 0.12,
        y: 15,
        duration: 0.3,
        stagger: 0.01,
        ease: "power1.out",
      }, 0.05);

      // Smoke letters materialise one-by-one from the exhaust smoke
      smokeLetters.forEach((letter, i) => {
        const t = 0.05 + i * 0.014;
        tl.to(letter, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.08,
          ease: "power3.out",
        }, t);
      });

      // Mini gauge arcs fill
      stats.forEach((stat, i) => {
        tl.to(`#miniArc-${i}`, {
          strokeDashoffset: 75 - (stat.value / 100) * 75,
          duration: 0.2,
          ease: "power2.out",
        }, 0.1 + i * 0.05);
      });

      // Stat card number counters
      statCards.forEach((card, i) => {
        const numEl = card.querySelector(".stat-num");
        if (!numEl) return;
        const obj = { val: 0 };
        tl.to(obj, {
          val: stats[i].value,
          duration: 0.25,
          ease: "power1.out",
          onUpdate: () => {
            numEl.textContent = Math.round(obj.val) + stats[i].suffix;
          },
        }, 0.12 + i * 0.05);
      });

      // Altitude counter
      const altObj = { val: 0 };
      tl.to(altObj, {
        val: 42000,
        duration: 0.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const altEl = altitude.querySelector(".alt-value");
          if (altEl) altEl.textContent = Math.round(altObj.val).toLocaleString();
        },
      }, 0);

      /* ── Phase 2 (0.3→0.6): Rocket accelerates, text drifts like dissipating smoke ── */

      smokeLetters.forEach((letter, i) => {
        tl.to(letter, {
          opacity: 0.3,
          y: 10 + (i % 4) * 5,
          x: -4 + (i % 5) * 2.5,
          filter: "blur(4px)",
          duration: 0.25,
          ease: "sine.inOut",
        }, 0.33 + i * 0.005);
      });

      // Smoke cloud expands and fades
      tl.to(smokeParticles, {
        scale: 3,
        opacity: 0.03,
        y: 40,
        duration: 0.25,
        stagger: 0.008,
        ease: "power1.in",
      }, 0.35);

      // Rocket tilts and accelerates
      tl.to(rocket, {
        y: -200,
        x: 20,
        rotation: -6,
        scale: 1.12,
        duration: 0.32,
        ease: "circ.inOut",
      }, 0.3);

      // Exhaust intensifies
      tl.to(exhaust, {
        scaleY: 4,
        scaleX: 1.8,
        opacity: 0.9,
        duration: 0.3,
        ease: "power1.in",
      }, 0.3);

      /* ── Phase 3 (0.6→1.0): Rocket blasts off, everything fades ── */

      tl.to(rocket, {
        y: -900,
        x: 40,
        scale: 0.2,
        opacity: 0,
        rotation: -12,
        duration: 0.38,
        ease: "expo.in",
      }, 0.6);

      tl.to(exhaust, {
        y: -700,
        opacity: 0,
        scaleY: 8,
        duration: 0.3,
        ease: "power2.in",
      }, 0.62);

      smokeLetters.forEach((letter, i) => {
        tl.to(letter, {
          opacity: 0,
          y: 40 + (i % 4) * 12,
          x: -10 + (i % 6) * 5,
          filter: "blur(14px)",
          scale: 1.5,
          duration: 0.2,
          ease: "circ.in",
        }, 0.6 + i * 0.004);
      });

      tl.to(smokeParticles, {
        opacity: 0,
        scale: 5,
        duration: 0.15,
        stagger: 0.005,
      }, 0.6);

      tl.to(gauge, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
      }, 0.7);

      tl.to(statCards, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        duration: 0.15,
        ease: "power2.in",
      }, 0.72);

      tl.to(altitude, {
        opacity: 0,
        x: -40,
        duration: 0.2,
        ease: "power2.in",
      }, 0.75);

    }, section);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ── Render ── */
  const smokeLetters = headlineText.split("").map((char, i) => (
    <span
      key={i}
      className="smoke-letter inline-block"
      style={{
        opacity: 0,
        transform: "translateY(25px) scale(0.4)",
        filter: "blur(8px)",
        color: "rgba(200,220,255,0.9)",
        textShadow:
          "0 0 20px rgba(180,200,255,0.3), 0 0 40px rgba(120,160,255,0.15), 0 0 60px rgba(80,120,200,0.1)",
        willChange: "transform, opacity, filter",
        minWidth: char === " " ? "0.35em" : undefined,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  const statColors = ["#00e5ff", "#7b2ff7", "#ff4466", "#ffb830"];

  return (
    <section
      ref={sectionRef}
      className="hero-section relative"
      style={{ height: "500vh", background: "#050510" }}
    >
      <div
        ref={trackRef}
        className="relative flex h-screen w-full flex-col items-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, #0a0a30 0%, #050510 50%, #020208 100%)",
        }}
      >
        {/* Stars */}
        <Starfield />

        {/* Nebula glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[5%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#1a0a40]/30 blur-[150px]" />
          <div className="absolute right-[5%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#001a3a]/40 blur-[120px]" />
          <div className="absolute bottom-[15%] left-[30%] h-[350px] w-[350px] rounded-full bg-[#0a0030]/25 blur-[130px]" />
        </div>

        {/* ── Altitude Display (left side) ── */}
        <div
          ref={altitudeRef}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 sm:left-8"
        >
          <div className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-4 backdrop-blur-sm sm:px-4">
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-cyan-400/60 sm:text-[10px]">
              Altitude
            </span>
            <span
              className="alt-value font-mono text-xl font-bold text-white sm:text-2xl"
              style={{ textShadow: "0 0 15px rgba(0,229,255,0.3)" }}
            >
              0
            </span>
            <span className="text-[8px] uppercase tracking-wider text-gray-500">KM</span>
            <div className="mt-2 h-24 w-[2px] rounded-full bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent sm:h-32" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-purple-400/60 sm:text-[10px]">
              Velocity
            </span>
            <span
              className="font-mono text-sm font-bold text-white sm:text-lg"
              style={{ textShadow: "0 0 15px rgba(123,47,247,0.3)" }}
            >
              MACH 3
            </span>
          </div>
        </div>

        {/* ═══ ROCKET + EXHAUST + SMOKE CLOUD + TEXT (vertically stacked, positioned upper-center) ═══ */}
        <div className="relative z-10 flex flex-col items-center" style={{ marginTop: "6vh" }}>
          {/* Rocket */}
          <div
            ref={rocketRef}
            className="relative"
            style={{ willChange: "transform, opacity" }}
          >
            <RocketSVG className="w-[55px] sm:w-[68px] md:w-[82px] lg:w-[95px]" />
          </div>

          {/* Exhaust / Flame (directly below rocket nozzles) */}
          <div
            ref={exhaustRef}
            className="relative -mt-3 flex flex-col items-center"
            style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
          >
            {/* Core flame */}
            <div
              className="rounded-b-full"
              style={{
                width: "14px",
                height: "50px",
                background:
                  "linear-gradient(to bottom, #fff 0%, #ffe080 15%, #ff8844 35%, #ff4466 55%, #7b2ff7 75%, transparent 100%)",
                filter: "blur(2px)",
                animation: "flicker 0.12s ease-in-out infinite alternate",
              }}
            />
            {/* Mid flame */}
            <div
              className="absolute -top-1 rounded-b-full"
              style={{
                width: "28px",
                height: "65px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,200,100,0.4) 20%, rgba(255,100,50,0.2) 50%, transparent 100%)",
                filter: "blur(5px)",
                animation: "flicker 0.18s ease-in-out infinite alternate-reverse",
              }}
            />
            {/* Outer glow */}
            <div
              className="absolute -top-3 rounded-b-full"
              style={{
                width: "50px",
                height: "80px",
                background:
                  "radial-gradient(ellipse at center top, rgba(255,180,80,0.3) 0%, rgba(255,80,40,0.15) 30%, rgba(123,47,247,0.08) 60%, transparent 80%)",
                filter: "blur(10px)",
                animation: "flicker 0.25s ease-in-out infinite alternate",
              }}
            />
          </div>

          {/* Smoke cloud (particles that text emerges from) */}
          <div
            ref={smokeCloudRef}
            className="pointer-events-none relative -mt-2 flex items-center justify-center"
            style={{ width: "300px", height: "50px" }}
          >
            {SMOKE_PARTICLES.map((p, i) => (
              <div
                key={`sp-${i}`}
                className="smoke-p absolute rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `calc(50% + ${p.x}px)`,
                  top: `${p.y}px`,
                  background:
                    "radial-gradient(circle, rgba(180,200,240,0.12) 0%, rgba(140,160,220,0.04) 50%, transparent 70%)",
                  filter: "blur(4px)",
                  opacity: p.opacity,
                  animation: `smokeDrift ${p.duration}s ease-out ${p.delay}s infinite`,
                  willChange: "transform, opacity",
                }}
              />
            ))}
          </div>

          {/* ── Smoke Trail Text = "WELCOME  ITZFIZZ" ── */}
          <div ref={smokeTextRef} className="relative z-10 mt-1 text-center">
            <h1 className="text-xl font-extrabold tracking-[0.3em] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              {smokeLetters}
            </h1>
            <p
              className="mt-2 text-[9px] font-medium uppercase tracking-[0.3em] text-gray-500 sm:text-xs"
              style={{ opacity: 0.5 }}
            >
              Launching into the cosmos
            </p>
          </div>
        </div>

        {/* ── Thrust Gauge (bottom area, clear of text) ── */}
        <div
          ref={gaugeRef}
          className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 sm:bottom-28"
          style={{ willChange: "transform, opacity" }}
        >
          <ThrustGauge className="w-[140px] sm:w-[170px] md:w-[200px]" />
        </div>

        {/* ── Stats Grid (very bottom) ── */}
        <div
          ref={statsRef}
          className="absolute bottom-3 left-1/2 z-10 grid w-full max-w-3xl -translate-x-1/2 grid-cols-4 gap-2 px-3 sm:bottom-5 sm:gap-3 sm:px-6"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card group flex flex-col items-center rounded-lg border border-white/5 bg-white/[0.02] p-2 backdrop-blur-sm sm:p-3"
              style={{ willChange: "transform, opacity" }}
            >
              <MiniSpaceGauge color={statColors[idx]} id={String(idx)} />
              <span className="mt-1 text-sm">{stat.icon}</span>
              <span
                className="stat-num font-mono text-base font-bold sm:text-lg"
                style={{
                  color: statColors[idx],
                  textShadow: `0 0 12px ${statColors[idx]}44`,
                }}
              >
                0{stat.suffix}
              </span>
              <span className="text-center text-[8px] font-medium uppercase tracking-wider text-gray-500 sm:text-[9px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-1 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
          <span className="text-[8px] uppercase tracking-widest text-gray-600">
            Scroll to launch
          </span>
        </div>
      </div>
    </section>
  );
}
