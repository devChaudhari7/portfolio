"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";

const rnd = (v: number) => Math.round(v * 100) / 100;
const NODES = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
  return { x: rnd(50 + Math.cos(a) * 34), y: rnd(50 + Math.sin(a) * 34) };
});

export default function BootSequence() {
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem("booted", "1");
    } catch {}
    setShow(false);
  }, []);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let already = false;
    try {
      already = sessionStorage.getItem("booted") === "1";
    } catch {}
    // Hide immediately if already shown this session, else after the boot
    // duration — both go through finish() in a callback, never a direct
    // setState in the effect body.
    const t = setTimeout(finish, already ? 0 : rm ? 700 : 2500);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  const name = site.name.toUpperCase();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-8 px-6">
            {!reduced && (
              <svg width="180" height="180" viewBox="0 0 100 100" className="overflow-visible">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="3"
                  fill="var(--glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.6, 1], opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "50px 50px", filter: "drop-shadow(0 0 6px var(--signal))" }}
                />
                {NODES.map((n, i) => (
                  <g key={i}>
                    <motion.line
                      x1="50"
                      y1="50"
                      x2={n.x}
                      y2={n.y}
                      stroke="var(--signal)"
                      strokeWidth="0.6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r="1.8"
                      fill="var(--signal)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
                      style={{ transformOrigin: `${n.x}px ${n.y}px`, filter: "drop-shadow(0 0 4px var(--signal))" }}
                    />
                  </g>
                ))}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--signal)"
                  strokeWidth="0.4"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "50px 50px" }}
                />
              </svg>
            )}

            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-2xl font-semibold tracking-[0.2em] text-text sm:text-3xl"
                initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: reduced ? 0 : 1.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {name}
              </motion.h1>
            </div>

            <motion.p
              className="mono-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: reduced ? 0.1 : 1.7 }}
            >
              system coming online…
            </motion.p>
          </div>

          {!reduced && (
            <button
              type="button"
              onClick={finish}
              className="mono-label absolute bottom-8 right-8 text-muted transition-colors hover:text-signal"
            >
              skip →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
