import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteConfig = getSiteConfig();

  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#091d34",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/recpl-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
