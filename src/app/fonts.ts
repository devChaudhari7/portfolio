import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

// Display — Clash Display (Fontshare, self-hosted variable)
export const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--ff-display",
  weight: "200 700",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Body / UI — General Sans (Fontshare, self-hosted variable)
export const generalSans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  variable: "--ff-body",
  weight: "200 700",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Mono — telemetry, labels, console
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});
