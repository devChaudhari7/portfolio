"use client";

import { useEffect, useRef } from "react";
import { NetworkEngine, type EngineCallbacks } from "./networkEngine";
import { useTier, type TierConfig } from "@/lib/tier";

interface Props {
  variant: "hero" | "focus";
  activeProjectId?: string | null;
  interactive?: boolean;
  onSelect?: (projectRef: string) => void;
  onHover?: EngineCallbacks["onHoverChange"];
  className?: string;
}

export default function NetworkCanvas({
  variant,
  activeProjectId = null,
  interactive = variant === "hero",
  onSelect,
  onHover,
  className,
}: Props) {
  const cfg = useTier();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<NetworkEngine | null>(null);
  const touch = useRef({ x: 0, y: 0, moved: 0, t: 0 });

  // (Re)create the engine when the resolved tier changes.
  useEffect(() => {
    if (cfg.tier === "C") return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const effectiveCfg: TierConfig = { ...cfg, interactive: interactive && cfg.interactive };
    const engine = new NetworkEngine(canvas, effectiveCfg, {
      onSelect,
      onHoverChange: onHover,
    });
    engineRef.current = engine;

    const setSize = () => {
      const r = wrap.getBoundingClientRect();
      if (r.width && r.height) engine.resize(r.width, r.height);
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? engine.start() : engine.stop()),
      { threshold: 0.05 },
    );
    io.observe(wrap);

    if (activeProjectId) engine.reconfigure(activeProjectId);

    return () => {
      ro.disconnect();
      io.disconnect();
      engine.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg.tier]);

  // React to active-project changes (focus / reconfigure).
  useEffect(() => {
    engineRef.current?.reconfigure(activeProjectId ?? null);
  }, [activeProjectId]);

  if (cfg.tier === "C") return null;

  const onMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    const r = canvasRef.current!.getBoundingClientRect();
    engineRef.current?.setPointer(e.clientX - r.left, e.clientY - r.top, true);
  };
  const onLeave = () => engineRef.current?.clearPointer();
  const onClick = (e: React.MouseEvent) => {
    if (!onSelect) return;
    const r = canvasRef.current!.getBoundingClientRect();
    const ref = engineRef.current?.hitProject(e.clientX - r.left, e.clientY - r.top);
    if (ref) onSelect(ref);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const r = canvasRef.current!.getBoundingClientRect();
    touch.current = { x: t.clientX, y: t.clientY, moved: 0, t: performance.now() };
    engineRef.current?.setPointer(t.clientX - r.left, t.clientY - r.top, true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current.moved += Math.hypot(dx, dy);
    touch.current.x = t.clientX;
    touch.current.y = t.clientY;
    const r = canvasRef.current!.getBoundingClientRect();
    engineRef.current?.setPointer(t.clientX - r.left, t.clientY - r.top, true);
    engineRef.current?.nudge(dx * 0.5, dy * 0.5);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    engineRef.current?.clearPointer();
    if (!onSelect) return;
    const quick = performance.now() - touch.current.t < 400;
    if (touch.current.moved < 12 && quick) {
      const t = e.changedTouches[0];
      const r = canvasRef.current!.getBoundingClientRect();
      const ref = engineRef.current?.hitProject(t.clientX - r.left, t.clientY - r.top);
      if (ref) onSelect(ref);
    }
  };

  return (
    <div ref={wrapRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full touch-pan-y"
        style={{ cursor: onSelect ? "pointer" : "default" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    </div>
  );
}
