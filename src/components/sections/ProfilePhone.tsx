"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { site, timeline } from "@/lib/content";
import { LANGUAGE_COLORS, type GitHubProfile, type LeetCodeProfile } from "@/lib/social";
import { cn } from "@/lib/cn";

export type AppId = "github" | "leetcode" | "linkedin";

const APPS: { id: AppId; label: string; glyph: string }[] = [
  { id: "github", label: "GitHub", glyph: "⌥" },
  { id: "leetcode", label: "LeetCode", glyph: "⌘" },
  { id: "linkedin", label: "LinkedIn", glyph: "in" },
];

/* ------------------------------------------------------------------ apps -- */

function GitHubApp({ data }: { data: GitHubProfile | null }) {
  if (!data) return <Empty handle={site.githubHandle} />;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Image
          src={data.avatar}
          alt=""
          width={56}
          height={56}
          loading="eager"
          className="rounded-full border border-line-strong"
        />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold text-text">@{data.login}</p>
          <p className="font-mono text-[10px] text-muted">on GitHub since {data.since}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-[var(--surface)]/60 py-2.5">
        {[
          [data.repos, "repos"],
          [data.followers, "followers"],
          [data.following, "following"],
        ].map(([n, l]) => (
          <div key={l as string} className="text-center">
            <p className="font-display text-base font-semibold leading-none text-text">{n}</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">{l}</p>
          </div>
        ))}
      </div>

      {data.languages.length > 0 && (
        <div>
          <p className="mono-label mb-1.5 !text-[9px]">languages</p>
          <div className="flex h-1.5 overflow-hidden rounded-full bg-[var(--elevated)]">
            {data.languages.map((l) => (
              <span
                key={l.name}
                style={{ width: `${l.pct}%`, background: LANGUAGE_COLORS[l.name] ?? "var(--signal)" }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {data.languages.map((l) => (
              <span key={l.name} className="flex items-center gap-1 font-mono text-[9px] text-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: LANGUAGE_COLORS[l.name] ?? "var(--signal)" }}
                />
                {l.name} {l.pct}%
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mono-label mb-2 !text-[9px]">repositories · {data.allRepos.length}</p>
        <ul className="space-y-2">
          {data.allRepos.map((r) => (
            <li key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-line bg-[var(--surface)]/40 p-3 transition-colors hover:border-signal/50"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-mono text-[11px] text-signal">{r.name}</span>
                  {r.stars > 0 && <span className="flex-none font-mono text-[9px] text-muted">★ {r.stars}</span>}
                </div>
                {r.description && (
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-text/70">{r.description}</p>
                )}
                {r.language && (
                  <span className="mt-1.5 flex items-center gap-1 font-mono text-[9px] text-muted">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: LANGUAGE_COLORS[r.language] ?? "var(--signal)" }}
                    />
                    {r.language}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LeetCodeApp({ data }: { data: LeetCodeProfile | null }) {
  if (!data) return <Empty handle={site.leetcodeHandle} />;

  const bars = [
    { k: "Easy", v: data.solved.easy, t: data.totals.easy, c: "#00b8a3" },
    { k: "Medium", v: data.solved.medium, t: data.totals.medium, c: "#ffb800" },
    { k: "Hard", v: data.solved.hard, t: data.totals.hard, c: "#ff375f" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {data.avatar && (
          <Image
            src={data.avatar}
            alt=""
            width={56}
            height={56}
            loading="eager"
            className="rounded-full border border-line-strong"
          />
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold text-text">{data.username}</p>
          {data.ranking && (
            <p className="font-mono text-[10px] text-muted">rank #{data.ranking.toLocaleString("en-US")}</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-line bg-[var(--surface)]/60 p-3">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-2xl font-semibold text-text">{data.solved.all}</span>
          <span className="font-mono text-[10px] text-muted">/ {data.totals.all} solved</span>
        </div>
        <div className="mt-3 space-y-2">
          {bars.map((b) => (
            <div key={b.k}>
              <div className="flex justify-between font-mono text-[9px]">
                <span style={{ color: b.c }}>{b.k}</span>
                <span className="text-muted">
                  {b.v}/{b.t}
                </span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--elevated)]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${(b.v / b.t) * 100}%`, background: b.c }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {(data.streak !== null || data.activeDays !== null) && (
        <div className="grid grid-cols-2 gap-2">
          {data.streak !== null && <MiniStat n={data.streak} label="day streak" />}
          {data.activeDays !== null && <MiniStat n={data.activeDays} label="active days" />}
        </div>
      )}

      {data.recent.length > 0 && (
        <div>
          <p className="mono-label mb-2 !text-[9px]">recently solved</p>
          <ul className="space-y-1.5">
            {data.recent.map((p) => (
              <li key={p.slug}>
                <a
                  href={`https://leetcode.com/problems/${p.slug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-line bg-[var(--surface)]/40 px-3 py-2 text-[11px] text-text/80 transition-colors hover:border-signal/50 hover:text-signal"
                >
                  <span className="text-[#00b8a3]">✓</span>
                  <span className="truncate">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.topTags.length > 0 && (
        <div>
          <p className="mono-label mb-2 !text-[9px]">strongest topics</p>
          <ul className="flex flex-wrap gap-1.5">
            {data.topTags.map((t) => (
              <li
                key={t.name}
                className="rounded-full border border-line bg-[var(--elevated)] px-2.5 py-1 font-mono text-[9px] text-text/70"
              >
                {t.name} <span className="text-signal">{t.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** LinkedIn has no public API and blocks framing, so this is assembled from
 *  the same verified content the rest of the site uses — never scraped or faked. */
function LinkedInApp() {
  const work = timeline.filter((t) => t.kind === "work");
  const edu = timeline.filter((t) => t.kind === "education");

  return (
    <div>
      <div
        className="-mx-4 -mt-4 h-20"
        style={{
          background:
            "linear-gradient(120deg, color-mix(in oklab, var(--signal-deep) 55%, transparent), color-mix(in oklab, var(--signal) 25%, transparent))",
        }}
        aria-hidden="true"
      />
      <div className="-mt-9">
        <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-void bg-[var(--elevated)]">
          <span className="font-display text-xl font-semibold text-text">DC</span>
        </div>
        <p className="mt-2 font-display text-base font-semibold text-text">{site.name}</p>
        <p className="text-[12px] leading-snug text-text/75">{site.role}</p>
        <p className="mt-1 font-mono text-[10px] text-muted">{site.location}</p>
        <p className="mt-2 inline-block rounded-full border border-signal/40 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-signal">
          open to internships
        </p>
      </div>

      <Section title="experience">
        {work.map((w) => (
          <div key={w.id} className="border-l border-line pl-3">
            <p className="text-[12px] font-medium text-text">{w.title}</p>
            <p className="text-[11px] text-text/70">{w.org}</p>
            <p className="font-mono text-[9px] text-muted">
              {w.period} · {w.meta}
            </p>
          </div>
        ))}
      </Section>

      <Section title="education">
        {edu.map((e) => (
          <div key={e.id} className="border-l border-line pl-3">
            <p className="text-[12px] font-medium text-text">{e.org}</p>
            <p className="text-[11px] text-text/70">{e.title}</p>
            <p className="font-mono text-[9px] text-muted">
              {e.period} · {e.meta}
            </p>
          </div>
        ))}
      </Section>
    </div>
  );
}

/* -------------------------------------------------------------- fragments -- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-line pt-4">
      <p className="mono-label mb-3 !text-[9px]">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MiniStat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-[var(--surface)]/60 py-2.5 text-center">
      <p className="font-display text-base font-semibold leading-none text-signal">{n}</p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}

function Empty({ handle }: { handle: string }) {
  return (
    <p className="grid h-40 place-items-center px-6 text-center font-mono text-[10px] leading-relaxed text-muted">
      couldn&apos;t reach the API just now — visit {handle} directly
    </p>
  );
}

/* ------------------------------------------------------------------ phone -- */

export default function ProfilePhone({
  open,
  app,
  onAppChange,
  onClose,
  github,
  leetcode,
}: {
  open: boolean;
  app: AppId;
  onAppChange: (a: AppId) => void;
  onClose: () => void;
  github: GitHubProfile | null;
  leetcode: LeetCodeProfile | null;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const current = APPS.find((a) => a.id === app);
  const externalHref =
    app === "github" ? site.github : app === "leetcode" ? site.leetcode : site.linkedin;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${current?.label} profile`}
        >
          <button
            className="absolute inset-0 cursor-zoom-out bg-void/85"
            onClick={onClose}
            aria-label="Close profile"
            tabIndex={-1}
          />

          <motion.div
            className="relative z-10 flex h-[86vh] max-h-[780px] w-full max-w-[380px] flex-col overflow-hidden rounded-[2.5rem] border border-line-strong bg-[var(--surface)] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)]"
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* notch */}
            <span
              className="absolute left-1/2 top-3 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-void"
              aria-hidden="true"
            />

            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-void">
              {/* status bar */}
              <div className="flex items-center justify-between px-6 pb-1 pt-3 font-mono text-[10px] text-text/70">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span className="tracking-tighter">▮▮▮</span> 100%
                </span>
              </div>

              {/* app bar */}
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <p className="font-display text-sm font-semibold text-text">{current?.label}</p>
                <div className="flex items-center gap-2">
                  <a
                    href={externalHref}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] text-muted transition-colors hover:border-signal hover:text-signal"
                  >
                    open ↗
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close profile (Esc)"
                    className="grid h-7 w-7 place-items-center rounded-full border border-line-strong text-xs text-text transition-colors hover:border-signal hover:text-signal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* scrollable screen */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-4">
                {app === "github" && <GitHubApp data={github} />}
                {app === "leetcode" && <LeetCodeApp data={leetcode} />}
                {app === "linkedin" && <LinkedInApp />}
              </div>

              {/* app switcher — browse all three without leaving the page */}
              <nav className="flex items-center justify-around border-t border-line px-2 py-2" aria-label="Profiles">
                {APPS.map((a) => {
                  const on = a.id === app;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => onAppChange(a.id)}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 transition-colors",
                        on ? "text-signal" : "text-muted hover:text-text",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-7 w-7 place-items-center rounded-lg border font-mono text-[10px]",
                          on ? "border-signal bg-signal/15" : "border-line",
                        )}
                      >
                        {a.glyph}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-widest">{a.label}</span>
                    </button>
                  );
                })}
              </nav>

              <span className="mx-auto mb-2 mt-1 h-1 w-28 rounded-full bg-line-strong" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
