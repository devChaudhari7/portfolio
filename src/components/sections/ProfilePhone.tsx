"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { site, timeline } from "@/lib/content";
import { LANGUAGE_COLORS, type GitHubProfile, type LeetCodeProfile } from "@/lib/social";
import { cn } from "@/lib/cn";

export type AppId = "github" | "leetcode" | "linkedin";

/* Each app wears its real brand colours — it should feel like you picked up a
   phone with these apps open, not like a themed widget. */
const APPS: Record<
  AppId,
  { label: string; accent: string; bg: string; surface: string; text: string; sub: string; cta: string }
> = {
  github: {
    label: "GitHub",
    accent: "#2f81f7",
    bg: "#0d1117",
    surface: "#161b22",
    text: "#e6edf3",
    sub: "#8d96a0",
    cta: "Open on GitHub",
  },
  leetcode: {
    label: "LeetCode",
    accent: "#ffa116",
    bg: "#1a1a1a",
    surface: "#282828",
    text: "#eff1f6",
    sub: "#9a9a9a",
    cta: "Open on LeetCode",
  },
  linkedin: {
    label: "LinkedIn",
    accent: "#0a66c2",
    bg: "#1b1f23",
    surface: "#26292d",
    text: "#e9e9e9",
    sub: "#9aa0a6",
    cta: "Open on LinkedIn",
  },
};

export const APP_URL: Record<AppId, string> = {
  github: site.github,
  leetcode: site.leetcode,
  linkedin: site.linkedin,
};

/* ------------------------------------------------------------------ icons -- */

