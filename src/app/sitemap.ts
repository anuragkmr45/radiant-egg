import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/config/site";
import { resolveSiteOrigin } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = getSiteConfig();
  const siteOrigin = await resolveSiteOrigin(siteConfig);

  return siteConfig.routes.map((route) => ({
    url: new URL(route.href, siteOrigin).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
