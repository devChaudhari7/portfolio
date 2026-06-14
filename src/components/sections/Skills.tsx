"use client";

import { useMemo, useState } from "react";
import SectionIndex from "@/components/ui/SectionIndex";
import Reveal from "@/components/ui/Reveal";
import { clusters, projects, skills, projectById, type ClusterId, type Skill } from "@/lib/content";
import { cn } from "@/lib/cn";

const W = 1000;
const H = 660;
const CX = W / 2;
const CY = H / 2;

type Focus = { type: "skill" | "project"; id: string } | null;

export default function Skills() {
  const [hovered, setHovered] = useState<Focus>(null);
  const [pinned, setPinned] = useState<Focus>(null);
  const focus = hovered ?? pinned;

  const layout = useMemo(() => {
    const rnd = (v: number) => Math.round(v * 100) / 100; // avoid SSR/client float drift
    // Show the full skill inventory; project edges light up where they exist.
    const used = skills;

    const clusterPos = new Map<ClusterId, { x: number; y: number }>();
    clusters.forEach((c, i) => {
      const a = -Math.PI / 2 + (i / clusters.length) * Math.PI * 2;
      clusterPos.set(c.id, { x: rnd(CX + Math.cos(a) * 360), y: rnd(CY + Math.sin(a) * 248) });
    });

    const byCluster = new Map<ClusterId, Skill[]>();
    used.forEach((s) => {
      const arr = byCluster.get(s.cluster) ?? [];
      arr.push(s);
      byCluster.set(s.cluster, arr);
    });

    const skillPos = new Map<string, { x: number; y: number }>();
    byCluster.forEach((arr, cid) => {
      const center = clusterPos.get(cid)!;
      arr.forEach((s, j) => {
        const ang = j * 2.399963; // golden angle
        const rad = 16 + Math.sqrt(j + 1) * 17;
        skillPos.set(s.id, { x: rnd(center.x + Math.cos(ang) * rad), y: rnd(center.y + Math.sin(ang) * rad * 0.82) });
      });
    });

    const projPos = new Map<string, { x: number; y: number }>();
    projects.forEach((p, i) => {
      const a = -Math.PI / 2 + (i / projects.length) * Math.PI * 2;
      projPos.set(p.id, { x: rnd(CX + Math.cos(a) * 150), y: rnd(CY + Math.sin(a) * 102) });
    });

    const edges: { s: string; p: string }[] = [];
    projects.forEach((p) => p.skills.forEach((sid) => skillPos.has(sid) && edges.push({ s: sid, p: p.id })));

    return { used, clusterPos, byCluster, skillPos, projPos, edges };
  }, []);

  // highlight sets
  const litSkills = new Set<string>();
  const litProjects = new Set<string>();
  if (focus?.type === "skill") {
    litSkills.add(focus.id);
    projects.forEach((p) => p.skills.includes(focus.id) && litProjects.add(p.id));
  } else if (focus?.type === "project") {
    litProjects.add(focus.id);
    projectById.get(focus.id)?.skills.forEach((s) => litSkills.add(s));
  }

  const dim = (lit: boolean) => (focus ? (lit ? 1 : 0.12) : 1);
  const focusedLabel =
    focus?.type === "skill"
      ? skills.find((s) => s.id === focus.id)?.label
      : focus?.type === "project"
        ? projectById.get(focus.id)?.name
        : null;

  return (
    <section id="skills" data-route="skills" className="section-pad relative">
      <div className="container-edge">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <SectionIndex index="03" label="skills" className="mb-6" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-[clamp(2rem,6vw,4rem)]">A constellation of capability.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-muted">
                Skills pull into six glowing clusters. Hover or tap one to see every project it powers.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="min-h-6 font-mono text-sm text-signal">{focusedLabel ? `▸ ${focusedLabel}` : " "}</p>
          </Reveal>
        </div>

        <Reveal>
          <figure
            className="relative w-full"
            role="group"
            aria-label="Skills constellation linking technologies to the projects that use them"
          >
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full touch-manipulation"
              onClick={() => setPinned(null)}
            >
              {/* edges */}
              <g>
                {layout.edges.map((e, i) => {
                  const s = layout.skillPos.get(e.s)!;
                  const p = layout.projPos.get(e.p)!;
                  const lit =
                    (focus?.type === "skill" && focus.id === e.s) ||
                    (focus?.type === "project" && focus.id === e.p);
                  return (
                    <line
                      key={i}
                      x1={s.x}
                      y1={s.y}
                      x2={p.x}
                      y2={p.y}
                      stroke="var(--signal)"
                      strokeWidth={lit ? 1.4 : 0.6}
                      strokeOpacity={lit ? 0.6 : focus ? 0.03 : 0.07}
                      style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
                    />
                  );
                })}
              </g>

              {/* cluster labels + halos */}
              {clusters.map((c) => {
                const pos = layout.clusterPos.get(c.id)!;
                return (
                  <g key={c.id} style={{ pointerEvents: "none" }}>
                    <circle cx={pos.x} cy={pos.y} r="72" fill="var(--signal)" fillOpacity={focus ? 0.015 : 0.03} />
                    <text x={pos.x} y={pos.y - 86} textAnchor="middle" className="font-mono uppercase" fontSize="13" letterSpacing="2" fill="var(--muted)" opacity={focus ? 0.4 : 0.9}>
                      {c.short}
                    </text>
                  </g>
                );
              })}

              {/* skill dots */}
              {layout.used.map((s) => {
                const pos = layout.skillPos.get(s.id)!;
                const lit = litSkills.has(s.id);
                const isFocus = focus?.type === "skill" && focus.id === s.id;
                return (
                  <g
                    key={s.id}
                    style={{ opacity: dim(lit), transition: "opacity 0.3s", cursor: "pointer" }}
                    onMouseEnter={() => setHovered({ type: "skill", id: s.id })}
                    onMouseLeave={() => setHovered(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPinned((cur) => (cur?.id === s.id ? null : { type: "skill", id: s.id }));
                    }}
                  >
                    <circle cx={pos.x} cy={pos.y} r="14" fill="transparent" />
                    {lit && <circle cx={pos.x} cy={pos.y} r="9" fill="var(--signal)" fillOpacity="0.2" />}
                    <circle cx={pos.x} cy={pos.y} r={lit ? 4.5 : 3.5} fill={lit ? "var(--glow)" : "var(--signal)"} style={{ filter: lit ? "drop-shadow(0 0 5px var(--signal))" : "none" }} />
                    {(lit || isFocus) && (
                      <text x={pos.x} y={pos.y - 12} textAnchor="middle" className="font-mono" fontSize="11" fill="var(--text)">
                        {s.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* project nodes */}
              {projects.map((p) => {
                const pos = layout.projPos.get(p.id)!;
                const lit = litProjects.has(p.id);
                return (
                  <g
                    key={p.id}
                    style={{ opacity: dim(lit), transition: "opacity 0.3s", cursor: "pointer" }}
                    onMouseEnter={() => setHovered({ type: "project", id: p.id })}
                    onMouseLeave={() => setHovered(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPinned((cur) => (cur?.id === p.id ? null : { type: "project", id: p.id }));
                    }}
                  >
                    <circle cx={pos.x} cy={pos.y} r="20" fill="var(--void)" fillOpacity="0.6" stroke="var(--signal)" strokeOpacity={lit ? 0.9 : 0.4} strokeWidth={lit ? 1.6 : 1} style={{ filter: lit ? "drop-shadow(0 0 10px var(--signal))" : "none" }} />
                    <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="font-display" fontSize="13" fontWeight="600" fill="var(--text)">
                      {p.name.length > 9 ? p.name.slice(0, 8) + "…" : p.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </figure>
        </Reveal>

        {/* accessible / SEO legend */}
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {clusters.map((c) => (
            <Reveal key={c.id}>
              <div>
                <h3 className="mono-label mb-2 !text-signal/80">{c.label}</h3>
                <ul className="space-y-1">
                  {skills
                    .filter((s) => s.cluster === c.id)
                    .map((s) => (
                      <li
                        key={s.id}
                        className={cn(
                          "text-sm text-text/70 transition-colors",
                          litSkills.has(s.id) && "text-signal",
                        )}
                      >
                        {s.label}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
