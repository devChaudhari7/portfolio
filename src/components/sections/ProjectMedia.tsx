"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Ring from "@/components/ui/Ring";
import type { Project } from "@/lib/content";

/** Elegant placeholder for projects without real assets yet (e.g. LexAI). */
export function MediaPlaceholder({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className="grain relative grid h-full w-full place-items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 100% at 20% 0%, color-mix(in oklab, var(--signal) 22%, transparent), transparent 55%), radial-gradient(100% 100% at 90% 100%, color-mix(in oklab, var(--signal-deep) 30%, transparent), transparent 55%), var(--surface)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <Ring size={large ? 72 : 52} rating={project.rating} spin>
          <span className="font-display text-sm font-semibold text-text">
            {project.frame === "phone" ? "app" : "web"}
          </span>
        </Ring>
        <span className="font-display text-xl font-semibold tracking-tight text-text">{project.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          interface preview · drop assets in /{project.id}/
        </span>
      </div>
    </div>
  );
}

/** In-frame media: muted, looping demo that plays only while the panel is open. */
export default function ProjectMedia({ project, open }: { project: Project; open: boolean }) {
  const a = project.assets;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) {
      v.play?.().catch(() => {});
    } else {
      v.pause?.();
      try {
        v.currentTime = 0;
      } catch {}
    }
  }, [open]);

  if (!a) return <MediaPlaceholder project={project} />;

  if (a.videoPreview) {
    return (
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={a.poster}
        aria-label={`${project.name} demo preview`}
        className="h-full w-full object-cover"
      >
        <source src={a.videoPreview} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={a.poster}
      alt={`${project.name} interface`}
      fill
      sizes="(max-width: 768px) 90vw, 640px"
      className="object-cover"
    />
  );
}
