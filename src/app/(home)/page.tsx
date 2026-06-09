import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { HomePageView } from "@/components/sections/home/HomePageView";
import { getSiteConfig } from "@/config/site";
import { getHomePage } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";
import { createWebPageStructuredData } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  return createPageMetadata(homePage.seo);
}

export default async function HomePage() {
  const [siteConfig, homePage] = await Promise.all([getSiteConfig(), getHomePage()]);

  return (
    <>
      <StructuredData data={createWebPageStructuredData(siteConfig, homePage.seo)} />
      <HomePageView content={homePage} />
    </>
  );
}
