"use client";

import { useState } from "react";
import { motion } from "motion/react";
import LivingNetwork from "@/components/network/LivingNetwork";
import { site } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const [hover, setHover] = useState<string | null>(null);

  const onSelect = (ref: string) => scrollTo(`#project-${ref}`, { offset: 80 });

  return (
    <section
      id="hero"
      data-route="hero"
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-label="Introduction"
    >
      {/* living network */}
      <div className="absolute inset-0 z-0">
        <LivingNetwork
          className="h-full w-full [mask-image:radial-gradient(120%_120%_at_50%_40%,black,transparent_92%)]"
          onSelect={onSelect}
          onHover={(n) => setHover(n && n.kind !== "skill" ? n.label : null)}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(120% 90% at 30% 80%, color-mix(in oklab, var(--void) 70%, transparent), transparent 60%)" }}
        aria-hidden="true"
      />

      {/* hovered node preview */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2"
        initial={false}
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : -6 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <span className="panel rounded-full px-4 py-1.5 font-mono text-xs text-signal">▸ {hover}</span>
      </motion.div>

      {/* overlay content */}
      <div className="container-edge pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-end pb-24 pt-32 sm:justify-center">
        <div className="max-w-4xl">
          <motion.p
            className="mono-label mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {site.location} · {site.status}
          </motion.p>

          <h1 className="display text-[clamp(3rem,12vw,9.5rem)]">
            {site.name.split(" ").map((word, i) => (
              <span key={word} className="mr-[0.18em] inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block text-gradient"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.35 + i * 0.12, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-2xl font-display text-[clamp(1.25rem,3.2vw,2.1rem)] font-medium leading-tight text-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          >
            {site.role} <span className="text-muted">— {site.headline}</span>
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-base text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          >
            {site.subcopy}
          </motion.p>

          <motion.div
            className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#work", { offset: 70 });
              }}
              data-magnetic
              className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-void transition-shadow hover:shadow-[0_0_30px_-4px_var(--signal)]"
            >
              Explore the system
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact", { offset: 70 });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-text transition-colors hover:border-signal hover:text-signal"
            >
              Get in touch
            </a>
          </motion.div>

          <p className="mt-10 font-mono text-[11px] text-muted/70">
            <span className="hidden sm:inline">hover a node to inspect · click a project to dive in · </span>
            <span className="sm:hidden">tap a node · drag to nudge the field · </span>
            scroll to explore
          </p>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <motion.div
          className="h-10 w-px"
          style={{ background: "linear-gradient(var(--signal), transparent)" }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
