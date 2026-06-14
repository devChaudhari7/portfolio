"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const [ctx, setCtx] = useState<ScrollCtx>({ scrollTo: () => {} });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      setCtx({
        scrollTo: (target, opts) => {
          const el = typeof target === "string" ? document.querySelector(target) : target;
          if (el instanceof HTMLElement) {
            const top = el.getBoundingClientRect().top + window.scrollY - (opts?.offset ?? 0);
            window.scrollTo({ top, behavior: "auto" });
          } else if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "auto" });
          }
        },
      });
      return;
    }

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

    setCtx({
      scrollTo: (target, opts) =>
        lenis.scrollTo(target as string, { offset: -(opts?.offset ?? 0), duration: 1.2 }),
    });

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
