import { ImageResponse } from "next/og";

import { getSiteConfig } from "@/config/site";

export const alt = "Radiant Engineering social preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const siteConfig = getSiteConfig();

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
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "72px",
                height: "72px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "18px",
                background: "#fb9e13",
                color: "#091d34",
                fontSize: "30px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              RE
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {siteConfig.name}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#b8bfc7",
                }}
              >
                {siteConfig.tagline}
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
