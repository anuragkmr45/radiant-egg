import { aboutPage } from "@/cms/defaults/about";
import { consultancyPage } from "@/cms/defaults/consultancy";
import { contactPage } from "@/cms/defaults/contact";
import { galleryPage } from "@/cms/defaults/gallery";
import { homePage } from "@/cms/defaults/home";
import { materialTestingPage } from "@/cms/defaults/material-testing";
import { ndtPage } from "@/cms/defaults/ndt";
import { siteConfig } from "@/cms/defaults/site";
import { supplyPage } from "@/cms/defaults/supply";
import { tpiPage } from "@/cms/defaults/tpi";

export interface CmsDocumentDefinition {
  path: string;
  label: string;
  description: string;
  publicPath: string | null;
  defaultContent: unknown;
}

export const cmsDocumentDefinitions = [
  {
    path: "site.json",
    label: "Site Settings",
    description: "Navigation, footer, contact details, WhatsApp, SEO defaults, and route metadata.",
    publicPath: "/",
    defaultContent: siteConfig,
  },
  {
    path: "pages/home.json",
    label: "Home Page",
    description: "Hero, credentials, about preview, services, industries, clients, and CTA copy.",
    publicPath: "/",
    defaultContent: homePage,
  },
  {
    path: "pages/about.json",
    label: "About Page",
    description: "About hero, intro, strengths, principles, leadership, stats, gallery preview, and CTA.",
    publicPath: "/about",
    defaultContent: aboutPage,
  },
  {
    path: "pages/contact.json",
    label: "Contact Page",
    description: "Contact hero, form labels/options, direct contacts, info strip, and map section.",
    publicPath: "/contact",
    defaultContent: contactPage,
  },
  {
    path: "pages/ndt.json",
    label: "NDT Services",
    description: "NDT service hero, intro, process, standards, applications, features, and CTA.",
    publicPath: "/services/ndt",
    defaultContent: ndtPage,
  },
  {
    path: "pages/material-testing.json",
    label: "Material Testing",
    description: "Material testing hero, intro, accordion services, industries, standards, and CTA.",
    publicPath: "/services/material-testing",
    defaultContent: materialTestingPage,
  },
  {
    path: "pages/supply.json",
    label: "Supply",
    description: "Supply hero, catalog details, capabilities, product categories, and CTA.",
    publicPath: "/supply",
    defaultContent: supplyPage,
  },
  {
    path: "pages/consultancy.json",
    label: "Consultancy",
    description: "Consultancy hero, expertise strip, detail sections, project rail, and CTA.",
    publicPath: "/services/consultancy",
    defaultContent: consultancyPage,
  },
  {
    path: "gallery.json",
    label: "Gallery",
    description: "Gallery hero, categories, image cards, captions, and filter labels.",
    publicPath: "/gallery",
    defaultContent: galleryPage,
  },
  {
    path: "pages/tpi.json",
    label: "TPI Services",
    description: "Legacy TPI service content retained in the repository.",
    publicPath: "/services/tpi",
    defaultContent: tpiPage,
  },
] satisfies readonly CmsDocumentDefinition[];

export const defaultCmsDocumentPath = "pages/home.json";

export function getCmsDocumentDefinition(path: string) {
  return cmsDocumentDefinitions.find((document) => document.path === path) ?? null;
}

export function resolveCmsDocumentPath(path: string | string[] | undefined) {
  const candidate = typeof path === "string" ? path : Array.isArray(path) ? path[0] : undefined;

  return candidate && getCmsDocumentDefinition(candidate) ? candidate : defaultCmsDocumentPath;
}
