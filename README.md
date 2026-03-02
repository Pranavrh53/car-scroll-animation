# 🚀 Car Scroll Animation — Space Rocket Edition

An interactive, scroll-driven hero section built with **Next.js**, **React**, **GSAP**, and **Tailwind CSS**. Features a realistic rocket launch sequence with smoke-trail text reveal, thrust gauges, and cinematic scroll animations.

## 🔗 Live Demo

**[car-scroll-animation-sigma.vercel.app](https://car-scroll-animation-sigma.vercel.app)**

## ✨ Features

- **Scroll-driven rocket launch** — 3-phase GSAP ScrollTrigger animation tied to scroll progress (not autoplay)
- **Smoke-trail text** — "WELCOME ITZFIZZ" materialises from exhaust smoke, drifts, and dissipates
- **Realistic rocket SVG** — Metallic body, engine bells, viewports, panel lines, fins, and rivets
- **Interactive gauges** — Thrust gauge, mini stat gauges, altitude counter — all animated on scroll
- **Starfield** — 100 deterministic stars with shooting star loops
- **Butter-smooth performance** — GPU-accelerated transforms, no layout reflows, `scrub: 3` for fluid motion

## 🎬 Animation Phases

| Phase | Scroll | What Happens |
|-------|--------|--------------|
| **1** | 0 → 30% | Rocket rises, thrust gauge fills to 100%, smoke letters appear one-by-one |
| **2** | 30 → 60% | Rocket tilts & accelerates, text blurs and drifts like dissipating smoke |
| **3** | 60 → 100% | Rocket blasts off screen, everything fades out |

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI components |
| **GSAP 3.14** | ScrollTrigger animations, timeline sequencing |
| **Tailwind CSS v4** | Utility-first styling |
| **TypeScript** | Type safety |

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/Pranavrh53/car-scroll-animation.git
cd car-scroll-animation

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, keyframe animations
│   ├── layout.tsx        # Root layout with Inter font
│   └── page.tsx          # Main page
└── components/
    ├── HeroSection.tsx   # Rocket launch hero with GSAP scroll animations
    └── AboutSection.tsx  # Below-fold section with reveal animations
```

## ⚡ Performance

- All animations use `transform` and `opacity` only — zero layout reflows
- `backface-visibility: hidden` for GPU compositing
- `contain: layout style` on animated elements
- `anticipatePin: 1` eliminates pin jump
- Deterministic star positions (seeded PRNG) — no hydration mismatch

## 🚀 Deployment

Hosted on **Vercel** with automatic deployments.

```bash
vercel --prod
```

## 📄 License

MIT
