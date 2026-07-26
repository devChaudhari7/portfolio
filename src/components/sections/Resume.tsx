"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionIndex from "@/components/ui/SectionIndex";
import { site } from "@/lib/content";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const PAGES = ["/assets/resume/page-1.png", "/assets/resume/page-2.png"];

/**
 * The résumé on a curved ultrawide display — the third device in the site's
 * frame language (phone → browser → monitor), and the right object for a
 * document. Two Letter pages sit side by side, which is exactly what a 16:9
 * screen wants; a single portrait page would waste the width.
 */
export default function Resume() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 }, true);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const awake = inView || reduced;

  return (
    <section id="resume" data-route="resume" className="section-pad relative">
      <div className="container-edge">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <SectionIndex index="07" label="résumé" className="mb-6" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2rem,6vw,4rem)]">
              The whole thing, on one screen<span className="text-signal">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted">
              Two pages, no scrolling required. Open the PDF if you&apos;d rather keep a copy.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div
            ref={ref}
            className="relative mx-auto w-full max-w-6xl [perspective:2400px]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* ambient light pooling behind the panel */}
            <span
              className="pointer-events-none absolute -inset-x-16 -top-10 bottom-16 -z-10 rounded-[50%] blur-3xl transition-opacity duration-1000"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--signal) 30%, transparent), transparent)",
                opacity: awake ? (hovered ? 0.75 : 0.4) : 0,
              }}
              aria-hidden="true"
            />

            {/* ---------------------------------------------------- chassis -- */}
            <div
              className="relative rounded-[1.6rem] p-[10px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(165deg, #4a4e55 0%, #23262b 30%, #34383e 55%, #1c1f23 100%)",
                transform: reduced
                  ? undefined
                  : `perspective(2400px) rotateX(${hovered ? 0.6 : 2.4}deg) translateY(${hovered ? -6 : 0}px)`,
              }}
            >
              {/* -------------------------------------------------- screen -- */}
              <div
                className="relative overflow-hidden rounded-[1.05rem] transition-[filter,background] duration-1000"
                style={{
                  background: "#12151b",
                  filter: awake ? "brightness(1)" : "brightness(0.35)",
                }}
              >
                {/* viewer toolbar */}
                <div className="flex items-center gap-3 border-b border-white/5 bg-black/30 px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </span>
                  <span className="mx-auto truncate font-mono text-[11px] text-white/45">
                    Dev-Chaudhari-Resume.pdf — 2 pages
                  </span>
                  <div className="flex flex-none items-center gap-2">
                    <a
                      href={site.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] text-white/70 transition-colors hover:border-signal hover:text-signal"
                    >
                      Open ↗
                    </a>
                    <a
                      href={site.resume}
                      download
                      className="rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-medium text-void transition-shadow hover:shadow-[0_0_18px_-4px_var(--signal)]"
                    >
                      Download
                    </a>
                  </div>
                </div>

                {/* the document — two pages side by side, stacked on small screens */}
                <div
                  data-lenis-prevent
                  className="flex max-h-[70vh] justify-center gap-4 overflow-y-auto overscroll-contain p-4 sm:gap-6 sm:p-7 md:max-h-none md:overflow-visible"
                  style={{ scrollbarWidth: "none" }}
                >
                  <div className="flex w-full flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-start md:justify-center">
                    {PAGES.map((src, i) => (
                      <a
                        key={src}
                        href={site.resume}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open résumé PDF (page ${i + 1} shown)`}
                        className="group/page relative block w-full max-w-[420px] flex-none overflow-hidden rounded-sm bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-1 md:w-[calc(50%-0.9rem)] md:max-w-none"
                      >
                        {/* no `priority`: this sits far below the fold, so preloading
                            a 2 MP image would only damage LCP */}
                        <Image
                          src={src}
                          alt={`Dev Chaudhari résumé, page ${i + 1}`}
                          width={1836}
                          height={2376}
                          quality={92}
                          sizes="(max-width: 768px) 88vw, (max-width: 1280px) 44vw, 540px"
                          className="h-auto w-full"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-signal/0 transition-colors duration-500 group-hover/page:bg-signal/5" />
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-void/90 to-transparent pb-2.5 pt-8 font-mono text-[10px] text-white opacity-0 transition-opacity duration-300 group-hover/page:opacity-100">
                          page {i + 1} · open full PDF ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* curvature: the panel falls away at both edges */}
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24"
                  style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.55), transparent)" }}
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24"
                  style={{ background: "linear-gradient(270deg, rgba(0,0,0,0.55), transparent)" }}
                  aria-hidden="true"
                />
                {/* glass sheen */}
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(103deg, rgba(255,255,255,0.055) 0%, transparent 32%, transparent 68%, rgba(255,255,255,0.03) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* chin + power LED */}
              <div className="flex items-center justify-center pb-0.5 pt-2.5">
                <span
                  className={cn("h-1 w-1 rounded-full transition-all duration-700")}
                  style={{
                    background: awake ? "var(--signal)" : "#3a3e44",
                    boxShadow: awake ? "0 0 8px var(--signal)" : "none",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* ------------------------------------------------------ stand -- */}
            <div className="relative mx-auto -mt-px flex w-full flex-col items-center" aria-hidden="true">
              <div
                className="h-11 w-24 rounded-b-md sm:h-14 sm:w-28"
                style={{
                  background: "linear-gradient(180deg, #2b2f34 0%, #202327 60%, #1a1d21 100%)",
                  clipPath: "polygon(18% 0, 82% 0, 96% 100%, 4% 100%)",
                }}
              />
              <div
                className="h-2 w-52 rounded-[50%] sm:w-72"
                style={{ background: "linear-gradient(180deg, #33373d, #17191d)" }}
              />
              {/* reflection on the desk */}
              <span
                className="mt-1 h-16 w-2/3 rounded-[50%] blur-2xl transition-opacity duration-1000"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in oklab, var(--signal) 22%, transparent), transparent)",
                  opacity: awake ? 0.5 : 0,
                }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-center font-mono text-[11px] text-muted/80">
            {"// click either page to open the PDF · updated for 2026 internships"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
