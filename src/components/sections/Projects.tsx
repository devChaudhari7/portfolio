"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NetworkCanvas from "@/components/network/NetworkCanvas";
import ProjectCase from "./ProjectCase";
import Ring from "@/components/ui/Ring";
import SectionIndex from "@/components/ui/SectionIndex";
import Reveal from "@/components/ui/Reveal";
import { projects, projectById } from "@/lib/content";
import { useMediaQuery } from "@/lib/hooks";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/cn";

type View = "immersive" | "index";

export default function Projects() {
  const lg = useMediaQuery("(min-width: 1024px)");
  const { scrollTo } = useSmoothScroll();
  const [view, setView] = useState<View>("immersive");
  const [active, setActive] = useState(projects[0].id);
  const pending = useRef<string | null>(null);

  // scroll-driven active project (drives the reconfiguring network)
  useEffect(() => {
    if (view !== "immersive") return;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-project]"));
    if (!blocks.length) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set((e.target as HTMLElement).dataset.project!, e.isIntersecting ? e.intersectionRatio : 0);
        let top = "";
        let max = 0;
        ratios.forEach((v, k) => {
          if (v > max) {
            max = v;
            top = k;
          }
        });
        if (top) setActive(top);
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -30% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [view]);

  // after switching back to immersive from index, scroll to the chosen project
  useEffect(() => {
    if (view === "immersive" && pending.current) {
      const id = pending.current;
      pending.current = null;
      requestAnimationFrame(() => scrollTo(`#project-${id}`, { offset: 80 }));
    }
  }, [view, scrollTo]);

  const activeProject = projectById.get(active);

  return (
    <section id="work" data-route="work" className="section-pad relative">
      <div className="container-edge">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
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
                Six projects, one graph. Each is a working system — the network re-wires to whichever you&apos;re reading.
              </p>
            </Reveal>
          </div>

          {/* view toggle */}
          <Reveal delay={0.1}>
            <div className="inline-flex rounded-full border border-line p-1 font-mono text-xs" role="tablist" aria-label="Projects view">
              {(["immersive", "index"] as View[]).map((v) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-colors",
                    view === v ? "bg-signal text-void" : "text-muted hover:text-text",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {view === "immersive" ? (
            <motion.div
              key="immersive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-x-16 lg:grid-cols-[0.9fr_1.1fr]"
            >
              {/* sticky reconfiguring network (desktop) */}
              {lg && (
                <div className="hidden lg:block">
                  <div className="sticky top-0 flex h-screen items-center">
                    <div className="relative h-[78vh] w-full">
                      <NetworkCanvas variant="focus" activeProjectId={active} className="absolute inset-0 h-full w-full" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                        <p className="mono-label mb-1">// reconfiguring · node {activeProject?.index}</p>
                        <p className="font-display text-2xl font-semibold text-text">{activeProject?.name}</p>
                        <p className="mt-1 text-sm text-muted">{activeProject?.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* case studies */}
              <div>
                {projects.map((p) => (
                  <ProjectCase key={p.id} project={p} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.ul
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-line border-y border-line"
            >
              {projects.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      pending.current = p.id;
                      setActive(p.id);
                      setView("immersive");
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
                      </span>
                      <span className="mt-1 hidden font-mono text-[11px] text-muted/70 sm:block">
                        {p.stack.join(" · ")}
                      </span>
                    </span>
                    <span className="flex items-center gap-4">
                      <Ring size={34} stroke={2} rating={p.rating} />
                      <span className="font-mono text-xs text-muted transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
