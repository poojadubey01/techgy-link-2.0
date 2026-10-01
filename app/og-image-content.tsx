import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteUrl } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImageContent() {
  const logoData = readFileSync(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  const host = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f9fa",
          padding: "80px",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(0,34,255,0.12) 0%, rgba(0,34,255,0) 45%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={61} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              color: "#000000",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            Design, Technology & Growth Partner
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#0022ff", fontWeight: 500 }}>
            {host}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
