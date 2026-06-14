"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

const RING = `
        ╭───────────────╮
      ╭─╯               ╰─╮
     │   ◜ ‾ ‾ ‾ ‾ ‾ ◝   │
     │  (  THE LIVING  )  │
     │   ◟ _ _ _ _ _ ◞   │
      ╰─╮    SYSTEM    ╭─╯
        ╰───────────────╯
`;

export default function ConsoleEgg() {
  useEffect(() => {
    const big = "color:#5CC8FF;font-size:13px;font-weight:bold";
    const dim = "color:#7E879B;font-size:11px";
    const sig = "color:#9BE1FF;font-size:11px";

    console.log(`%c${RING}`, "color:#5CC8FF");
    console.log("%cSystem online. You found the console.", big);
    console.log(
      `%cI'm ${site.name} — ${site.role}.\nI build production software end to end: AI platforms, full-stack web, cross-platform mobile, blockchain.`,
      dim,
    );
    console.log(`%cIf you're hiring, let's talk → ${site.email}`, sig);
    console.log(`%c${site.github}  ·  ${site.linkedin}`, dim);
    console.log("%cpsst — type \"dev\" anywhere on the page.", dim);

    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      buf = (buf + e.key.toLowerCase()).slice(-3);
      if (buf === "dev") {
        console.log("%c⟢ connection established — thanks for poking around. ⟣", "color:#FFCE6A;font-size:12px");
        document.documentElement.animate(
          [{ filter: "brightness(1)" }, { filter: "brightness(1.25)" }, { filter: "brightness(1)" }],
          { duration: 600, easing: "cubic-bezier(0.16,1,0.3,1)" },
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
