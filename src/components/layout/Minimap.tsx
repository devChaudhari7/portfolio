"use client";

import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/cn";

const STATIONS = [
  { id: "hero", label: "Origin" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "skills", label: "Skills" },
  { id: "path", label: "Path" },
  { id: "achievements", label: "Signals" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Connect" },
];

export default function Minimap() {
  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let top = "";
        let max = 0;
        ratios.forEach((v, k) => {
          if (v > max) {
            max = v;
            top = k;
          }
        });
        if (top) setActive(top);
      },
      { threshold: [0.15, 0.5] },
    );
    STATIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Section navigator"
    >
      <ul className="relative flex flex-col items-end gap-4">
        <span className="absolute right-[5px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        {STATIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="group relative flex items-center gap-2">
              <span
                className={cn(
                  "mono-label order-1 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
                  on && "translate-x-0 !text-signal opacity-100",
                )}
              >
                {s.label}
              </span>
              <button
                type="button"
                onClick={() => scrollTo(`#${s.id}`, { offset: 70 })}
                aria-label={`Go to ${s.label}`}
                aria-current={on ? "true" : undefined}
                className="relative order-2 grid h-3 w-3 place-items-center"
              >
                <span
                  className={cn(
                    "block rounded-full border transition-all duration-300",
                    on
                      ? "h-3 w-3 border-signal bg-signal/30 shadow-[0_0_12px_var(--signal)]"
                      : "h-2 w-2 border-muted/50 group-hover:border-signal",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
