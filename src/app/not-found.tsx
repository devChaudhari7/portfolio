import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Connection lost" };

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-6 text-center">
      <div className="flex flex-col items-center">
        <svg width="160" height="120" viewBox="0 0 160 120" className="mb-8" fill="none" aria-hidden="true">
          <circle cx="40" cy="60" r="6" fill="var(--signal)" />
          <circle cx="120" cy="60" r="6" fill="var(--muted)" />
          <line x1="46" y1="60" x2="78" y2="60" stroke="var(--signal)" strokeWidth="1.5" />
          <line x1="84" y1="60" x2="114" y2="60" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 5" />
          <circle cx="40" cy="60" r="14" fill="none" stroke="var(--signal)" strokeOpacity="0.4" />
        </svg>
        <p className="mono-label mb-4">{"// error · 404"}</p>
        <h1 className="display text-[clamp(2.5rem,8vw,5rem)]">Node not found.</h1>
        <p className="mt-4 max-w-md text-muted">
          That connection dropped — the node you&apos;re looking for isn&apos;t in the graph. Let&apos;s route you back to the core.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-void transition-shadow hover:shadow-[0_0_24px_-4px_var(--signal)]"
        >
          Reconnect to origin →
        </Link>
      </div>
    </section>
  );
}
