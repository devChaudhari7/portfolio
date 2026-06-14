"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin top "charging" line that fills as you travel the system. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--signal-deep), var(--signal), var(--glow))",
        boxShadow: "0 0 12px var(--signal)",
      }}
      aria-hidden="true"
    />
  );
}
