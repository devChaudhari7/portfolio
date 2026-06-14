"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const ECG_PATH = "M0 12 H10 L13 12 L16 4 L19 20 L22 9 L25 12 H40 L43 12 L46 6 L49 16 L52 12 H64";

function fmt(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function TelemetryHUD() {
  const [uptime, setUptime] = useState(0);
  const [route, setRoute] = useState("boot");
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setUptime((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-route]"));
    if (!sections.length) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set((e.target as HTMLElement).dataset.route!, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let top = "";
        let max = 0;
        ratios.forEach((v, k) => {
          if (v > max) {
            max = v;
            top = k;
          }
        });
        if (top) setRoute(top);
      },
      { threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <aside
      className="pointer-events-none fixed bottom-4 left-4 z-40 hidden select-none sm:block"
      aria-hidden="true"
    >
      <div className="panel flex items-center gap-3 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" style={!reduced ? { animation: "ring-pulse 1.6s var(--ease) infinite" } : undefined} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          SYS·ONLINE
        </span>
        <span className="text-line-strong">|</span>
        <span>UP {fmt(uptime)}</span>
        <span className="text-line-strong">|</span>
        <span className="text-signal/90">// {route}</span>
        <svg width="64" height="20" viewBox="0 0 64 20" className="overflow-visible" fill="none">
          <path d={ECG_PATH} stroke="var(--signal)" strokeOpacity="0.35" strokeWidth="1" />
          {!reduced && (
            <circle r="1.6" fill="var(--glow)" style={{ filter: "drop-shadow(0 0 4px var(--signal))" }}>
              <animateMotion dur="2.2s" repeatCount="indefinite" path={ECG_PATH} />
            </circle>
          )}
        </svg>
      </div>
    </aside>
  );
}
