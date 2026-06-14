import { buildGraph, type GraphNode } from "./graphData";

const W = 1000;
const H = 720;
const CX = W / 2;
const CY = H / 2;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

interface Placed extends GraphNode {
  x: number;
  y: number;
  r: number;
}

/** Deterministic, SSR-safe layout of the same graph — no animation. */
function placeNodes(): { nodes: Map<string, Placed>; list: Placed[] } {
  const { nodes } = buildGraph(40);
  const map = new Map<string, Placed>();
  // Round to kill cross-engine float drift (server Node vs client V8) → no hydration mismatch.
  const rnd = (v: number) => Math.round(v * 100) / 100;

  const projects = nodes.filter((n) => n.kind === "project");
  const clusters = nodes.filter((n) => n.kind === "cluster");
  const achievements = nodes.filter((n) => n.kind === "achievement");
  const skills = nodes.filter((n) => n.kind === "skill");

  const put = (n: GraphNode, x: number, y: number) =>
    map.set(n.id, { ...n, x: rnd(x), y: rnd(y), r: rnd(3 + n.weight * 3) });

  const self = nodes.find((n) => n.kind === "self");
  if (self) put(self, CX, CY);

  const ring = (arr: GraphNode[], rx: number, ry: number, off: number) =>
    arr.forEach((n, i) => {
      const a = off + (i / Math.max(1, arr.length)) * Math.PI * 2;
      put(n, CX + Math.cos(a) * rx, CY + Math.sin(a) * ry);
    });

  ring(projects, W * 0.22, H * 0.24, -Math.PI / 2);
  ring(achievements, W * 0.33, H * 0.34, Math.PI / 6);
  ring(clusters, W * 0.45, H * 0.42, Math.PI / 5);

  for (const n of skills) {
    const a = (hash(n.id) % 360) * (Math.PI / 180);
    const rad = 0.3 + (hash(n.id + "r") % 100) / 100 * 0.12;
    put(n, CX + Math.cos(a) * W * rad, CY + Math.sin(a) * H * rad);
  }

  return { nodes: map, list: [...map.values()] };
}

export default function StaticNetwork({ className }: { className?: string }) {
  const { nodes, list } = placeNodes();
  const { edges } = buildGraph(40);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="var(--signal)" strokeOpacity="0.14" strokeWidth="1">
        {edges.map((e, i) => {
          const a = nodes.get(e.a);
          const b = nodes.get(e.b);
          if (!a || !b) return null;
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>

      {list.map((n) => {
        const gold = n.gold;
        const glowR = n.r * 5 + 10;
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={glowR} fill={`url(#${gold ? "goldGlow" : "nodeGlow"})`} />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r + 3}
              fill="none"
              stroke={gold ? "var(--gold)" : "var(--glow)"}
              strokeOpacity="0.4"
            />
            <circle cx={n.x} cy={n.y} r={n.r} fill={gold ? "var(--gold)" : "var(--glow)"} fillOpacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}
