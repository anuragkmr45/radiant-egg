import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const siteConfig = getSiteConfig();
  const siteHost = new URL(siteConfig.siteUrl).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: siteHost,
  };
}
