import type { MetadataRoute } from "next";

export type SitePath =
  | "/"
  | "/about"
  | "/contact"
  | "/services/consultancy"
  | "/services/ndt"
  | "/services/tpi";

export type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface NavItem {
  label: string;
  href: SitePath;
  description?: string;
}

export interface FooterGroup {
  title: string;
  links: readonly NavItem[];
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  hours: string;
}

export interface SiteCta {
  label: string;
  href: SitePath;
  description: string;
}

export interface SiteRoute {
  href: SitePath;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  siteUrl: string;
  locale: string;
  defaultKeywords: readonly string[];
  nav: readonly NavItem[];
  footerGroups: readonly FooterGroup[];
  contact: ContactDetails;
  defaultCta: SiteCta;
  routes: readonly SiteRoute[];
}
