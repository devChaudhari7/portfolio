import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #05060A 0%, #0A0D14 60%, #0b1430 100%)",
          color: "#EAEEF6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              border: "2px solid #5CC8FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#EAEEF6",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            DC
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#7E879B", letterSpacing: 4 }}>
            THE LIVING SYSTEM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 40, color: "#5CC8FF" }}>{site.role}</div>
          <div style={{ display: "flex", fontSize: 28, color: "#7E879B", marginTop: 8 }}>
            I build production software end to end.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#7E879B" }}>
          <div style={{ display: "flex" }}>{site.location}</div>
          <div style={{ display: "flex" }}>{site.githubHandle}</div>
        </div>
      </div>
    ),
    size,
  );
}
