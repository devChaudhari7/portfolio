# Dev Chaudhari — Portfolio · "The Living System"

An Awwwards-aimed personal portfolio rendered as one living, interconnected system:
a luminous graph of nodes (projects, skills, achievements) wired by edges, with light
traveling the connections. It boots online, breathes while you read, and re-wires as you explore.

## Stack
- **Next.js 16** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** with CSS custom-property design tokens
- **Lenis** smooth scroll · **GSAP + ScrollTrigger** scroll choreography · **Motion** micro-interactions
- A custom **2D canvas network engine** (drift, springs, traveling light packets, additive glow)
- Self-hosted **Clash Display** + **General Sans** (Fontshare) + **JetBrains Mono**

## Concept & motifs
- **Light & signal** travelling along connections · **The Ring** (the Trust Ring) reused as
  cursor, halos, loaders, ratings, the contact CTA · **nodes & edges** as the visual grammar ·
  perpetual subtle **life**.

## Adaptive fidelity (3 render tiers)
Capability is detected up front (reduced-motion, pointer, cores, memory, viewport):
- **Tier A** — full dense canvas network, packets, custom cursor, full choreography.
- **Tier B** — leaner canvas, capped DPR, fewer nodes/packets (most phones/tablets).
- **Tier C** — static SVG network + calm cross-fades (reduced-motion / low-power / no-JS).

All animation pauses offscreen (IntersectionObserver + Page Visibility) and throttles via rAF.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Deploy (Vercel)
1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — framework auto-detected (Next.js).
3. No env vars required. Image optimization is on by default.
4. (Optional) set the production domain, then update `site.url` in `src/lib/content.ts`
   so canonical/OG/sitemap URLs are correct.

Or from the CLI: `npx vercel` (preview) / `npx vercel --prod`.

## Assets
The site runs with elegant placeholders. Drop real files per
[`public/assets/README.md`](public/assets/README.md) — portrait, project screenshots, and
demo videos — and swap the placeholder media for `next/image` / `<video>` where noted in code.

## Content
All copy/data lives in [`src/lib/content.ts`](src/lib/content.ts) (single source of truth).

## Structure
```
src/
  app/                 layout, page, globals, 404, sitemap/robots, OG image, fonts
  components/
    boot/              boot sequence
    network/           graph data + canvas engine + canvas mount + static SVG fallback
    layout/            nav, footer, telemetry HUD, custom cursor, scroll progress, minimap, console egg
    providers/         Lenis + GSAP smooth-scroll provider
    sections/          hero, about, projects, skills, timeline, achievements, contact
    ui/                Ring (motif), device frames, lightbox, reveal, section index
  lib/                 content, tier detection, hooks, cn
```

## Easter eggs / signature moments
- Boot sequence · reconfiguring network (per project) · live telemetry HUD · the Ring everywhere ·
  topology minimap · **console easter-egg** (open devtools; or type `dev` anywhere on the page).