function Glyph({ app, className }: { app: AppId; className?: string }) {
  if (app === "github")
    return (
      <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    );
  if (app === "leetcode")
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M13.48 0a1.37 1.37 0 0 0-.98.41L7.2 5.9a5.6 5.6 0 0 0-1.6 3.94 5.6 5.6 0 0 0 1.6 3.95l4.6 4.7a5.6 5.6 0 0 0 7.9.04l2.06-2.1a1.37 1.37 0 1 0-1.96-1.92l-2.06 2.1a2.86 2.86 0 0 1-4.03-.02l-4.6-4.7a2.86 2.86 0 0 1 0-4.06l5.3-5.5a1.37 1.37 0 0 0-.93-2.33Z" />
        <path d="M21.13 10.5H10.6a1.37 1.37 0 1 0 0 2.74h10.53a1.37 1.37 0 0 0 0-2.74Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------- apps -- */

function GitHubApp({ data }: { data: GitHubProfile | null }) {
  const t = APPS.github;
  if (!data) return <Empty handle={site.githubHandle} sub={t.sub} />;

  return (
    <div className="pb-3">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-3">
          <Image
            src={data.avatar}
            alt=""
            width={56}
            height={56}
            loading="eager"
            className="rounded-full ring-1 ring-white/15"
          />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold" style={{ color: t.text }}>
              {site.name}
            </p>
            <p className="truncate text-[12px]" style={{ color: t.sub }}>
              @{data.login}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-[11px]" style={{ color: t.sub }}>
          <span>
            <b style={{ color: t.text }}>{data.followers}</b> followers
          </span>
          <span>
            <b style={{ color: t.text }}>{data.repos}</b> repos
          </span>
          <span>since {data.since}</span>
        </div>
      </div>

      {data.languages.length > 0 && (
        <div className="mt-3.5 px-4">
          <div className="flex h-2 overflow-hidden rounded-full" style={{ background: t.surface }}>
            {data.languages.map((l) => (
              <span key={l.name} style={{ width: `${l.pct}%`, background: LANGUAGE_COLORS[l.name] ?? t.accent }} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1">
            {data.languages.slice(0, 4).map((l) => (
              <span key={l.name} className="flex items-center gap-1 text-[10px]" style={{ color: t.sub }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: LANGUAGE_COLORS[l.name] ?? t.accent }} />
                {l.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 px-4 text-[10px] font-semibold uppercase tracking-wider" style={{ color: t.sub }}>
        Repositories · {data.allRepos.length}
      </p>
      <ul className="mt-1.5">
        {data.allRepos.map((r) => (
          <li key={r.name}>
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="block border-t px-4 py-2.5 transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[13px] font-medium" style={{ color: t.accent }}>
                  {r.name}
                </span>
                {r.stars > 0 && (
                  <span className="flex-none text-[10px]" style={{ color: t.sub }}>
                    ★ {r.stars}
                  </span>
                )}
              </div>
              {r.description && (
                <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug" style={{ color: t.sub }}>
                  {r.description}
                </p>
              )}
              {r.language && (
                <span className="mt-1 flex items-center gap-1.5 text-[10px]" style={{ color: t.sub }}>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: LANGUAGE_COLORS[r.language] ?? t.accent }}
                  />
                  {r.language}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LeetCodeApp({ data }: { data: LeetCodeProfile | null }) {
  const t = APPS.leetcode;
  if (!data) return <Empty handle={site.leetcodeHandle} sub={t.sub} />;

  const bars = [
    { k: "Easy", v: data.solved.easy, tot: data.totals.easy, c: "#00b8a3" },
    { k: "Med.", v: data.solved.medium, tot: data.totals.medium, c: "#ffb800" },
    { k: "Hard", v: data.solved.hard, tot: data.totals.hard, c: "#ff375f" },
  ];
  const R = 38;
  const C = 2 * Math.PI * R;
  const pct = data.totals.all ? data.solved.all / data.totals.all : 0;

  return (
    <div className="px-4 pb-3 pt-3">
      <div className="flex items-center gap-3">
        {data.avatar && (
          <Image
            src={data.avatar}
            alt=""
            width={48}
            height={48}
            loading="eager"
            className="rounded-full ring-1 ring-white/15"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold" style={{ color: t.text }}>
            {site.name}
          </p>
          <p className="truncate text-[11px]" style={{ color: t.sub }}>
            @{data.username}
            {data.ranking && ` · #${data.ranking.toLocaleString("en-US")}`}
          </p>
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-4 rounded-2xl p-3.5" style={{ background: t.surface }}>
        <div className="relative grid flex-none place-items-center">
          <svg width="90" height="90" className="-rotate-90">
            <circle cx="45" cy="45" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <motion.circle
              cx="45"
              cy="45"
              r={R}
              fill="none"
              stroke={t.accent}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: C * (1 - pct) }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-[20px] font-semibold leading-none" style={{ color: t.text }}>
              {data.solved.all}
            </p>
            <p className="mt-0.5 text-[9px]" style={{ color: t.sub }}>
              /{data.totals.all}
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          {bars.map((b) => (
            <div key={b.k}>
              <div className="flex justify-between text-[10px]">
                <span style={{ color: b.c }}>{b.k}</span>
                <span style={{ color: t.sub }}>
                  {b.v}/{b.tot}
                </span>
              </div>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-black/40">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: b.c }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(b.v / b.tot) * 100}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {(data.streak !== null || data.activeDays !== null) && (
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {data.streak !== null && <Tile n={data.streak} label="day streak" t={t} />}
          {data.activeDays !== null && <Tile n={data.activeDays} label="active days" t={t} />}
        </div>
      )}

      {data.recent.length > 0 && (
        <>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider" style={{ color: t.sub }}>
            Recent submissions
          </p>
          <ul className="mt-1.5 overflow-hidden rounded-2xl" style={{ background: t.surface }}>
            {data.recent.map((p, i) => (
              <li key={p.slug}>
                <a
                  href={`https://leetcode.com/problems/${p.slug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("flex items-center gap-2 px-3 py-2 text-[12px] hover:bg-white/5", i > 0 && "border-t")}
                  style={{ color: t.text, borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <span style={{ color: "#00b8a3" }}>✓</span>
                  <span className="truncate">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {data.topTags.length > 0 && (
        <>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider" style={{ color: t.sub }}>
            Strongest topics
          </p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {data.topTags.map((tag) => (
              <li
                key={tag.name}
                className="rounded-full px-2.5 py-1 text-[10px]"
                style={{ background: t.surface, color: t.text }}
              >
                {tag.name} <span style={{ color: t.accent }}>{tag.count}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function LinkedInApp() {
  const t = APPS.linkedin;
  const work = timeline.filter((x) => x.kind === "work");
  const edu = timeline.filter((x) => x.kind === "education");

  return (
    <div className="pb-3">
      <div className="h-20" style={{ background: `linear-gradient(120deg, ${t.accent}, #004182)` }} />
      <div className="-mt-9 px-4">
        <div
          className="grid h-[68px] w-[68px] place-items-center rounded-full text-[22px] font-semibold"
          style={{ background: t.surface, color: t.text, boxShadow: `0 0 0 4px ${t.bg}` }}
        >
          DC
        </div>
        <p className="mt-2 text-[17px] font-semibold" style={{ color: t.text }}>
          {site.name}
        </p>
        <p className="text-[13px] leading-snug" style={{ color: t.text }}>
          {site.role}
        </p>
        <p className="mt-0.5 text-[11px]" style={{ color: t.sub }}>
          {site.location}
        </p>
        <span
          className="mt-2.5 inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{ background: t.accent, color: "#fff" }}
        >
          Open to internships
        </span>
      </div>

      <LiSection title="Experience" t={t}>
        {work.map((w) => (
          <div key={w.id} className="flex gap-2.5">
            <span className="mt-0.5 h-8 w-8 flex-none rounded" style={{ background: t.surface }} />
            <div className="min-w-0">
              <p className="text-[13px] font-medium" style={{ color: t.text }}>
                {w.title}
              </p>
              <p className="text-[12px]" style={{ color: t.text }}>
                {w.org}
              </p>
              <p className="text-[11px]" style={{ color: t.sub }}>
                {w.period}
              </p>
            </div>
          </div>
        ))}
      </LiSection>

      <LiSection title="Education" t={t}>
        {edu.map((e) => (
          <div key={e.id} className="flex gap-2.5">
            <span className="mt-0.5 h-8 w-8 flex-none rounded" style={{ background: t.surface }} />
            <div className="min-w-0">
              <p className="text-[13px] font-medium" style={{ color: t.text }}>
                {e.org}
              </p>
              <p className="text-[12px]" style={{ color: t.text }}>
                {e.title}
              </p>
              <p className="text-[11px]" style={{ color: t.sub }}>
                {e.period} · {e.meta}
              </p>
            </div>
          </div>
        ))}
      </LiSection>
    </div>
  );
}

/* -------------------------------------------------------------- fragments -- */

function LiSection({
  title,
  t,
  children,
}: {
  title: string;
  t: (typeof APPS)[AppId];
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3.5 border-t px-4 pt-3.5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <p className="mb-2.5 text-[14px] font-semibold" style={{ color: t.text }}>
        {title}
      </p>
      <div className="space-y-3.5">{children}</div>
    </div>
  );
}

function Tile({ n, label, t }: { n: number; label: string; t: (typeof APPS)[AppId] }) {
  return (
    <div className="rounded-2xl py-2.5 text-center" style={{ background: t.surface }}>
      <p className="text-[16px] font-semibold leading-none" style={{ color: t.accent }}>
        {n}
      </p>
      <p className="mt-0.5 text-[10px]" style={{ color: t.sub }}>
        {label}
      </p>
    </div>
  );
}

function Empty({ handle, sub }: { handle: string; sub: string }) {
  return (
    <p className="grid h-40 place-items-center px-7 text-center text-[11px] leading-relaxed" style={{ color: sub }}>
      Couldn&apos;t reach the API just now — visit {handle} directly.
    </p>
  );
}

/* ----------------------------------------------------------------- device -- */

/**
 * A real iPhone rendered inline — titanium chassis, Dynamic Island, iOS status
 * bar, home indicator. The screen scrolls in place, so the profile is browsed
 * on the page; the action bar is the only thing that leaves for the real site.
 */
export default function ProfileDevice({
  app,
  github,
  leetcode,
  className,
}: {
  app: AppId;
  github: GitHubProfile | null;
  leetcode: LeetCodeProfile | null;
  className?: string;
}) {
  const t = APPS[app];

  return (
    <div
      className={cn(
        "relative rounded-[2.6rem] p-[3px] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.9)]",
        className,
      )}
      style={{
        background: "linear-gradient(150deg, #6f7379 0%, #2b2e33 22%, #8b9097 50%, #2b2e33 78%, #6f7379 100%)",
      }}
    >
      {/* side buttons */}
      <span className="absolute -left-[2px] top-[92px] h-7 w-[3px] rounded-l bg-[#4a4d52]" aria-hidden="true" />
      <span className="absolute -left-[2px] top-[130px] h-10 w-[3px] rounded-l bg-[#4a4d52]" aria-hidden="true" />
      <span className="absolute -right-[2px] top-[115px] h-14 w-[3px] rounded-r bg-[#4a4d52]" aria-hidden="true" />

      <div
        className="relative flex h-[540px] w-full flex-col overflow-hidden rounded-[2.4rem] ring-1 ring-black/60"
        style={{ background: t.bg }}
      >
        {/* Dynamic Island */}
        <div
          className="pointer-events-none absolute left-1/2 top-2 z-30 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2.5"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#1c2530]" />
        </div>

        {/* status bar */}
        <div
          className="relative z-20 flex flex-none items-center justify-between px-6 pb-1 pt-3.5 text-[11px] font-semibold"
          style={{ color: t.text }}
        >
          <span>9:41</span>
          <span className="flex items-center gap-1" aria-hidden="true">
            <svg width="15" height="10" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="1" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 16 11" fill="currentColor">
              <path d="M8 10.5 5.6 8a3.4 3.4 0 0 1 4.8 0L8 10.5ZM3.2 5.6a6.8 6.8 0 0 1 9.6 0l-1.4 1.5a4.8 4.8 0 0 0-6.8 0L3.2 5.6ZM.8 3.2a10.2 10.2 0 0 1 14.4 0l-1.4 1.4a8.2 8.2 0 0 0-11.6 0L.8 3.2Z" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke="currentColor" strokeOpacity="0.4" />
              <rect x="2" y="2" width="18" height="8" rx="2" fill="currentColor" />
              <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </span>
        </div>

        {/* app bar */}
        <div
          className="relative z-20 flex flex-none items-center gap-2 border-b px-4 pb-2 pt-0.5"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Glyph app={app} className="h-3.5 w-3.5" />
          <span className="text-[13px] font-semibold" style={{ color: t.text }}>
            {t.label}
          </span>
        </div>

        {/* the screen — scrolls in place */}
        <div
          data-lenis-prevent
          className="relative flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {app === "github" && <GitHubApp data={github} />}
          {app === "leetcode" && <LeetCodeApp data={leetcode} />}
          {app === "linkedin" && <LinkedInApp />}
        </div>

        {/* action bar — the one thing that leaves the page */}
        <div
          className="flex-none border-t px-3 pb-5 pt-2.5 backdrop-blur"
          style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.35)" }}
        >
          <a
            href={APP_URL[app]}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[12px] font-semibold transition-opacity hover:opacity-90"
            style={{ background: t.accent, color: app === "leetcode" ? "#1a1a1a" : "#fff" }}
          >
            {t.cta} ↗
          </a>
        </div>

        {/* home indicator */}
        <span
          className="pointer-events-none absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full"
          style={{ background: t.text, opacity: 0.35 }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
