"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionIndex from "@/components/ui/SectionIndex";
import MediaLightbox from "@/components/ui/MediaLightbox";
import { labExperiments, labIntro, type LabMetric } from "@/lib/content";

/** A measured result, rendered as a telemetry readout: baseline → result. */
function MetricRow({ metric }: { metric: LabMetric }) {
  return (
    <div className="flex items-baseline justify-between gap-3 font-mono text-[11px]">
      <span className="text-muted">{metric.label}</span>
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        {metric.from && (
          <>
            <span className="text-muted/60">{metric.from}</span>
            <span className="text-signal/70">→</span>
          </>
        )}
        <span className="text-signal">{metric.to}</span>
      </span>
    </div>
  );
}

export default function GenAILab() {
  const [runId, setRunId] = useState<string | null>(null);
  const running = labExperiments.find((e) => e.id === runId) ?? null;
  const liveCount = labExperiments.filter((e) => e.live).length;

  return (
    <section id="lab" data-route="lab" className="section-pad relative">
      <div className="container-edge">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <SectionIndex index="03" label="genai lab" className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2rem,6vw,4rem)]">
              The lab bench<span className="text-signal">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted">{labIntro}</p>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {labExperiments.map((e, i) => (
            <Reveal key={e.id} delay={0.04 * i} className="h-full">
              <li className="h-full list-none">
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-[var(--surface)]/40 p-5 transition-colors hover:border-signal/40">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-signal/80">{e.index}</span>
                    {e.live && (
                      <span className="flex items-center gap-1.5 rounded-full border border-signal/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-signal">
                        <span className="h-1 w-1 rounded-full bg-signal shadow-[0_0_6px_var(--signal)]" />
                        live
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-text">
                    {e.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/70">{e.blurb}</p>

                  {e.metrics && (
                    <div className="mt-4 space-y-1.5 rounded-xl border border-line bg-[var(--void)]/50 p-3">
                      <p className="mono-label !text-[9px]">measured</p>
                      {e.metrics.map((m) => (
                        <MetricRow key={m.label} metric={m} />
                      ))}
                    </div>
                  )}

                  {e.pending && (
                    <p className="mt-3 font-mono text-[10px] text-muted/70">◷ {e.pending}</p>
                  )}

                  {e.note && <p className="mt-3 text-xs leading-relaxed text-muted">{e.note}</p>}

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line bg-[var(--elevated)] px-2 py-0.5 font-mono text-[10px] text-text/70"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  {e.live && (
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                      <button
                        type="button"
                        onClick={() => setRunId(e.id)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-xs font-medium text-void transition-shadow hover:shadow-[0_0_20px_-4px_var(--signal)]"
                      >
                        ▶ Run it live
                      </button>
                      <a
                        href={e.live}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-line-strong px-4 py-2 font-mono text-[11px] text-text transition-colors hover:border-signal hover:text-signal"
                      >
                        open ↗
                      </a>
                    </div>
                  )}
                </article>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-8 font-mono text-[11px] text-muted/70">
            {`// ${labExperiments.length} experiments · ${liveCount} running live · every number above is measured, not estimated`}
          </p>
        </Reveal>
      </div>

      {/* run the deployed app, interactively, without leaving the page */}
      <MediaLightbox open={!!running} onClose={() => setRunId(null)} title={running?.name ?? ""}>
        {running?.live && (
          <iframe
            src={`${running.live}?embed=true`}
            title={`${running.name} — live app`}
            loading="lazy"
            className="h-[72vh] w-full rounded-xl border border-line-strong bg-void"
          />
        )}
        <p className="mt-3 text-center font-mono text-[11px] text-muted">
          Running on Streamlit&apos;s free tier — if it&apos;s been idle it may take a moment to wake.
        </p>
      </MediaLightbox>
    </section>
  );
}
