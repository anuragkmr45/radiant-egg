import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { HomePageView } from "@/components/sections/home/HomePageView";
import { getSiteConfig } from "@/config/site";
import { getHomePage } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";
import { createWebPageStructuredData } from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata(getHomePage().seo);
}

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const homePage = getHomePage();

  return (
    <>
      <StructuredData data={createWebPageStructuredData(siteConfig, homePage.seo)} />
      <HomePageView content={homePage} />
    </>
  );
}
