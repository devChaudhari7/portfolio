import Reveal from "@/components/ui/Reveal";
import SectionIndex from "@/components/ui/SectionIndex";
import { site } from "@/lib/content";

const EDGES = [
  { label: "GitHub", value: site.githubHandle, href: site.github },
  { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin },
  { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { label: "Location", value: site.location, href: undefined },
];

export default function Contact() {
  return (
    <section id="contact" data-route="contact" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--signal-deep) 16%, transparent), transparent)" }}
        aria-hidden="true"
      />
      <div className="container-edge relative flex flex-col items-center text-center">
        <Reveal>
          <SectionIndex index="06" label="contact" className="mb-8 justify-center" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(2.5rem,9vw,7rem)]">
            Open a<span className="text-signal"> connection</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Open to internships, freelance, and collaborations. Let&apos;s build something.
          </p>
        </Reveal>

        {/* the final node */}
        <Reveal delay={0.15}>
          <a
            href={`mailto:${site.email}`}
            data-magnetic
            className="group relative mt-12 inline-grid h-56 w-56 place-items-center rounded-full sm:h-64 sm:w-64"
            aria-label={`Email ${site.name} at ${site.email}`}
          >
            <span className="absolute inset-0 rounded-full border border-signal/40 transition-all duration-500 group-hover:border-signal" />
            <span className="absolute inset-3 rounded-full border border-signal/20" />
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "0 0 60px -10px var(--signal)" }}
              aria-hidden="true"
            />
            <span className="absolute inset-6 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-signal/15" aria-hidden="true" />
            <span className="relative flex flex-col items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-signal">send signal</span>
              <span className="font-display text-lg font-semibold text-text transition-colors group-hover:text-signal">
                Email me
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 select-all font-mono text-sm text-text/80">{site.email}</p>
        </Reveal>

        {/* socials as branching edges */}
        <Reveal delay={0.25}>
          <ul className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {EDGES.map((e) => {
              const inner = (
                <span className="flex h-full flex-col items-center gap-1 bg-[var(--surface)] px-4 py-5 transition-colors group-hover:bg-[var(--elevated)]">
                  <span className="mono-label">{e.label}</span>
                  <span className="text-sm text-text/85 transition-colors group-hover:text-signal">{e.value}</span>
                </span>
              );
              return (
                <li key={e.label} className="group">
                  {e.href ? (
                    <a href={e.href} target={e.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
