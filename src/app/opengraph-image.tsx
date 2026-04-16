import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { getSiteConfig } from "@/config/site";

export const alt = "RECPL social preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const siteConfig = getSiteConfig();
  const logoBuffer = await readFile(path.join(process.cwd(), "public/brand/recpl-logo-compact.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #091d34 0%, #123352 55%, #0f2946 100%)",
          color: "white",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "auto -90px -140px auto",
            width: "360px",
            height: "360px",
            borderRadius: "9999px",
            background: "rgba(251, 158, 19, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-120px auto auto -120px",
            width: "300px",
            height: "300px",
            borderRadius: "9999px",
            background: "rgba(251, 158, 19, 0.12)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 24px",
                borderRadius: "28px",
                background: "rgba(255, 255, 255, 0.96)",
                boxShadow: "0 24px 40px rgba(9, 29, 52, 0.18)",
              }}
            >
              <img
                alt="RECPL logo"
                height={184}
                src={logoSrc}
                style={{
                  objectFit: "contain",
                }}
                width={250}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "#fb9e13",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Ready to Excel
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: "#d6dce2",
                  fontWeight: 600,
                }}
              >
                Radiant Engineering Consultancy Pvt. Ltd.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "920px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "#fb9e13",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontWeight: 700,
              }}
            >
              Consultancy, Inspection, and NDT
            </div>
            <div
              style={{
                fontSize: "64px",
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: "-0.045em",
              }}
            >
              Engineering clarity for critical industrial assets.
            </div>
            <div
              style={{
                fontSize: "26px",
                lineHeight: 1.35,
                color: "#d6dce2",
                maxWidth: "880px",
              }}
            >
              {siteConfig.description}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
