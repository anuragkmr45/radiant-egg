import type { Metadata } from "next";

import { getSiteConfig } from "@/config/site";
import type { SeoFields } from "@/types/content";

export function createPageMetadata(input: SeoFields): Metadata {
  const siteConfig = getSiteConfig();
  const absoluteUrl = new URL(input.path, siteConfig.siteUrl).toString();

  return {
    title: input.title,
    description: input.description,
    keywords: [...siteConfig.defaultKeywords],
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      type: "website",
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
      url: absoluteUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
    },
  };
}
