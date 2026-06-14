import { nav, site } from "@/lib/content";

const ECG = "M0 8 H14 L17 8 L20 2 L23 14 L26 8 H44";

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-edge flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center" aria-hidden="true">
            <span className="absolute inset-0 rounded-full border border-signal/50" />
            <span className="absolute inset-1.5 rounded-full border border-signal/20" />
            <span className="font-display text-xs font-semibold text-text">DC</span>
          </span>
          <div>
            <p className="font-display text-sm font-medium text-text">{site.name}</p>
            <p className="font-mono text-[11px] text-muted">{site.role}</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
          {nav.map((n) => (
            <a key={n.id} href={n.href} className="mono-label transition-colors hover:text-signal">
              {n.label}
            </a>
          ))}
          <a href={site.github} target="_blank" rel="noreferrer" className="mono-label transition-colors hover:text-signal">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="mono-label transition-colors hover:text-signal">
            LinkedIn
          </a>
        </nav>
      </div>

      <div className="container-edge flex items-center justify-between border-t border-line py-5">
        <p className="font-mono text-[11px] text-muted">© 2026 {site.name}</p>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span>still running</span>
          <svg width="44" height="16" viewBox="0 0 44 16" fill="none" aria-hidden="true">
            <path d={ECG} stroke="var(--signal)" strokeOpacity="0.4" strokeWidth="1" />
            <circle r="1.4" fill="var(--glow)" style={{ filter: "drop-shadow(0 0 3px var(--signal))" }}>
              <animateMotion dur="2.4s" repeatCount="indefinite" path={ECG} />
            </circle>
          </svg>
        </div>
      </div>
    </footer>
  );
}
