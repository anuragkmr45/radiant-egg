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

export async function generateMetadata(): Promise<Metadata> {
  const galleryPage = await getGalleryPage();

  return createPageMetadata(galleryPage.seo);
}

export default async function GalleryPage() {
  const [siteConfig, galleryPage] = await Promise.all([getSiteConfig(), getGalleryPage()]);

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
