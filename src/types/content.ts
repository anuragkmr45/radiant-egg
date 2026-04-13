import type { SiteHref, SitePath } from "@/types/site";

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

export type HomeIconKey =
  | "award"
  | "badge"
  | "bolt"
  | "briefcase"
  | "building"
  | "clipboard"
  | "droplets"
  | "factory"
  | "flask"
  | "fuel"
  | "graduation"
  | "hardhat"
  | "layers"
  | "package"
  | "scroll"
  | "search"
  | "shield"
  | "train";

export interface HomeImageAsset {
  src: string;
  alt: string;
}

export interface HomeStat {
  value: string;
  label: string;
}

export interface HomeAction {
  label: string;
  href: SiteHref;
}

export interface HomeHeroContent {
  titleLead: string;
  titleAccent: string;
  titleTail: string;
  description: string;
  backgroundImage: HomeImageAsset;
  primaryAction: HomeAction;
  secondaryAction: HomeAction;
}

export interface HomeCredentialItem {
  label: string;
  icon: HomeIconKey;
}

export interface HomeAboutContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  image: HomeImageAsset;
  stat: HomeStat;
  action: HomeAction;
}

export interface HomeFeatureItem {
  title: string;
  description: string;
  href: string;
  icon: HomeIconKey;
}

export interface HomeReasonsContent {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly Omit<HomeFeatureItem, "href">[];
}

export interface HomeSectionIntro {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HomeLogoItem {
  label: string;
}

export interface HomeCtaContent {
  titleLead: string;
  titleAccent: string;
  description: string;
  action: HomeAction;
}

export interface HomePageContent {
  seo: SeoFields;
  hero: HomeHeroContent;
  credentials: readonly HomeCredentialItem[];
  about: HomeAboutContent;
  services: HomeSectionIntro & {
    items: readonly HomeFeatureItem[];
  };
  reasons: HomeReasonsContent;
  industries: HomeSectionIntro & {
    items: readonly Omit<HomeFeatureItem, "href" | "description">[];
  };
  clients: HomeSectionIntro & {
    items: readonly HomeLogoItem[];
  };
  cta: HomeCtaContent;
}

export interface AboutBreadcrumbItem {
  label: string;
  href?: SitePath;
}

export interface AboutHeroContent {
  breadcrumbs: readonly AboutBreadcrumbItem[];
  title: string;
  description: string;
}

export interface AboutCredentialItem {
  accent: string;
  label: string;
}

export interface AboutIntroContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  image: HomeImageAsset;
  credentials: readonly AboutCredentialItem[];
}

export interface AboutFeatureCard {
  title: string;
  description: string;
  icon: HomeIconKey;
}

export interface AboutValueCard extends AboutFeatureCard {
  values?: readonly string[];
}

export interface AboutTeamMember {
  name: string;
  role: string;
  description: string;
  icon: HomeIconKey;
  badge?: string;
  featured?: boolean;
}

export interface AboutPortfolioTile {
  label: string;
  icon: HomeIconKey;
}

export interface AboutPageContent {
  seo: SeoFields;
  hero: AboutHeroContent;
  intro: AboutIntroContent;
  strengths: HomeSectionIntro & {
    items: readonly AboutFeatureCard[];
  };
  principles: {
    items: readonly AboutValueCard[];
  };
  leadership: HomeSectionIntro & {
    members: readonly AboutTeamMember[];
  };
  stats: readonly HomeStat[];
  portfolio: HomeSectionIntro & {
    items: readonly AboutPortfolioTile[];
  };
  cta: {
    title: string;
    description: string;
    primaryAction: HomeAction;
    secondaryAction: HomeAction;
  };
}
