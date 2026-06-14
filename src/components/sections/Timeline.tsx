"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import SectionIndex from "@/components/ui/SectionIndex";
import Reveal from "@/components/ui/Reveal";
import { timeline, type TimelineItem } from "@/lib/content";
import { useInView } from "@/lib/hooks";

function Milestone({ item }: { item: TimelineItem }) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.4 }, true);
  return (
    <li ref={ref} className="relative pl-10">
      <span
        className="absolute left-[7px] top-1.5 grid h-4 w-4 place-items-center rounded-full border transition-all duration-700"
        style={{
          borderColor: inView ? "var(--signal)" : "var(--line-strong)",
          background: inView ? "color-mix(in oklab, var(--signal) 30%, transparent)" : "transparent",
          boxShadow: inView ? "0 0 14px var(--signal)" : "none",
        }}
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: inView ? "var(--glow)" : "var(--muted)" }} />
      </span>
      <p className="font-mono text-xs text-signal/80">{item.period}</p>
      <h4 className="mt-1 font-display text-lg font-semibold text-text">{item.title}</h4>
      <p className="text-sm text-text/80">{item.org}</p>
      <p className="mb-3 font-mono text-[11px] text-muted">{item.meta}</p>
      <ul className="space-y-1.5">
        {item.bullets.map((b, i) => (
          <li key={i} className="text-sm leading-relaxed text-text/70">
            {b}
          </li>
        ))}
      </ul>
    </li>
  );
}

function Path({ title, items }: { title: string; items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const raw = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });
  const height = useTransform(raw, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref}>
      <p className="mono-label mb-7">{title}</p>
      <div className="relative">
        <span className="absolute bottom-0 left-[14px] top-0 w-px bg-line" aria-hidden="true" />
        <motion.span
          className="absolute left-[14px] top-0 w-px origin-top"
          style={{ height, background: "linear-gradient(var(--glow), var(--signal), transparent)", boxShadow: "0 0 10px var(--signal)" }}
          aria-hidden="true"
        />
        <ul className="space-y-12">
          {items.map((it) => (
            <Milestone key={it.id} item={it} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Timeline() {
  const experience = timeline.filter((t) => t.kind === "work");
  const education = timeline.filter((t) => t.kind === "education");

  return (
    <section id="path" data-route="path" className="section-pad relative">
      <div className="container-edge">
        <Reveal>
          <SectionIndex index="04" label="experience & education" className="mb-6" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mb-14 text-[clamp(2rem,6vw,4rem)]">Signal along the path.</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
          <Path title="// experience" items={experience} />
          <Path title="// education" items={education} />
        </div>
      </div>
    </section>
  );
}
