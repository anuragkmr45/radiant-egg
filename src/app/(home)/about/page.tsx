import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { AboutPageView } from "@/components/sections/about/AboutPageView";
import { getSiteConfig } from "@/config/site";
import { getAboutPage } from "@/content/about";
import { getGalleryPage } from "@/content/gallery";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createWebPageStructuredData,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata(getAboutPage().seo);
}

export default function AboutPage() {
  const siteConfig = getSiteConfig();
  const aboutPage = getAboutPage();
  const galleryPage = getGalleryPage();

  return (
    <>
      <StructuredData
        data={[
          createWebPageStructuredData(siteConfig, aboutPage.seo, "AboutPage"),
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <AboutPageView content={aboutPage} gallery={galleryPage} />
    </>
  );
}
