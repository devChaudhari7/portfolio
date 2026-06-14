import { cn } from "@/lib/cn";

interface RingProps {
  size?: number;
  stroke?: number;
  /** 0..1 — draws a "charged" arc (the Trust Ring rating flourish). */
  rating?: number;
  gold?: boolean;
  /** continuous slow rotation of the charged arc */
  spin?: boolean;
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

/**
 * The Trust Ring — the site's core motif. A ring of light with an optional
 * charged arc. Reused for ratings, halos, loaders, and the contact CTA.
 */
export default function Ring({
  size = 64,
  stroke = 2,
  rating,
  gold = false,
  spin = false,
  className,
  children,
  label,
}: RingProps) {
  const r = (size - stroke) / 2 - 1;
  const c = 2 * Math.PI * r;
  const color = gold ? "var(--gold)" : "var(--signal)";

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line-strong)" strokeWidth={stroke} />
        {rating !== undefined && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - Math.max(0, Math.min(1, rating)))}
            className={cn(spin && "spin-slow")}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transformOrigin: "center" }}
          />
        )}
      </svg>
      {children && <div className="relative z-10 grid place-items-center">{children}</div>}
    </div>
  );
}
