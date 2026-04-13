import type { SitePath } from "@/types/site";

export interface SeoFields {
  title: string;
  description: string;
  path: SitePath;
}

export interface MarketingPageContent {
  path: SitePath;
  eyebrow: string;
  title: string;
  description: string;
  plannedSections: readonly string[];
  notes: readonly string[];
  phase0Checks: readonly string[];
  seo: SeoFields;
}
