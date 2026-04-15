import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { GalleryPageView } from "@/components/sections/gallery/GalleryPageView";
import { getSiteConfig } from "@/config/site";
import { getGalleryPage } from "@/content/gallery";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createWebPageStructuredData,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata(getGalleryPage().seo);
}

export default function GalleryPage() {
  const siteConfig = getSiteConfig();
  const galleryPage = getGalleryPage();

  return (
    <>
      <StructuredData
        data={[
          createWebPageStructuredData(siteConfig, galleryPage.seo),
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />
      <GalleryPageView content={galleryPage} />
    </>
  );
}
