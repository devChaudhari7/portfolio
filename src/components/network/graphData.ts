import {
  achievements,
  clusters,
  projects,
  skillById,
  type ClusterId,
} from "@/lib/content";

export type NodeKind = "self" | "project" | "cluster" | "skill" | "achievement";

export interface GraphNode {
  id: string;
  kind: NodeKind;
  label: string;
  /** content id this maps back to (project id, skill id, etc.) */
  ref?: string;
  cluster?: ClusterId;
  gold?: boolean;
  /** relative base size weight */
  weight: number;
}

export interface GraphEdge {
  a: string;
  b: string;
}

export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const pid = (id: string) => `p:${id}`;
const cid = (id: string) => `c:${id}`;
const sid = (id: string) => `s:${id}`;
const aid = (id: string) => `a:${id}`;

/** Skill node ids a given project lights up — used by the reconfigure animation. */
export function projectSkillNodeIds(projectId: string): string[] {
  const p = projects.find((x) => x.id === projectId);
  if (!p) return [];
  return p.skills.map(sid);
}

export function projectNodeId(projectId: string): string {
  return pid(projectId);
}

/** Build the full graph, then trim skills (lowest-degree first) to fit `maxNodes`. */
export function buildGraph(maxNodes = 999): Graph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  nodes.push({ id: "self", kind: "self", label: "Dev Chaudhari", weight: 2.2 });

  for (const p of projects) {
    nodes.push({ id: pid(p.id), kind: "project", label: p.name, ref: p.id, weight: p.lead ? 1.7 : 1.35 });
    edges.push({ a: "self", b: pid(p.id) });
  }

  for (const c of clusters) {
    nodes.push({ id: cid(c.id), kind: "cluster", label: c.short, ref: c.id, cluster: c.id, weight: 1.5 });
    edges.push({ a: "self", b: cid(c.id) });
  }

  // Only skill nodes actually used by a project (keeps the graph meaningful).
  const usedSkills = new Set<string>();
  for (const p of projects) p.skills.forEach((s) => usedSkills.add(s));

  for (const skillId of usedSkills) {
    const s = skillById.get(skillId);
    if (!s) continue;
    nodes.push({ id: sid(s.id), kind: "skill", label: s.label, ref: s.id, cluster: s.cluster, weight: 0.85 });
    edges.push({ a: cid(s.cluster), b: sid(s.id) });
  }

  for (const p of projects) {
    for (const skillId of p.skills) {
      if (usedSkills.has(skillId)) edges.push({ a: pid(p.id), b: sid(skillId) });
    }
  }

  for (const a of achievements) {
    nodes.push({
      id: aid(a.id),
      kind: "achievement",
      label: a.title,
      ref: a.id,
      gold: a.highlight,
      weight: a.highlight ? 1.5 : 1.1,
    });
    edges.push({ a: "self", b: aid(a.id) });
  }

  if (nodes.length <= maxNodes) return { nodes, edges };

  // Trim: drop lowest-degree skill nodes until we fit.
  const degree = new Map<string, number>();
  for (const e of edges) {
    degree.set(e.a, (degree.get(e.a) ?? 0) + 1);
    degree.set(e.b, (degree.get(e.b) ?? 0) + 1);
  }
  const skillNodes = nodes
    .filter((n) => n.kind === "skill")
    .sort((x, y) => (degree.get(x.id) ?? 0) - (degree.get(y.id) ?? 0));

  const toRemove = new Set<string>();
  let count = nodes.length;
  for (const n of skillNodes) {
    if (count <= maxNodes) break;
    toRemove.add(n.id);
    count--;
  }

  return {
    nodes: nodes.filter((n) => !toRemove.has(n.id)),
    edges: edges.filter((e) => !toRemove.has(e.a) && !toRemove.has(e.b)),
  };
}
