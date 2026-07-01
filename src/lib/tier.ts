"use client";

import { useSyncExternalStore } from "react";

/**
 * Rendering tiers (brief §8 — adaptive fidelity):
 *  A — full:  dense canvas network, packets, custom cursor, full choreography (capable desktop).
 *  B — light: leaner canvas, capped DPR, fewer nodes/packets (most phones/tablets).
 *  C — calm:  static SVG network, cross-fades only (reduced-motion / low-power / no-JS).
 */
export type Tier = "A" | "B" | "C";

export interface TierConfig {
  tier: Tier;
  nodeCount: number;
  maxDpr: number;
  packetRate: number; // packets spawned per second across the graph
  glow: boolean;
  interactive: boolean;
}

const CONFIGS: Record<Tier, TierConfig> = {
  A: { tier: "A", nodeCount: 64, maxDpr: 2, packetRate: 7, glow: true, interactive: true },
  B: { tier: "B", nodeCount: 34, maxDpr: 1.5, packetRate: 3, glow: true, interactive: true },
  C: { tier: "C", nodeCount: 0, maxDpr: 1, packetRate: 0, glow: false, interactive: false },
};

function detectTier(): Tier {
  if (typeof window === "undefined") return "C";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return "C";

  const cores = navigator.hardwareConcurrency ?? 4;
  // deviceMemory is non-standard but widely supported on Chromium.
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const fine = window.matchMedia("(pointer: fine)").matches;
  const wide = window.innerWidth >= 1024;

  // Very low-power → calm.
  if (cores <= 2 || mem <= 2) return "C";

  // Capable desktop/laptop → full.
  if (fine && wide && cores >= 6 && mem >= 4) return "A";

  // Everything else (phones, tablets, modest laptops) → light.
  return "B";
}

const noopSubscribe = () => () => {};

/** Resolve the tier on the client (once). Defaults to C (safe) during SSR. */
export function useTier(): TierConfig {
  return useSyncExternalStore(
    noopSubscribe,
    () => CONFIGS[detectTier()], // stable object ref per tier → no re-render loop
    () => CONFIGS.C,
  );
}

export function getTierConfig(tier: Tier): TierConfig {
  return CONFIGS[tier];
}
