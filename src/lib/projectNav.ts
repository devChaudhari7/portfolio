/**
 * Shallow, linkable project navigation via the URL hash (e.g. /#trustly).
 * Uses History API (pushState) so the back/forward buttons work and the canvas
 * is never unmounted. A custom "projectnav" event lets any component (hero,
 * projects) trigger an open and have the Projects section react.
 */

export const PROJECT_NAV_EVENT = "projectnav";

export function currentProjectHash(): string {
  if (typeof window === "undefined") return "";
  return decodeURIComponent(window.location.hash.replace(/^#/, ""));
}

export function openProjectHash(id: string): void {
  if (typeof window === "undefined") return;
  if (currentProjectHash() !== id) {
    window.history.pushState(null, "", `#${id}`);
  }
  window.dispatchEvent(new CustomEvent(PROJECT_NAV_EVENT));
}

export function closeProjectHash(): void {
  if (typeof window === "undefined") return;
  window.history.pushState(null, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new CustomEvent(PROJECT_NAV_EVENT));
}
