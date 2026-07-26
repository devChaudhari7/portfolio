"use client";

import { useEffect, useState } from "react";
import { useInView, useMediaQuery, useReducedMotion } from "@/lib/hooks";
import ProfileDevice, { type AppId } from "./ProfilePhone";
import { site } from "@/lib/content";
import type { GitHubProfile, LeetCodeProfile } from "@/lib/social";
import { cn } from "@/lib/cn";

/* --------------------------------------------------------------- the stage -- */

// Shallow tilts on purpose: a steep rotateY magnifies the near edge, and the
// browser rasterises the layer flat before transforming it, so the outer phones
// went soft. 18° keeps the depth without visibly resampling the screen.
const LAYOUT: { app: AppId; rotate: number; z: number; scale: number; delay: string }[] = [
  { app: "github", rotate: 18, z: -40, scale: 0.95, delay: "0s" },
  { app: "leetcode", rotate: 0, z: 50, scale: 1, delay: "-2s" },
  { app: "linkedin", rotate: -18, z: -40, scale: 0.95, delay: "-4s" },
];

function Device({
  conf,
  github,
  leetcode,
  flat,
  reduced,
}: {
  conf: (typeof LAYOUT)[number];
  github: GitHubProfile | null;
  leetcode: LeetCodeProfile | null;
  flat: boolean;
  reduced: boolean;
}) {
  // "active" = pointer over it OR keyboard focus inside it, so tabbing through
  // the profile links brings the same phone forward that a mouse would.
  const [active, setActive] = useState(false);

  // Plain CSS transforms — deterministic, GPU-composited, and they can't be
  // left un-applied by an animation library that hydrates a beat late.
  const transform = flat
    ? undefined
    : active
      ? "rotateY(0deg) translateZ(130px) scale(1.06)"
      : `rotateY(${conf.rotate}deg) translateZ(${conf.z}px) scale(${conf.scale})`;
  const hovered = active;

  return (
    <div
      // outer wrapper owns the float, so it never fights the tilt transform
      className={cn("relative", !reduced && !flat && "motion-safe:animate-[drift_9s_ease-in-out_infinite]")}
      style={{ animationDelay: conf.delay, zIndex: hovered ? 30 : conf.z > 0 ? 20 : 10 }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform,
          // promote to its own layer so the 3D raster is generated at the
          // transformed scale rather than being upscaled after the fact
          willChange: flat ? undefined : "transform",
          backfaceVisibility: "hidden",
          transition: reduced ? undefined : "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocusCapture={() => setActive(true)}
        onBlurCapture={() => setActive(false)}
      >
        {/* signal pooling under the device */}
        <span
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-3xl transition-opacity duration-700"
          style={{
            background: "radial-gradient(closest-side, color-mix(in oklab, var(--signal) 26%, transparent), transparent)",
            opacity: hovered ? 0.85 : 0.3,
          }}
          aria-hidden="true"
        />
        <ProfileDevice
          app={conf.app}
          github={github}
          leetcode={leetcode}
          className="w-[268px] sm:w-[276px]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ keypad strip -- */

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

function DialStrip() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 }, true);
  const reduced = useReducedMotion();
  const [lit, setLit] = useState<string | null>(null);
  const [typed, setTyped] = useState("");

  const digits = site.phoneHref.replace(/\D/g, "").slice(-10);
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
      // Slice rather than append: the updater form read `i` after it had already
      // been incremented, which dropped the first digit and tacked on
      // digits[10] === undefined. Deriving from the index is also idempotent,
      // so a double-invoked effect can't duplicate the number.
      setLit(digits[i]);
      setTyped(digits.slice(0, i + 1));
      i++;
    }, 240);
    return () => clearInterval(id);
  }, [inView, reduced, digits]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
      <div className="grid grid-cols-3 gap-1.5">
        {KEYS.map((k) => (
          <span
            key={k}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full border font-mono text-[10px] transition-all duration-200",
              lit === k
                ? "border-signal bg-signal/20 text-signal shadow-[0_0_12px_-2px_var(--signal)]"
                : "border-line text-text/50",
            )}
          >
            {k}
          </span>
        ))}
      </div>
      <div className="text-center sm:text-left">
        <p className="mono-label mb-1">{"// direct line"}</p>
        <a
          href={`tel:${site.phoneHref}`}
          className="font-display text-xl font-semibold tracking-wide text-text transition-colors hover:text-signal"
        >
          +91 {shown.slice(0, 5)} {shown.slice(5)}
          {!reduced && shown.length < digits.length && <span className="animate-blink">|</span>}
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- location strip -- */

function LocationStrip() {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <svg viewBox="0 0 120 120" className="h-24 w-24 flex-none" role="img" aria-label="Ahmedabad, India">
        <defs>
          <radialGradient id="loc-sweep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[20, 36, 52].map((r) => (
          <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="var(--signal)" strokeOpacity="0.18" />
        ))}
        {!reduced && (
          <g style={{ transformOrigin: "60px 60px", animation: "spin 4s linear infinite" }}>
            <path d="M60 60 L60 8 A52 52 0 0 1 96 23 Z" fill="url(#loc-sweep)" />
          </g>
        )}
        <circle cx="60" cy="60" r="3.5" fill="var(--glow)" style={{ filter: "drop-shadow(0 0 6px var(--signal))" }} />
        {!reduced && (
          <circle cx="60" cy="60" r="3.5" fill="none" stroke="var(--signal)" strokeWidth="1.5">
            <animate attributeName="r" from="3.5" to="26" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
      <div className="text-center sm:text-left">
        <p className="mono-label mb-1">{"// based in"}</p>
        <a
          href="https://www.google.com/maps/place/Ahmedabad,+Gujarat"
          target="_blank"
          rel="noreferrer"
          className="font-display text-xl font-semibold text-text transition-colors hover:text-signal"
        >
          {site.location}
        </a>
        <p className="mt-1 font-mono text-[10px] text-muted">23.0225° N · 72.5714° E · IST</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- root -- */

export default function ContactNodes({
  github,
  leetcode,
}: {
  github: GitHubProfile | null;
  leetcode: LeetCodeProfile | null;
}) {
  const lg = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();
  const flat = !lg;

  return (
    <div className="w-full">
      {/* three phones, live and scrollable in place */}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-0",
          lg && "[perspective:2200px]",
        )}
      >
        {LAYOUT.map((conf, i) => (
          <div key={conf.app} className={cn(i === 1 ? "lg:-mx-6" : "")}>
            <Device conf={conf} github={github} leetcode={leetcode} flat={flat} reduced={reduced} />
          </div>
        ))}
      </div>

      <p className="mt-10 text-center font-mono text-[11px] text-muted/80">
        {lg
          ? "scroll any screen · hover to bring it forward · the button opens the real profile"
          : "scroll any screen · the button opens the real profile"}
      </p>

      {/* the remaining two channels — no boxes, just signal */}
      <div className="mt-14 flex flex-col items-center justify-center gap-12 border-t border-line pt-12 sm:gap-20 lg:flex-row">
        <DialStrip />
        <LocationStrip />
      </div>
    </div>
  );
}
