/**
 * Live profile data for the Contact "living system" nodes.
 *
 * Fetched on the server with ISR (revalidate hourly) rather than from the
 * browser: GitHub's API is rate-limited per IP and LeetCode's GraphQL endpoint
 * blocks CORS, so client-side fetching would be fragile. Every fetch fails
 * soft — a dead API must never break the build or blank the section.
 */

const REVALIDATE = 3600; // 1 hour

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
}

export interface GitHubProfile {
  login: string;
  avatar: string;
  repos: number;
  followers: number;
  following: number;
  since: string; // "2023"
  topRepos: GitHubRepo[];
  languages: { name: string; pct: number }[];
}

export interface LeetCodeProfile {
  username: string;
  avatar: string | null;
  ranking: number | null;
  solved: { all: number; easy: number; medium: number; hard: number };
  totals: { all: number; easy: number; medium: number; hard: number };
}

/** Brand colours for the language bar — falls back to the signal colour. */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Solidity: "#AA6746",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  PHP: "#4F5D95",
};

export async function getGitHubProfile(user: string): Promise<GitHubProfile | null> {
  try {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" };
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers, next: { revalidate: REVALIDATE } }),
      fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`, {
        headers,
        next: { revalidate: REVALIDATE },
      }),
    ]);
    if (!userRes.ok || !repoRes.ok) return null;

    const u = await userRes.json();
    const repos: Array<{
      name: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      html_url: string;
      fork: boolean;
      updated_at: string;
    }> = await repoRes.json();

    const own = repos.filter((r) => !r.fork);

    const counts = new Map<string, number>();
    for (const r of own) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
    const languages = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, pct: Math.round((n / total) * 100) }));

    const topRepos = own
      .slice()
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          +new Date(b.updated_at) - +new Date(a.updated_at),
      )
      .slice(0, 3)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        url: r.html_url,
      }));

    return {
      login: u.login,
      avatar: u.avatar_url,
      repos: u.public_repos,
      followers: u.followers,
      following: u.following,
      since: String(new Date(u.created_at).getFullYear()),
      topRepos,
      languages,
    };
  } catch {
    return null;
  }
}

export async function getLeetCodeProfile(user: string): Promise<LeetCodeProfile | null> {
  const query = `query u($u:String!){
    matchedUser(username:$u){
      username
      profile{ ranking userAvatar }
      submitStatsGlobal{ acSubmissionNum{ difficulty count } }
    }
    allQuestionsCount{ difficulty count }
  }`;
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({ query, variables: { u: user } }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const m = json?.data?.matchedUser;
    if (!m) return null;

    const pick = (arr: Array<{ difficulty: string; count: number }>, d: string) =>
      arr?.find((x) => x.difficulty === d)?.count ?? 0;

    const ac = m.submitStatsGlobal?.acSubmissionNum ?? [];
    const all = json?.data?.allQuestionsCount ?? [];

    return {
      username: m.username,
      avatar: m.profile?.userAvatar ?? null,
      ranking: m.profile?.ranking ?? null,
      solved: {
        all: pick(ac, "All"),
        easy: pick(ac, "Easy"),
        medium: pick(ac, "Medium"),
        hard: pick(ac, "Hard"),
      },
      totals: {
        all: pick(all, "All"),
        easy: pick(all, "Easy"),
        medium: pick(all, "Medium"),
        hard: pick(all, "Hard"),
      },
    };
  } catch {
    return null;
  }
}
