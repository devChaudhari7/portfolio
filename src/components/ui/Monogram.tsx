import { cn } from "@/lib/cn";

/**
 * The DC mark — a single ligature where the D's bowl and the C's arc are the
 * same stroke, broken by a gap with a node sitting in it. It reads as D + C,
 * and as a Trust Ring with a signal on it: the site's whole idea in one glyph.
 */
export default function Monogram({
  size = 36,
  className,
  animated = false,
  title,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn("overflow-visible", className)}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="dc-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--glow)" />
          <stop offset="100%" stopColor="var(--signal)" />
        </linearGradient>
      </defs>

      {/* orbit — the ring the mark sits inside */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />

      {/* the D stem */}
      <path
        d="M30 22 V78"
        stroke="url(#dc-stroke)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* the shared bowl / C arc, broken at 3 o'clock */}
      <path
        d="M30 22 A28 28 0 0 1 74 42"
        stroke="url(#dc-stroke)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M74 58 A28 28 0 0 1 30 78"
        stroke="url(#dc-stroke)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* the signal sitting in the gap */}
      <circle cx="79" cy="50" r="5.5" fill="var(--glow)">
        {animated && (
          <animate
            attributeName="opacity"
            values="1;0.35;1"
            dur="2.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      {animated && (
        <circle cx="79" cy="50" r="5.5" fill="none" stroke="var(--signal)" strokeWidth="1.5">
          <animate attributeName="r" values="5.5;16" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
