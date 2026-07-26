"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { site } from "@/lib/content";
import { LANGUAGE_COLORS, type GitHubProfile, type LeetCodeProfile } from "@/lib/social";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ shell -- */

/** A small device screen — the shared chassis every contact node lives in. */
function NodeScreen({
  label,
  live,
  href,
  action,
  children,
  className,
}: {
  label: string;
  live?: boolean;
  href: string;
  action: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[1.75rem] border border-line bg-[var(--surface)]/40 p-3 transition-colors hover:border-signal/40",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between px-2 pt-1">
        <span className="mono-label !text-[9px]">{label}</span>
        {live && (
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-signal">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            live
          </span>
        )}
      </div>

      {/* the screen */}
      <div className="relative flex-1 overflow-hidden rounded-[1.25rem] border border-line-strong bg-void p-4">
        <span
          className="absolute left-1/2 top-0 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-[var(--surface)]"
          aria-hidden="true"
        />
        {children}
      </div>

      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="mt-2 rounded-full border border-line-strong px-4 py-2 text-center font-mono text-[10px] uppercase tracking-widest text-text transition-colors hover:border-signal hover:text-signal"
      >
        {action}
      </a>
    </article>
  );
}

function Stat({ n, label }: { n: number | string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-lg font-semibold leading-none text-text">{n}</p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}

/* ----------------------------------------------------------------- github -- */

function GitHubNode({ data }: { data: GitHubProfile | null }) {
  return (
    <NodeScreen label="// github" live={!!data} href={site.github} action="open github ↗">
      {data ? (
        <div className="flex h-full flex-col pt-3">
          <div className="flex items-center gap-3">
            <Image
              src={data.avatar}
              alt=""
              width={40}
              height={40}
              className="rounded-full border border-line-strong"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold text-text">@{data.login}</p>
              <p className="font-mono text-[10px] text-muted">building since {data.since}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl border border-line bg-[var(--surface)]/50 py-2.5">
            <Stat n={data.repos} label="repos" />
            <Stat n={data.followers} label="followers" />
            <Stat n={data.following} label="following" />
          </div>

          {data.languages.length > 0 && (
            <div className="mt-4">
              <p className="mono-label mb-1.5 !text-[9px]">languages</p>
              <div className="flex h-1.5 overflow-hidden rounded-full bg-[var(--elevated)]">
                {data.languages.map((l) => (
                  <span
                    key={l.name}
                    style={{ width: `${l.pct}%`, background: LANGUAGE_COLORS[l.name] ?? "var(--signal)" }}
                    title={`${l.name} ${l.pct}%`}
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {data.languages.slice(0, 3).map((l) => (
                  <span key={l.name} className="flex items-center gap-1 font-mono text-[9px] text-muted">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: LANGUAGE_COLORS[l.name] ?? "var(--signal)" }}
                    />
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <ul className="mt-auto space-y-1.5 pt-4">
            {data.topRepos.map((r) => (
              <li key={r.name} className="flex items-center justify-between gap-2 font-mono text-[10px]">
                <span className="truncate text-text/80">{r.name}</span>
                <span className="flex-none text-muted">★ {r.stars}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="grid h-full place-items-center font-mono text-[10px] text-muted">
          github.com/{site.githubHandle.split("/").pop()}
        </p>
      )}
    </NodeScreen>
  );
}

/* --------------------------------------------------------------- leetcode -- */

function LeetCodeNode({ data }: { data: LeetCodeProfile | null }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 }, true);
  const reduced = useReducedMotion();

  const pct = data && data.totals.all ? data.solved.all / data.totals.all : 0;
  const R = 34;
  const C = 2 * Math.PI * R;

  const bars = data
    ? ([
        { k: "Easy", v: data.solved.easy, t: data.totals.easy, c: "#00b8a3" },
        { k: "Med", v: data.solved.medium, t: data.totals.medium, c: "#ffb800" },
        { k: "Hard", v: data.solved.hard, t: data.totals.hard, c: "#ff375f" },
      ] as const)
    : [];

  return (
    <NodeScreen label="// leetcode" live={!!data} href={site.leetcode} action="open leetcode ↗">
      {data ? (
        <div ref={ref} className="flex h-full flex-col items-center pt-4">
          {/* solved ring — the Trust Ring motif, again */}
          <div className="relative grid place-items-center">
            <svg width="88" height="88" className="-rotate-90">
              <circle cx="44" cy="44" r={R} fill="none" stroke="var(--line-strong)" strokeWidth="5" />
              <motion.circle
                cx="44"
                cy="44"
                r={R}
                fill="none"
                stroke="var(--signal)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                animate={{ strokeDashoffset: inView ? C * (1 - pct) : C }}
                transition={{ duration: reduced ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ filter: "drop-shadow(0 0 6px var(--signal))" }}
              />
            </svg>
            <div className="absolute text-center">
              <p className="font-display text-xl font-semibold leading-none text-text">{data.solved.all}</p>
              <p className="font-mono text-[9px] text-muted">solved</p>
            </div>
          </div>

          <div className="mt-4 w-full space-y-2">
            {bars.map((b) => (
              <div key={b.k}>
                <div className="flex justify-between font-mono text-[9px]">
                  <span style={{ color: b.c }}>{b.k}</span>
                  <span className="text-muted">
                    {b.v}/{b.t}
                  </span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--elevated)]">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: b.c }}
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${(b.v / b.t) * 100}%` : 0 }}
                    transition={{ duration: reduced ? 0 : 1, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {data.ranking && (
            <p className="mt-auto pt-3 font-mono text-[9px] text-muted">
              rank #{data.ranking.toLocaleString()}
            </p>
          )}
        </div>
      ) : (
        <p className="grid h-full place-items-center font-mono text-[10px] text-muted">{site.leetcodeHandle}</p>
      )}
    </NodeScreen>
  );
}

/* --------------------------------------------------------------- linkedin -- */

/** LinkedIn offers no public API and blocks framing, so this is a styled card
 *  built from information we already hold — never invented stats. */
function LinkedInNode() {
  return (
    <NodeScreen label="// linkedin" href={site.linkedin} action="connect on linkedin ↗">
      <div className="flex h-full flex-col pt-3">
        <div
          className="-mx-4 -mt-4 h-14"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in oklab, var(--signal-deep) 55%, transparent), color-mix(in oklab, var(--signal) 25%, transparent))",
          }}
          aria-hidden="true"
        />
        <div className="-mt-7">
          <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-void bg-[var(--elevated)]">
            <span className="font-display text-lg font-semibold text-text">DC</span>
          </div>
          <p className="mt-2 font-display text-sm font-semibold text-text">{site.name}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-text/70">{site.role}</p>
          <p className="mt-1 font-mono text-[9px] text-muted">{site.location}</p>
        </div>

        <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
          {["Nirma University — B.Tech CS", "BrainyBeam · Android SDE Intern", "InfoLabz · SDE Intern"].map(
            (l) => (
              <li key={l} className="flex items-start gap-2 font-mono text-[9px] leading-relaxed text-muted">
                <span className="mt-1 h-1 w-1 flex-none rounded-full bg-signal/70" />
                {l}
              </li>
            ),
          )}
        </ul>

        <p className="mt-auto pt-3 font-mono text-[9px] text-signal/80">open to internships</p>
      </div>
    </NodeScreen>
  );
}

/* ------------------------------------------------------------------ phone -- */

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

/** Keypad that "dials" the number on view — proof of life, not decoration. */
function PhoneNode() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 }, true);
  const reduced = useReducedMotion();
  const [lit, setLit] = useState<string | null>(null);
  const [typed, setTyped] = useState("");

  const digits = site.phoneHref.replace(/\D/g, "").slice(-10);
  // Reduced motion shows the number outright — derived, so the effect never
  // has to setState in its body.
  const shown = reduced ? digits : typed;

  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      if (i >= digits.length) {
        setLit(null);
        clearInterval(id);
        return;
      }
      const d = digits[i];
      setLit(d);
      setTyped((t) => t + d);
      i++;
    }, 260);
    return () => clearInterval(id);
  }, [inView, reduced, digits]);

  return (
    <NodeScreen label="// phone" href={`tel:${site.phoneHref}`} action="call now ↗">
      <div ref={ref} className="flex h-full flex-col items-center pt-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted">dialing</p>
        <p className="mt-1 h-6 font-display text-base font-semibold tracking-wider text-signal">
          {shown ? `+91 ${shown.slice(0, 5)} ${shown.slice(5)}`.trim() : "+91"}
          {!reduced && shown.length < digits.length && <span className="animate-blink">|</span>}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {KEYS.map((k) => (
            <span
              key={k}
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full border font-mono text-xs transition-all duration-200",
                lit === k
                  ? "border-signal bg-signal/20 text-signal shadow-[0_0_14px_-2px_var(--signal)]"
                  : "border-line text-text/60",
              )}
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </NodeScreen>
  );
}

/* --------------------------------------------------------------- location -- */

/** Radar sweep with a ping on Ahmedabad — real coordinates, no map tiles. */
function LocationNode() {
  const reduced = useReducedMotion();

  return (
    <NodeScreen
      label="// location"
      href="https://www.google.com/maps/place/Ahmedabad,+Gujarat"
      action="view on map ↗"
    >
      <div className="relative flex h-full flex-col items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full max-h-52 w-full" role="img" aria-label="Ahmedabad, India">
          <defs>
            <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* grid */}
          <g stroke="var(--line)" strokeWidth="0.5">
            {[40, 80, 120, 160].map((v) => (
              <line key={`h${v}`} x1="10" y1={v} x2="190" y2={v} />
            ))}
            {[40, 80, 120, 160].map((v) => (
              <line key={`v${v}`} x1={v} y1="10" x2={v} y2="190" />
            ))}
          </g>

          {/* rings */}
          {[30, 55, 80].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="var(--signal)" strokeOpacity="0.18" />
          ))}

          {/* sweep */}
          {!reduced && (
            <g style={{ transformOrigin: "100px 100px", animation: "spin 4s linear infinite" }}>
              <path d="M100 100 L100 20 A80 80 0 0 1 156 44 Z" fill="url(#sweep)" />
            </g>
          )}

          {/* the ping */}
          <circle cx="100" cy="100" r="4" fill="var(--glow)" style={{ filter: "drop-shadow(0 0 6px var(--signal))" }} />
          {!reduced && (
            <circle cx="100" cy="100" r="4" fill="none" stroke="var(--signal)" strokeWidth="1.5">
              <animate attributeName="r" from="4" to="34" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>

        <div className="absolute bottom-0 w-full text-center">
          <p className="font-display text-sm font-semibold text-text">{site.location}</p>
          <p className="mt-0.5 font-mono text-[9px] text-muted">23.0225° N · 72.5714° E · IST (UTC+5:30)</p>
        </div>
      </div>
    </NodeScreen>
  );
}

/* ------------------------------------------------------------------- grid -- */

export default function ContactNodes({
  github,
  leetcode,
}: {
  github: GitHubProfile | null;
  leetcode: LeetCodeProfile | null;
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-6">
      <div className="lg:col-span-2">
        <GitHubNode data={github} />
      </div>
      <div className="lg:col-span-2">
        <LeetCodeNode data={leetcode} />
      </div>
      <div className="lg:col-span-2">
        <LinkedInNode />
      </div>
      <div className="lg:col-span-3">
        <PhoneNode />
      </div>
      <div className="lg:col-span-3">
        <LocationNode />
      </div>
    </div>
  );
}
