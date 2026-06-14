import { buildGraph, projectSkillNodeIds, type NodeKind } from "./graphData";
import type { TierConfig } from "@/lib/tier";

interface SimNode {
  id: string;
  kind: NodeKind;
  label: string;
  ref?: string;
  gold?: boolean;
  weight: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  targetX: number; // target home (lerped into homeX/Y for smooth reconfigure)
  targetY: number;
  baseR: number;
  r: number;
  activation: number;
  targetActivation: number;
  phase: number;
}

interface SimEdge {
  a: SimNode;
  b: SimNode;
  charge: number;
  targetCharge: number;
}

interface Packet {
  edge: SimEdge;
  t: number;
  speed: number;
  gold: boolean;
}

interface Colors {
  signal: [number, number, number];
  glow: [number, number, number];
  gold: [number, number, number];
  muted: [number, number, number];
}

export interface EngineCallbacks {
  onHoverChange?: (node: { id: string; ref?: string; kind: NodeKind; label: string } | null) => void;
  onSelect?: (projectRef: string) => void;
}

const FALLBACK: Colors = {
  signal: [92, 200, 255],
  glow: [155, 225, 255],
  gold: [255, 206, 106],
  muted: [126, 135, 155],
};

function readColors(): Colors {
  if (typeof window === "undefined") return FALLBACK;
  const cs = getComputedStyle(document.documentElement);
  const parse = (name: string, fb: [number, number, number]): [number, number, number] => {
    const hex = cs.getPropertyValue(name).trim();
    const m = /^#?([0-9a-f]{6})$/i.exec(hex);
    if (!m) return fb;
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  return {
    signal: parse("--signal", FALLBACK.signal),
    glow: parse("--glow", FALLBACK.glow),
    gold: parse("--gold", FALLBACK.gold),
    muted: parse("--muted", FALLBACK.muted),
  };
}

function makeGlowSprite([r, g, b]: [number, number, number]): HTMLCanvasElement {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},0.35)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

