"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollCtx {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void;
}

const Ctx = createContext<ScrollCtx>({ scrollTo: () => {} });
export const useSmoothScroll = () => useContext(Ctx);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Stable scrollTo — reads the Lenis instance at call time. Falls back to native
  // scroll when Lenis isn't active (reduced-motion) or hasn't initialised yet.
  const scrollTo = useCallback((target: string | number | HTMLElement, opts?: { offset?: number }) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as string, { offset: -(opts?.offset ?? 0), duration: 1.2 });
      return;
    }
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY - (opts?.offset ?? 0);
      window.scrollTo({ top, behavior: "auto" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "auto" });
    }
  }, []);

  const ctx = useMemo<ScrollCtx>(() => ({ scrollTo }), [scrollTo]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // no Lenis; scrollTo uses the native fallback above

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
