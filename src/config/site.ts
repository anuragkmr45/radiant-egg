import "server-only";

import { cache } from "react";

import { siteConfig as defaultSiteConfig } from "@/cms/defaults/site";
import { loadCmsDocument } from "@/cms/load";
import type { SiteConfig } from "@/types/site";

const siteConfigFile = "site.json";
const placeholderHosts = new Set(["example.com"]);

function resolveSiteUrl(siteUrl: string) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? siteUrl;

  try {
    return new URL(configuredUrl).toString().replace(/\/$/, "");
  } catch {
    return siteUrl;
  }
}

function isPlaceholderHost(hostname: string) {
  return placeholderHosts.has(hostname) || hostname.endsWith(".example");
}

export function getPublicSiteUrl(siteConfigOrUrl: Pick<SiteConfig, "siteUrl"> | string) {
  const siteUrl = typeof siteConfigOrUrl === "string" ? siteConfigOrUrl : siteConfigOrUrl.siteUrl;

  try {
    const normalizedUrl = new URL(siteUrl).toString().replace(/\/$/, "");
    const { hostname } = new URL(normalizedUrl);

    return isPlaceholderHost(hostname) ? null : normalizedUrl;
  } catch {
    return null;
  }
}

export const getSiteConfig = cache(function getSiteConfig(): SiteConfig {
  const cmsSiteConfig = loadCmsDocument(siteConfigFile, defaultSiteConfig);

  return {
    ...cmsSiteConfig,
    siteUrl: resolveSiteUrl(cmsSiteConfig.siteUrl),
  };
});
