import { cn } from "@/lib/cn";

interface FrameProps {
  variant: "phone" | "browser";
  url?: string;
  children: React.ReactNode;
  className?: string;
}

/** Phone frame (mobile apps) or browser frame (web apps). Pure chrome. */
export default function DeviceFrame({ variant, url, children, className }: FrameProps) {
  if (variant === "phone") {
    return (
      <div
        className={cn(
          "relative mx-auto aspect-[9/19] w-full max-w-[260px] rounded-[2.2rem] border border-line-strong bg-[var(--surface)] p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]",
          className,
        )}
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-void" aria-hidden="true" />
        <div className="h-full w-full overflow-hidden rounded-[1.7rem] bg-void">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-line-strong bg-[var(--surface)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-[var(--elevated)] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        {url && (
          <span className="ml-3 flex-1 truncate rounded-md bg-void/60 px-3 py-1 font-mono text-[10px] text-muted">
            {url}
          </span>
        )}
      </div>
      <div className="aspect-[16/10] w-full bg-void">{children}</div>
    </div>
  );
}
