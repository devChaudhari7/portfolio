"use client";

import { useInView, useReducedMotion } from "@/lib/hooks";
import type { ProjectFlowStep } from "@/lib/content";

interface Props {
  steps: ProjectFlowStep[];
  gold?: boolean;
  /** Gate the animation explicitly (e.g. only when the panel is open). */
  active?: boolean;
}

/** Schematic of a project's architecture as connected nodes with traveling light. */
export default function ProjectFlow({ steps, gold, active }: Props) {
  const [ref, inViewRaw] = useInView<SVGSVGElement>({ threshold: 0.3 }, true);
  const reduced = useReducedMotion();
  const inView = active ?? inViewRaw;

  const stepW = 170;
  const padX = 34;
  const w = padX * 2 + (steps.length - 1) * stepW;
  const h = 120;
  const y = 42;
  const xs = steps.map((_, i) => padX + i * stepW);
  const color = gold ? "var(--gold)" : "var(--signal)";
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

  return (
    <figure className="w-full overflow-hidden" aria-label={`Architecture flow: ${steps.map((s) => s.label).join(" → ")}`}>
      <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full" role="img">
        {/* connectors */}
        {xs.slice(0, -1).map((x, i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={xs[i + 1]} y2={y} stroke="var(--line-strong)" strokeWidth="1" />
            <line
              x1={x}
              y1={y}
              x2={xs[i + 1]}
              y2={y}
              stroke={color}
              strokeWidth="1"
              strokeOpacity={inView ? 0.5 : 0}
              strokeDasharray={stepW}
              strokeDashoffset={inView ? 0 : stepW}
              style={{ transition: "stroke-dashoffset 0.8s var(--ease), stroke-opacity 0.8s", transitionDelay: `${i * 0.15}s` }}
            />
          </g>
        ))}

        {/* traveling packet */}
        {inView && !reduced && steps.length > 1 && (
          <circle r="3.2" fill={gold ? "var(--gold)" : "var(--glow)"} style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
            <animateMotion dur={`${steps.length * 0.9}s`} repeatCount="indefinite" path={path} />
          </circle>
        )}

        {/* nodes */}
        {steps.map((s, i) => (
          <g key={i} style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s", transitionDelay: `${i * 0.15}s` }}>
            <circle cx={xs[i]} cy={y} r="9" fill="none" stroke={color} strokeOpacity="0.5" />
            <circle cx={xs[i]} cy={y} r="4" fill={color} />
            <text x={xs[i]} y={y + 30} textAnchor="middle" className="font-mono" fontSize="11" fill="var(--text)">
              {s.label}
            </text>
            {s.note && (
              <text x={xs[i]} y={y + 46} textAnchor="middle" className="font-mono" fontSize="9" fill="var(--muted)">
                {s.note}
              </text>
            )}
          </g>
        ))}
      </svg>
    </figure>
  );
}
