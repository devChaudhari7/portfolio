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
              {/* Placeholder portrait — drop /public/assets/me/portrait.jpg and swap for next/image */}
              <div
                className="absolute inset-0 transition-all duration-700 group-hover:scale-105"
                style={{
                  background:
                    "radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, var(--signal) 30%, transparent), transparent 55%), radial-gradient(120% 120% at 80% 90%, color-mix(in oklab, var(--signal-deep) 40%, transparent), transparent 55%), var(--surface)",
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-7xl font-semibold tracking-tight text-text/70">DC</span>
              </div>
              <div
                className="absolute inset-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-0"
                style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--signal) 45%, transparent), transparent)" }}
                aria-hidden="true"
              />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-muted">
                portrait · drop /me/portrait.jpg
              </span>
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
