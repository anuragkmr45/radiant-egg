import "server-only";

import { siteConfig as defaultSiteConfig } from "@/cms/defaults/site";
import { loadCmsDocument } from "@/cms/load";
import type { SiteConfig } from "@/types/site";

const siteConfigFile = "site.json";

export function getSiteConfig(): SiteConfig {
  return loadCmsDocument(siteConfigFile, defaultSiteConfig);
}
