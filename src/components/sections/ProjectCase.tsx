"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Ring from "@/components/ui/Ring";
import DeviceFrame from "@/components/ui/DeviceFrame";
import MediaLightbox from "@/components/ui/MediaLightbox";
import ProjectFlow from "./ProjectFlow";
import type { Project } from "@/lib/content";

function MediaPlaceholder({ project, large = false }: { project: Project; large?: boolean }) {
  // Drop real assets in /public/assets/projects/<id>/ and replace this with
  // <video muted autoPlay loop playsInline poster=...> or <Image .../>.
  return (
    <div className="grain relative grid h-full w-full place-items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 100% at 20% 0%, color-mix(in oklab, var(--signal) 22%, transparent), transparent 55%), radial-gradient(100% 100% at 90% 100%, color-mix(in oklab, var(--signal-deep) 30%, transparent), transparent 55%), var(--surface)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <Ring size={large ? 72 : 52} rating={project.rating} spin>
          <span className="font-display text-sm font-semibold text-text">
            {project.frame === "phone" ? "app" : "web"}
          </span>
        </Ring>
        <span className="font-display text-xl font-semibold tracking-tight text-text">{project.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          interface preview · drop assets in /{project.id}/
        </span>
      </div>
    </div>
  );
}

export default function ProjectCase({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      id={`project-${project.id}`}
      data-project={project.id}
      className="scroll-mt-28 border-t border-line py-16 first:border-t-0 lg:py-24"
    >
      <Reveal>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-signal/80">{project.index}</span>
            <h3 className="display text-[clamp(1.9rem,5vw,3.2rem)]">{project.name}</h3>
          </div>
          {project.lead && (
            <span className="hidden whitespace-nowrap rounded-full border border-signal/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-signal sm:block">
              featured
            </span>
          )}
        </div>
        <p className="mb-8 max-w-2xl text-lg text-text/85">{project.tagline}</p>
      </Reveal>

      {/* media */}
      <Reveal delay={0.05}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor
          className="group block w-full text-left"
          aria-label={`Expand ${project.name} preview`}
        >
          <div className="relative">
            <DeviceFrame variant={project.frame} url={project.links.live ?? project.links.github}>
              <MediaPlaceholder project={project} />
            </DeviceFrame>
            <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] text-text opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              ⤢ expand
            </span>
          </div>
        </button>
      </Reveal>

      {/* architecture flow */}
      <Reveal delay={0.1}>
        <div className="mt-10 rounded-2xl border border-line bg-[var(--surface)]/40 p-5">
          <p className="mono-label mb-2">architecture</p>
          <ProjectFlow steps={project.flow} gold={false} />
        </div>
      </Reveal>

      {/* details */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_0.6fr]">
        <div>
          <ul className="space-y-4">
            {project.bullets.map((b, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <li className="flex gap-3 text-text/80">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-signal shadow-[0_0_8px_var(--signal)]" aria-hidden="true" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-7 border-l-2 border-signal/50 pl-4 text-text/70">
              <span className="font-mono text-xs uppercase tracking-widest text-signal">why it&apos;s interesting · </span>
              {project.why}
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
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
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
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
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-text transition-colors hover:border-signal hover:text-signal"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </Reveal>
          {project.flagged && (
            <p className="font-mono text-[11px] leading-relaxed text-gold/80">⚑ {project.flagged}</p>
          )}
        </div>
      </div>

      <MediaLightbox open={open} onClose={() => setOpen(false)} title={project.name}>
        <DeviceFrame variant={project.frame} url={project.links.live ?? project.links.github}>
          <MediaPlaceholder project={project} large />
        </DeviceFrame>
        <p className="mt-4 text-center font-mono text-xs text-muted">
          full demo video + screenshots play here once dropped into /assets/projects/{project.id}/
        </p>
      </MediaLightbox>
    </article>
  );
}
