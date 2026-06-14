"use client";

import { useEffect, useRef, useState } from "react";
import { usePointerFine, useReducedMotion } from "@/lib/hooks";

export default function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = fine; // show on pointer devices regardless of RM (it's not "motion noise")
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-hidden");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;
    let magnetic: HTMLElement | null = null;

    const loop = () => {
      const k = reduced ? 1 : 0.18;
      ring.x += (target.x - ring.x) * k;
      ring.y += (target.y - ring.y) * k;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("a, button, [data-magnetic], [data-cursor]");
      setHot(!!el);

      const mag = (e.target as HTMLElement)?.closest<HTMLElement>("[data-magnetic]");
      if (mag) {
        magnetic = mag;
        const r = mag.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        mag.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      } else if (magnetic) {
        magnetic.style.transform = "";
        magnetic = null;
      }
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("cursor-hidden");
      if (magnetic) magnetic.style.transform = "";
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border transition-[width,height,background,border-color] duration-200"
        style={{
          width: hot ? 46 : 26,
          height: hot ? 46 : 26,
          borderColor: "var(--signal)",
          background: hot ? "color-mix(in oklab, var(--signal) 16%, transparent)" : "transparent",
          boxShadow: hot ? "0 0 24px -4px var(--signal)" : "none",
          opacity: down ? 0.6 : 1,
        }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1 w-1 rounded-full bg-glow"
        style={{ opacity: hot ? 0 : 1, boxShadow: "0 0 8px var(--signal)" }}
        aria-hidden="true"
      />
    </>
  );
}
