"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/cn";

function Monogram() {
  return (
    <span className="relative grid h-9 w-9 place-items-center" aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-signal/60" />
      <span className="absolute inset-1 rounded-full border border-signal/20" />
      <span className="font-display text-sm font-semibold tracking-tight text-text">DC</span>
    </span>
  );
}

export default function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href, { offset: 80 });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2 backdrop-blur-md" : "py-4",
        )}
        style={{
          background: scrolled ? "color-mix(in oklab, var(--void) 72%, transparent)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        }}
      >
        <nav className="container-edge flex items-center justify-between" aria-label="Primary">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <Monogram />
            <span className="hidden font-display text-sm font-medium tracking-tight sm:block">
              {site.name}
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="mono-label text-text/70 transition-colors hover:text-signal"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              data-magnetic
              className="rounded-full border border-signal/40 px-4 py-1.5 text-sm text-text transition-all hover:border-signal hover:shadow-[0_0_24px_-6px_var(--signal)]"
            >
              Open a connection
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 grid h-11 w-11 place-items-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-text transition-all duration-300",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 block h-px w-6 bg-text transition-all duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-6 bg-text transition-all duration-300",
                  open ? "top-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden"
            style={{ background: "color-mix(in oklab, var(--void) 96%, transparent)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-2">
              {[...nav, { id: "contact", label: "Contact", href: "#contact" }].map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    className="font-display text-5xl font-semibold tracking-tight text-text/90"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mono-label mt-12">{site.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
