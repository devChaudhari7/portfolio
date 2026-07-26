"use client";

import { useState } from "react";
import Image from "next/image";
import SectionIndex from "@/components/ui/SectionIndex";
import Reveal from "@/components/ui/Reveal";
import Ring from "@/components/ui/Ring";
import MediaLightbox from "@/components/ui/MediaLightbox";
import { achievements } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Achievements() {
  const [certId, setCertId] = useState<string | null>(null);
  const showing = achievements.find((a) => a.id === certId) ?? null;

  return (
    <section id="achievements" data-route="achievements" className="section-pad relative">
      <div className="container-edge">
        <Reveal>
          <SectionIndex index="06" label="achievements" className="mb-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mb-4 text-[clamp(2rem,6vw,4rem)]">Nodes that lit up.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-12 max-w-xl text-muted">
            Credentials and hackathons — each one verifiable.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => {
            const gold = !!a.highlight;
            return (
              <Reveal key={a.id} delay={i * 0.08} className={cn(gold && "sm:col-span-2 lg:col-span-2")}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500",
                    gold
                      ? "border-gold/40 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--gold)_10%,var(--surface)),var(--surface))] hover:border-gold/70"
                      : "border-line bg-[var(--surface)]/50 hover:border-signal/50",
                  )}
                >
                  {gold && (
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-2xl"
                      style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 50%, transparent), transparent 70%)" }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className={cn("font-mono text-xs", gold ? "text-gold" : "text-signal/80")}>{a.date}</p>
                      <h3
                        className={cn(
                          "mt-3 font-display font-semibold leading-tight tracking-tight text-text",
                          gold ? "text-2xl sm:text-3xl" : "text-lg",
                        )}
                      >
                        {a.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text/70">{a.detail}</p>
                    </div>
                    <Ring
                      size={gold ? 56 : 40}
                      rating={1}
                      gold={gold}
                      spin={gold}
                      label={gold ? "Verified credential" : undefined}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", gold ? "bg-gold" : "bg-signal")} />
                    </Ring>
                  </div>

                  {a.credentialId && (
                    <p className="relative mt-3 truncate font-mono text-[10px] text-muted/70">
                      ID · {a.credentialId}
                    </p>
                  )}

                  <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-5">
                    {a.image && (
                      <button
                        type="button"
                        onClick={() => setCertId(a.id)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
                          gold
                            ? "border-gold/50 text-gold hover:border-gold"
                            : "border-line-strong text-text hover:border-signal hover:text-signal",
                        )}
                      >
                        ⤢ certificate
                      </button>
                    )}
                    {a.credentialUrl && (
                      <a
                        href={a.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
                          gold
                            ? "border-gold/50 text-gold hover:border-gold"
                            : "border-line-strong text-text hover:border-signal hover:text-signal",
                        )}
                      >
                        verify ↗
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <MediaLightbox open={!!showing} onClose={() => setCertId(null)} title={showing?.title ?? ""}>
        {showing?.image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line-strong bg-void">
            <Image
              src={showing.image}
              alt={`${showing.title} certificate`}
              fill
              sizes="100vw"
              loading="eager"
              className="object-contain"
            />
          </div>
        )}
      </MediaLightbox>
    </section>
  );
}
