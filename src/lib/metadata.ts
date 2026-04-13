import type { Metadata } from "next";

import { getSiteConfig } from "@/config/site";
import type { SeoFields } from "@/types/content";

export function createPageMetadata(input: SeoFields): Metadata {
  const siteConfig = getSiteConfig();
  const absoluteUrl = new URL(input.path, siteConfig.siteUrl).toString();
  const socialImage = new URL("/opengraph-image", siteConfig.siteUrl).toString();

  return {
    title: input.title,
    description: input.description,
    keywords: [...siteConfig.defaultKeywords],
    robots: {
      index: true,
      follow: true,
    },
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
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${siteConfig.name}`,
      description: input.description,
      images: [socialImage],
    },
  };
}
