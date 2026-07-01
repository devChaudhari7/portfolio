"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function MediaLightbox({ open, onClose, title, children }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain p-4 sm:p-10"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — expanded preview`}
        >
          <button
            className="fixed inset-0 cursor-zoom-out bg-void/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close preview"
            tabIndex={-1}
          />
          <motion.div
            className="relative z-10 mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-signal">{`// ${title}`}</span>
              <button
                ref={closeRef}
                onClick={onClose}
                className="rounded-full border border-line-strong px-4 py-1.5 font-mono text-xs text-text transition-colors hover:border-signal hover:text-signal"
              >
                close ✕
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
