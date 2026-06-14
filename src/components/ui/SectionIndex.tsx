import { cn } from "@/lib/cn";

/** Mono section marker — "// 03 — projects" — part of the telemetry language. */
export default function SectionIndex({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("mono-label flex items-center gap-3", className)}>
      <span
        className="inline-block h-px w-8"
        style={{ background: "linear-gradient(90deg, transparent, var(--signal))" }}
        aria-hidden="true"
      />
      <span className="text-signal/90">// {index}</span>
      <span>— {label}</span>
    </div>
  );
}