export class NetworkEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cfg: TierConfig;
  private cb: EngineCallbacks;
  private colors: Colors;
  private glowSignal: HTMLCanvasElement;
  private glowGold: HTMLCanvasElement;

  private nodes: SimNode[] = [];
  private edges: SimEdge[] = [];
  private byId = new Map<string, SimNode>();
  private packets: Packet[] = [];

  private w = 0;
  private h = 0;
  private dpr = 1;

  private raf = 0;
  private last = 0;
  private running = false;
  private spawnAcc = 0;

  private pointer = { x: 0, y: 0, active: false };
  private hoveredId: string | null = null;
  private activeProject: string | null = null;

  constructor(canvas: HTMLCanvasElement, cfg: TierConfig, cb: EngineCallbacks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true })!;
    this.cfg = cfg;
    this.cb = cb;
    this.colors = readColors();
    this.glowSignal = makeGlowSprite(this.colors.signal);
    this.glowGold = makeGlowSprite(this.colors.gold);

    const graph = buildGraph(cfg.nodeCount);
    this.nodes = graph.nodes.map((n) => ({
      id: n.id,
      kind: n.kind,
      label: n.label,
      ref: n.ref,
      gold: n.gold,
      weight: n.weight,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      homeX: 0,
      homeY: 0,
      targetX: 0,
      targetY: 0,
      baseR: 2 + n.weight * 2.4,
      r: 2 + n.weight * 2.4,
      activation: baseActivation(n.kind, n.gold),
      targetActivation: baseActivation(n.kind, n.gold),
      phase: Math.random() * Math.PI * 2,
    }));
    this.byId = new Map(this.nodes.map((n) => [n.id, n]));
    this.edges = graph.edges
      .map((e) => {
        const a = this.byId.get(e.a);
        const b = this.byId.get(e.b);
        return a && b ? { a, b, charge: 0.18, targetCharge: 0.18 } : null;
      })
      .filter((e): e is SimEdge => e !== null);
  }

  /* ----------------------------- layout / sizing ---------------------------- */

  resize(cssW: number, cssH: number) {
    this.dpr = Math.min(window.devicePixelRatio || 1, this.cfg.maxDpr);
    this.w = cssW;
    this.h = cssH;
    this.canvas.width = Math.round(cssW * this.dpr);
    this.canvas.height = Math.round(cssH * this.dpr);
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.layout(true);
  }

  private layout(initial = false) {
    const cx = this.w / 2;
    const cy = this.h / 2;
    const rx = this.w * 0.42;
    const ry = this.h * 0.42;

    const projects = this.nodes.filter((n) => n.kind === "project");
    const clusters = this.nodes.filter((n) => n.kind === "cluster");
    const achievements = this.nodes.filter((n) => n.kind === "achievement");

    const place = (n: SimNode, fx: number, fy: number) => {
      n.targetX = cx + fx * rx;
      n.targetY = cy + fy * ry;
      if (initial) {
        n.homeX = n.targetX;
        n.homeY = n.targetY;
        n.x = n.targetX + (Math.random() - 0.5) * 40;
        n.y = n.targetY + (Math.random() - 0.5) * 40;
      }
    };

    const ring = (arr: SimNode[], radius: number, offset = 0) => {
      arr.forEach((n, i) => {
        const ang = offset + (i / Math.max(1, arr.length)) * Math.PI * 2;
        place(n, Math.cos(ang) * radius, Math.sin(ang) * radius);
      });
    };

    const self = this.byId.get("self");
    if (self) place(self, 0, 0);

    ring(projects, 0.46, -Math.PI / 2);
    ring(achievements, 0.72, Math.PI / 6);
    ring(clusters, 0.97, Math.PI / 5);

    // skills: anchor near their cluster node
    for (const n of this.nodes) {
      if (n.kind !== "skill") continue;
      const cl = this.edges.find((e) => (e.a === n && e.b.kind === "cluster") || (e.b === n && e.a.kind === "cluster"));
      const clusterNode = cl ? (cl.a.kind === "cluster" ? cl.a : cl.b) : self;
      const baseX = clusterNode ? clusterNode.targetX : cx;
      const baseY = clusterNode ? clusterNode.targetY : cy;
      const jx = (Math.random() - 0.5) * rx * 0.34;
      const jy = (Math.random() - 0.5) * ry * 0.34;
      // pull skills slightly inward from their cluster
      n.targetX = cx + (baseX - cx) * 0.78 + jx;
      n.targetY = cy + (baseY - cy) * 0.78 + jy;
      if (initial) {
        n.homeX = n.targetX;
        n.homeY = n.targetY;
        n.x = n.targetX + (Math.random() - 0.5) * 40;
        n.y = n.targetY + (Math.random() - 0.5) * 40;
      }
    }
  }

  /* ------------------------------- interaction ------------------------------ */

  setPointer(x: number, y: number, active: boolean) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = active;
    if (active) this.updateHover();
  }

  clearPointer() {
    this.pointer.active = false;
    if (this.hoveredId) {
      this.hoveredId = null;
      this.cb.onHoverChange?.(null);
    }
  }

  nudge(dx: number, dy: number) {
    for (const n of this.nodes) {
      n.vx += dx * 0.4;
      n.vy += dy * 0.4;
    }
  }

  private updateHover() {
    let best: SimNode | null = null;
    let bestD = Infinity;
    for (const n of this.nodes) {
      const d = Math.hypot(n.x - this.pointer.x, n.y - this.pointer.y);
      const hit = n.r + 16;
      if (d < hit && d < bestD) {
        best = n;
        bestD = d;
      }
    }
    const id = best?.id ?? null;
    if (id !== this.hoveredId) {
      this.hoveredId = id;
      this.cb.onHoverChange?.(best ? { id: best.id, ref: best.ref, kind: best.kind, label: best.label } : null);
    }
  }

  /** Returns project ref if a project node is under the point (for click/tap). */
  hitProject(x: number, y: number): string | null {
    for (const n of this.nodes) {
      if (n.kind !== "project") continue;
      if (Math.hypot(n.x - x, n.y - y) < n.r + 18) return n.ref ?? null;
    }
    return null;
  }

  /** Re-wire the graph around an active project (or restore the default field). */
  reconfigure(projectId: string | null) {
    this.activeProject = projectId;

    if (!projectId) {
      for (const n of this.nodes) n.targetActivation = baseActivation(n.kind, n.gold);
      for (const e of this.edges) e.targetCharge = 0.18;
      this.layout(false);
      return;
    }

    const activeNodeId = `p:${projectId}`;
    const skillIds = new Set(projectSkillNodeIds(projectId));
    const cx = this.w / 2;
    const cy = this.h / 2;

    for (const n of this.nodes) {
      if (n.id === activeNodeId) n.targetActivation = 1;
      else if (skillIds.has(n.id)) n.targetActivation = 0.95;
      else if (n.id === "self") n.targetActivation = 0.7;
      else if (n.kind === "project") n.targetActivation = 0.16;
      else n.targetActivation = 0.08;
    }

    const active = this.byId.get(activeNodeId);
    if (active) {
      active.targetX = cx;
      active.targetY = cy;
    }
    // arrange the lit skills in a ring around the new core
    const lit = this.nodes.filter((n) => skillIds.has(n.id));
    const radius = Math.min(this.w, this.h) * 0.3;
    lit.forEach((n, i) => {
      const ang = -Math.PI / 2 + (i / Math.max(1, lit.length)) * Math.PI * 2;
      n.targetX = cx + Math.cos(ang) * radius;
      n.targetY = cy + Math.sin(ang) * radius * 0.9;
    });
    // push everything else gently outward
    for (const n of this.nodes) {
      if (n.id === activeNodeId || skillIds.has(n.id) || n.id === "self") continue;
      const dx = n.homeX - cx;
      const dy = n.homeY - cy;
      n.targetX = cx + dx * 1.18;
      n.targetY = cy + dy * 1.18;
    }
    for (const e of this.edges) {
      const linked = e.a.id === activeNodeId || e.b.id === activeNodeId;
      e.targetCharge = linked ? 0.9 : 0.05;
    }
  }

  /* --------------------------------- loop ----------------------------------- */

  setConfig(cfg: TierConfig) {
    this.cfg = cfg;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    this.cb = {};
  }

  private frame = (now: number) => {
    if (!this.running) return;
    if (document.hidden) {
      this.last = now;
      this.raf = requestAnimationFrame(this.frame);
      return;
    }
    const dt = Math.min((now - this.last) / 1000, 1 / 30);
    this.last = now;
    this.step(dt, now / 1000);
    this.render(now / 1000);
    this.raf = requestAnimationFrame(this.frame);
  };

  private step(dt: number, t: number) {
    const nodes = this.nodes;
    const kAnchor = 2.6;
    const damping = 0.86;
    const repuls = 4200;

    // lerp homes toward targets (smooth reconfigure morph)
    for (const n of nodes) {
      n.homeX += (n.targetX - n.homeX) * Math.min(1, dt * 3.2);
      n.homeY += (n.targetY - n.homeY) * Math.min(1, dt * 3.2);
      n.activation += (n.targetActivation - n.activation) * Math.min(1, dt * 4);
      n.r = n.baseR * (0.7 + n.activation * 0.6);
    }
    for (const e of this.edges) e.charge += (e.targetCharge - e.charge) * Math.min(1, dt * 4);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      // breathing drift around the home anchor
      const driftX = Math.cos(t * 0.5 + n.phase) * 5;
      const driftY = Math.sin(t * 0.42 + n.phase) * 5;
      let ax = (n.homeX + driftX - n.x) * kAnchor;
      let ay = (n.homeY + driftY - n.y) * kAnchor;

      // short-range repulsion
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const d2 = dx * dx + dy * dy + 0.01;
        if (d2 < 120 * 120) {
          const f = repuls / d2;
          const d = Math.sqrt(d2);
          const ux = dx / d;
          const uy = dy / d;
          ax += ux * f;
          ay += uy * f;
          m.vx -= ux * f * dt;
          m.vy -= uy * f * dt;
        }
      }

      // pointer attraction (nodes lean toward the cursor)
      if (this.pointer.active && this.cfg.interactive) {
        const dx = this.pointer.x - n.x;
        const dy = this.pointer.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 170 && d > 1) {
          const f = (1 - d / 170) * 60;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }
      }

      n.vx = (n.vx + ax * dt) * damping;
      n.vy = (n.vy + ay * dt) * damping;
      const sp = Math.hypot(n.vx, n.vy);
      const max = 480;
      if (sp > max) {
        n.vx = (n.vx / sp) * max;
        n.vy = (n.vy / sp) * max;
      }
      n.x += n.vx * dt;
      n.y += n.vy * dt;
    }

    // spawn traveling light packets
    if (this.cfg.packetRate > 0 && this.edges.length) {
      this.spawnAcc += dt * this.cfg.packetRate;
      while (this.spawnAcc >= 1) {
        this.spawnAcc -= 1;
        const e = this.weightedEdge();
        if (e) {
          this.packets.push({
            edge: e,
            t: 0,
            speed: 0.45 + Math.random() * 0.5,
            gold: !!(e.a.gold || e.b.gold),
          });
        }
      }
    }
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.t += p.speed * dt;
      if (p.t >= 1) this.packets.splice(i, 1);
    }
    if (this.packets.length > 90) this.packets.splice(0, this.packets.length - 90);
  }

  private weightedEdge(): SimEdge | null {
    if (!this.edges.length) return null;
    let total = 0;
    for (const e of this.edges) total += 0.15 + e.charge;
    let r = Math.random() * total;
    for (const e of this.edges) {
      r -= 0.15 + e.charge;
      if (r <= 0) return e;
    }
    return this.edges[this.edges.length - 1];
  }

  /* -------------------------------- render ---------------------------------- */

  private render(t: number) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    const [sr, sg, sb] = this.colors.signal;

    // edges
    ctx.lineWidth = 1;
    for (const e of this.edges) {
      const shimmer = 0.06 * Math.sin(t * 1.3 + e.a.phase);
      const alpha = Math.max(0, 0.05 + e.charge * 0.5 + shimmer) * ((e.a.activation + e.b.activation) / 2 + 0.2);
      ctx.strokeStyle = `rgba(${sr},${sg},${sb},${alpha})`;
      ctx.beginPath();
      ctx.moveTo(e.a.x, e.a.y);
      ctx.lineTo(e.b.x, e.b.y);
      ctx.stroke();
    }

    // packets (additive)
    ctx.globalCompositeOperation = "lighter";
    for (const p of this.packets) {
      const e = p.edge;
      const x = e.a.x + (e.b.x - e.a.x) * p.t;
      const y = e.a.y + (e.b.y - e.a.y) * p.t;
      const fade = Math.sin(p.t * Math.PI);
      const sprite = p.gold ? this.glowGold : this.glowSignal;
      const s = 26 * fade + 6;
      ctx.globalAlpha = 0.5 * fade;
      ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    // node glow (additive)
    if (this.cfg.glow) {
      for (const n of this.nodes) {
        if (n.activation < 0.04) continue;
        const sprite = n.gold ? this.glowGold : this.glowSignal;
        const s = (n.r * 5 + 14) * (0.6 + n.activation);
        ctx.globalAlpha = 0.16 + n.activation * 0.4;
        ctx.drawImage(sprite, n.x - s / 2, n.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    }
    ctx.globalCompositeOperation = "source-over";

    // node cores + rings (the Trust Ring motif)
    for (const n of this.nodes) {
      const hovered = n.id === this.hoveredId;
      const [r, g, b] = n.gold ? this.colors.gold : this.colors.glow;
      const a = 0.35 + n.activation * 0.65;

      // ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + (hovered ? 6 : 3.5), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r},${g},${b},${(0.18 + n.activation * 0.5) * (hovered ? 1.4 : 1)})`;
      ctx.lineWidth = hovered ? 1.6 : 1;
      ctx.stroke();

      // core
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.fill();
    }

    // labels for project nodes + hovered node
    ctx.font = "500 12px var(--ff-mono), monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const n of this.nodes) {
      const hovered = n.id === this.hoveredId;
      const isProject = n.kind === "project";
      const isActive = n.id === `p:${this.activeProject}`;
      if (!isProject && !hovered) continue;
      const labelAlpha = hovered ? 1 : isActive ? 0.95 : 0.5;
      const [r, g, b] = n.gold ? this.colors.gold : this.colors.glow;
      ctx.fillStyle = `rgba(${r},${g},${b},${labelAlpha})`;
      ctx.fillText(n.label, n.x, n.y - n.r - 14);
    }
  }
}

function baseActivation(kind: NodeKind, gold?: boolean): number {
  switch (kind) {
    case "self":
      return 1;
    case "project":
      return 0.62;
    case "cluster":
      return 0.5;
    case "achievement":
      return gold ? 0.85 : 0.5;
    default:
      return 0.28;
  }
}
