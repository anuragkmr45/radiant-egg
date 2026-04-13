import "server-only";

import { cache } from "react";

import { siteConfig as defaultSiteConfig } from "@/cms/defaults/site";
import { loadCmsDocument } from "@/cms/load";
import type { SiteConfig } from "@/types/site";

const siteConfigFile = "site.json";

function resolveSiteUrl(siteUrl: string) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? siteUrl;

  try {
    return new URL(configuredUrl).toString().replace(/\/$/, "");
  } catch {
    return siteUrl;
  }
}

export const getSiteConfig = cache(function getSiteConfig(): SiteConfig {
  const cmsSiteConfig = loadCmsDocument(siteConfigFile, defaultSiteConfig);

  return {
    ...cmsSiteConfig,
    siteUrl: resolveSiteUrl(cmsSiteConfig.siteUrl),
  };
});
