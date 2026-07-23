import type { Metadata, Viewport } from "next";
import { clashDisplay, generalSans, jetbrainsMono } from "./fonts";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import BootSequence from "@/components/boot/BootSequence";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TelemetryHUD from "@/components/layout/TelemetryHUD";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Minimap from "@/components/layout/Minimap";
import ConsoleEgg from "@/components/layout/ConsoleEgg";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Dev Chaudhari builds production software end to end — AI/LLM platforms, full-stack web, cross-platform mobile, and blockchain. AWS Academy Cloud Foundations graduate.",
  keywords: [
    "Dev Chaudhari",
    "Full-Stack Engineer",
    "AI Engineer",
    "React Native",
    "Next.js",
    "Supabase",
    "Gemini",
    "Ahmedabad",
    "portfolio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: "I build production software end to end. AI platforms, full-stack web, cross-platform mobile, blockchain.",
    siteName: `${site.name} — The Living System`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: "I build production software end to end.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${generalSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="space-bg min-h-dvh">
        <a
          href="#top"
          className="sr-only z-[110] rounded-full bg-signal px-4 py-2 text-sm font-medium text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <BootSequence />
          <ScrollProgress />
          <CustomCursor />
          <Nav />
          <TelemetryHUD />
          <Minimap />
          <ConsoleEgg />
          <main id="top">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
