import Reveal from "@/components/ui/Reveal";
import SectionIndex from "@/components/ui/SectionIndex";
import ContactNodes from "./ContactNodes";
import { site } from "@/lib/content";
import { getGitHubProfile, getLeetCodeProfile } from "@/lib/social";

export default async function Contact() {
  // Live profile data, fetched on the server and revalidated hourly (ISR).
  // Both fail soft — a dead API degrades the node, it never breaks the page.
  const [github, leetcode] = await Promise.all([
    getGitHubProfile("devChaudhari7"),
    getLeetCodeProfile(site.leetcodeUser),
  ]);

  return (
    <section id="contact" data-route="contact" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--signal-deep) 16%, transparent), transparent)" }}
        aria-hidden="true"
      />
      <div className="container-edge relative flex flex-col items-center text-center">
        <Reveal>
          <SectionIndex index="07" label="contact" className="mb-8 justify-center" />
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

        <Reveal delay={0.22}>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-3 text-sm text-text transition-all hover:border-signal hover:text-signal hover:shadow-[0_0_24px_-8px_var(--signal)]"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 1a.75.75 0 0 1 .75.75v6.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V1.75A.75.75 0 0 1 8 1Z" />
              <path d="M2.75 12a.75.75 0 0 1 .75.75v.75h9v-.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 .75-.75Z" />
            </svg>
            View résumé (PDF)
          </a>
        </Reveal>

        {/* the network's outer nodes — each one alive */}
        <Reveal delay={0.25} className="w-full">
          <div className="mt-16 w-full">
            <p className="mono-label mb-8 text-center">{"// live profiles · browsable here"}</p>
            <ContactNodes github={github} leetcode={leetcode} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
