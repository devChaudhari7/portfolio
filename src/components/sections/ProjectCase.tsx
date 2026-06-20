"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import DeviceFrame from "@/components/ui/DeviceFrame";
import MediaLightbox from "@/components/ui/MediaLightbox";
import ProjectFlow from "./ProjectFlow";
import ProjectMedia, { MediaPlaceholder } from "./ProjectMedia";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/content";

interface Props {
  project: Project;
  open: boolean;
  position: { index: number; total: number };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ProjectCase({ project, open, position, onClose, onPrev, onNext }: Props) {
  const [lightbox, setLightbox] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const a = project.assets;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lightbox, onClose, onPrev, onNext]);

  return (
    <motion.article
      id={project.id}
      aria-label={`${project.name} — ${project.tagline}`}
      aria-hidden={!open}
      data-lenis-prevent
      className="case-panel fixed inset-0 z-[75] overflow-y-auto overscroll-contain"
      initial={false}
      animate={
        open
          ? { opacity: 1, visibility: "visible" }
          : { opacity: 0, transitionEnd: { visibility: "hidden" } }
      }
      transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      {/* backdrop — the living network stays visible behind (translucent, no costly filter) */}
      <button
        type="button"
        aria-label="Close case study"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="fixed inset-0 cursor-zoom-out bg-void/75"
      />

      <div className="relative z-10 flex min-h-full items-start justify-center p-4 py-20 sm:items-center sm:p-8">
      <motion.div
        className="case-card w-full max-w-3xl rounded-2xl border border-line-strong bg-[color-mix(in_oklab,var(--surface)_93%,transparent)] p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] sm:p-8"
        initial={false}
        animate={open ? { y: 0, scale: 1 } : { y: 18, scale: 0.985 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-signal/80">{project.index}</span>
            <div>
              <h3 className="display text-[clamp(1.7rem,4.5vw,2.8rem)]">{project.name}</h3>
              <p className="mt-1 text-sm text-muted sm:text-base">{project.tagline}</p>
              {project.accolade && (
                <span
                  className={cn(
                    "mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest",
                    project.accolade.gold
                      ? "border-gold/50 bg-gold/5 text-gold"
                      : "border-signal/40 bg-signal/5 text-signal",
                  )}
                >
                  {project.accolade.gold ? "★" : "⬡"} {project.accolade.label}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-none items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              tabIndex={open ? 0 : -1}
              aria-label="Previous project"
              className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:border-signal hover:text-signal"
            >
              ‹
            </button>
            <span className="font-mono text-[11px] text-muted">
              {position.index + 1}/{position.total}
            </span>
            <button
              type="button"
              onClick={onNext}
              tabIndex={open ? 0 : -1}
              aria-label="Next project"
              className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:border-signal hover:text-signal"
            >
              ›
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              aria-label="Close case study (Esc)"
              className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-line-strong transition-colors hover:border-signal hover:text-signal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* media (in-frame demo) */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          tabIndex={open ? 0 : -1}
          data-cursor
          className="group block w-full text-left"
          aria-label={`Expand ${project.name} demo and screenshots`}
        >
          <div className="relative">
            <DeviceFrame variant={project.frame} url={project.links.live ?? project.links.github}>
              <ProjectMedia project={project} open={open} />
            </DeviceFrame>
            <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] text-text opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              {a ? "⤢ expand demo" : "⤢ expand"}
            </span>
          </div>
        </button>

        {/* architecture flow */}
        <div className="mt-7 rounded-2xl border border-line bg-[var(--void)]/40 p-4">
          <p className="mono-label mb-2">architecture</p>
          <ProjectFlow steps={project.flow} gold={false} active={open} />
        </div>

        {/* details */}
        <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_0.6fr]">
          <div>
            <ul className="space-y-3.5">
              {project.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm text-text/80 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-signal shadow-[0_0_8px_var(--signal)]" aria-hidden="true" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-signal/50 pl-4 text-sm text-text/70 sm:text-base">
              <span className="font-mono text-xs uppercase tracking-widest text-signal">why it&apos;s interesting · </span>
              {project.why}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="mono-label mb-3">stack</p>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-[var(--elevated)] px-3 py-1 font-mono text-xs text-text/80">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  data-magnetic
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-void transition-shadow hover:shadow-[0_0_24px_-4px_var(--signal)]"
                >
                  Live ↗
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-text transition-colors hover:border-signal hover:text-signal"
                >
                  GitHub ↗
                </a>
              )}
              {project.proofLink && (
                <a
                  href={project.proofLink.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-text transition-colors hover:border-signal hover:text-signal"
                >
                  {project.proofLink.label} ↗
                </a>
              )}
            </div>
            {project.flagged && (
              <p className="font-mono text-[11px] leading-relaxed text-gold/80">⚑ {project.flagged}</p>
            )}
          </div>
        </div>
      </motion.div>
      </div>

      <MediaLightbox open={lightbox} onClose={() => setLightbox(false)} title={project.name}>
        {a?.videoFull ? (
          <video
            src={a.videoFull}
            poster={a.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[70vh] w-full rounded-xl border border-line-strong bg-void object-contain"
          />
        ) : a ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line-strong bg-void">
            <Image src={a.poster} alt={`${project.name} preview`} fill sizes="100vw" className="object-contain" />
          </div>
        ) : (
          <DeviceFrame variant={project.frame}>
            <MediaPlaceholder project={project} large />
          </DeviceFrame>
        )}

        {a?.shots?.length ? (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {a.shots.map((src, i) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-lg border border-line bg-void">
                <Image
                  src={src}
                  alt={`${project.name} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 30vw, 180px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center font-mono text-xs text-muted">
            demo video + screenshots play here once dropped into /assets/projects/{project.id}/
          </p>
        )}
      </MediaLightbox>
    </motion.article>
  );
}
