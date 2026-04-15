import type { MetadataRoute } from "next";

export type SitePath =
  | "/"
  | "/about"
  | "/contact"
  | "/gallery"
  | "/supply"
  | "/services/consultancy"
  | "/services/ndt"
  | "/services/tpi";

export type SiteSectionHref = `/#${string}` | `${SitePath}#${string}`;
export type SiteHref = SitePath | SiteSectionHref;

export type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface NavItem {
  label: string;
  href: SiteHref;
  description?: string;
  children?: readonly NavItem[];
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
  href: SiteHref;
  description: string;
}

export interface SiteRoute {
  href: SitePath;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}

export interface HomeChromeConfig {
  brandName: string;
  legalName: string;
  shortName: string;
  tagline: string;
  phoneLabel: string;
  nav: readonly NavItem[];
  quoteCta: SiteCta;
  footerDescription: string;
  footerGroups: readonly FooterGroup[];
  contact: ContactDetails;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  siteUrl: string;
  locale: string;
  tagline: string;
  footerHeadline: string;
  footerDescription: string;
  defaultKeywords: readonly string[];
  primaryNav: readonly NavItem[];
  serviceNav: readonly NavItem[];
  footerGroups: readonly FooterGroup[];
  contact: ContactDetails;
  defaultCta: SiteCta;
  homeChrome: HomeChromeConfig;
  routes: readonly SiteRoute[];
}
