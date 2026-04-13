import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteConfig = getSiteConfig();
  const lastModified = new Date();

  return siteConfig.routes.map((route) => ({
    url: new URL(route.href, siteConfig.siteUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
