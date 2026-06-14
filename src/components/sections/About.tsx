import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionIndex from "@/components/ui/SectionIndex";
import { about, site } from "@/lib/content";

export default function About() {
  return (
    <section id="about" data-route="about" className="section-pad relative">
      <div className="container-edge grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* portrait node */}
        <Reveal className="order-2 lg:order-1">
          <div className="group relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-full border border-line opacity-60 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
            <div className="absolute -inset-4 animate-[spin_22s_linear_infinite] rounded-full border border-dashed border-signal/20" aria-hidden="true" />
            <div className="grain relative aspect-square overflow-hidden rounded-full border border-line-strong bg-[var(--elevated)]">
              <Image
                src={about.portrait}
                alt={`${site.name}, ${site.role}`}
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover grayscale transition-all duration-700 [filter:grayscale(1)_contrast(1.05)_brightness(0.95)] group-hover:scale-[1.04] group-hover:[filter:none]"
              />
              {/* duotone signal tint — fades to the clean photo on hover */}
              <div
                className="pointer-events-none absolute inset-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-0"
                style={{ background: "linear-gradient(140deg, var(--signal-deep), transparent 60%)" }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-700 group-hover:opacity-0"
                style={{ background: "radial-gradient(120% 120% at 30% 15%, color-mix(in oklab, var(--signal) 55%, transparent), transparent 55%)" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionIndex index="01" label="about" className="mb-7" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mb-8 text-[clamp(2rem,5vw,3.5rem)]">
              I ship real software,
              <br />
              <span className="text-muted">not demos.</span>
            </h2>
          </Reveal>
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-text/85 sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="text-muted">{about.kicker}</p>
            </Reveal>
          </div>
          <Reveal delay={0.35}>
            <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-line px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" style={{ animation: "ring-pulse 1.8s var(--ease) infinite" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <span className="font-mono text-xs tracking-wide text-text/80">
                currently: {site.status.toLowerCase()}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
