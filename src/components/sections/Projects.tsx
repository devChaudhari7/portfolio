"use client";

import { useCallback, useEffect, useState } from "react";
import NetworkCanvas from "@/components/network/NetworkCanvas";
import ProjectCase from "./ProjectCase";
import Ring from "@/components/ui/Ring";
import SectionIndex from "@/components/ui/SectionIndex";
import Reveal from "@/components/ui/Reveal";
import { projects, projectById } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import {
  PROJECT_NAV_EVENT,
  closeProjectHash,
  currentProjectHash,
  openProjectHash,
} from "@/lib/projectNav";
import { cn } from "@/lib/cn";

export default function Projects() {
  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState<string | null>(null);

  // Single source of truth: the URL hash. Sync on mount, on history nav, and
  // on our own open/close events. The canvas is never unmounted.
  const sync = useCallback(() => {
    const h = currentProjectHash();
    setActive(projectById.has(h) ? h : null);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener(PROJECT_NAV_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(PROJECT_NAV_EVENT, sync);
    };
  }, [sync]);

  // Bring the network into view behind a freshly opened panel.
  useEffect(() => {
    if (active) scrollTo("#work", { offset: 0 });
  }, [active, scrollTo]);

  const activeIndex = active ? projects.findIndex((p) => p.id === active) : -1;
  const open = (id: string) => openProjectHash(id);
  const close = () => closeProjectHash();
  const step = (dir: 1 | -1) => {
    const base = activeIndex < 0 ? 0 : activeIndex;
    open(projects[(base + dir + projects.length) % projects.length].id);
  };

  return (
    <section id="work" data-route="work" className="section-pad relative">
      <div className="container-edge">
        <div className="mb-10">
          <Reveal>
            <SectionIndex index="02" label="projects" className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2rem,6vw,4rem)]">
              Subsystems<span className="text-signal">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-muted">
              Six projects, one graph. Open any node — it pulls to the core and its case study
              expands over the living network.
            </p>
          </Reveal>
        </div>

        {/* persistent network stage — click a node to open its subsystem */}
        <Reveal>
          <div className="relative mb-10 h-[58vh] min-h-[360px] overflow-hidden rounded-3xl border border-line bg-[var(--surface)]/30">
            <NetworkCanvas
              variant="focus"
              interactive
              activeProjectId={active}
              onSelect={open}
              className="absolute inset-0 h-full w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <p className="mono-label">// the system · {projects.length} subsystems online</p>
              <p className="hidden font-mono text-[11px] text-muted sm:block">
                click a node to dive in · or pick one below
              </p>
            </div>
          </div>
        </Reveal>

        {/* crawlable + keyboard-accessible index (also the scannable list view) */}
        <ul className="divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                aria-current={active === p.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  open(p.id);
                }}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left transition-colors hover:bg-[var(--surface)]/40"
              >
                <span className="font-mono text-sm text-signal/70">{p.index}</span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-xl font-semibold text-text transition-colors group-hover:text-signal sm:text-2xl">
                      {p.name}
                    </span>
                    <span className="truncate text-sm text-muted">{p.tagline}</span>
                    {p.lead && (
                      <span className="rounded-full border border-signal/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-signal">
                        featured
                      </span>
                    )}
                    {p.accolade && (
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest",
                          p.accolade.gold ? "border-gold/50 text-gold" : "border-signal/40 text-signal",
                        )}
                      >
                        {p.accolade.gold ? "★ " : ""}
                        {p.accolade.label}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 hidden font-mono text-[11px] text-muted/70 sm:block">
                    {p.stack.join(" · ")}
                  </span>
                </span>
                <span className="flex items-center gap-4">
                  <Ring size={34} stroke={2} rating={p.rating} />
                  <span className={cn("font-mono text-xs text-muted transition-transform group-hover:translate-x-1")}>
                    open →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* all case studies stay mounted (crawlable); visibility is toggled */}
      {projects.map((p, i) => (
        <ProjectCase
          key={p.id}
          project={p}
          open={active === p.id}
          position={{ index: i, total: projects.length }}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ))}
    </section>
  );
}
