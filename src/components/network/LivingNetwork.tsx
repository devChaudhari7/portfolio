"use client";

import { useTier } from "@/lib/tier";
import { useMounted } from "@/lib/hooks";
import NetworkCanvas from "./NetworkCanvas";
import StaticNetwork from "./StaticNetwork";
import type { EngineCallbacks } from "./networkEngine";

interface Props {
  onSelect?: (projectRef: string) => void;
  onHover?: EngineCallbacks["onHoverChange"];
  className?: string;
}

/**
 * Hero network. Renders the static SVG during SSR / on Tier C, then upgrades to
 * the interactive canvas on Tier A/B once capability is resolved on the client.
 */
export default function LivingNetwork({ onSelect, onHover, className }: Props) {
  const mounted = useMounted();
  const cfg = useTier();

  if (!mounted || cfg.tier === "C") {
    return <StaticNetwork className={className} />;
  }
  return <NetworkCanvas variant="hero" onSelect={onSelect} onHover={onHover} className={className} />;
}
