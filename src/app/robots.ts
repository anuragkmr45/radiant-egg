import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/config/site";
import { resolveSiteOrigin } from "@/lib/site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = getSiteConfig();
  const siteOrigin = await resolveSiteOrigin(siteConfig);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*"],
      },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: new URL(siteOrigin).host,
  };
}
