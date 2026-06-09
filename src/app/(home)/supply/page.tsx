import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { SupplyPageView } from "@/components/sections/supply/SupplyPageView";
import { getSiteConfig } from "@/config/site";
import { getSupplyPage } from "@/content/supply";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createServiceStructuredData,
  getServiceSummary,
} from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const supplyPage = await getSupplyPage();

  return createPageMetadata(supplyPage.seo);
}

export default async function SupplyPage() {
  const [siteConfig, supplyPage] = await Promise.all([getSiteConfig(), getSupplyPage()]);

  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "Supply", path: "/supply" },
          ]),
          createServiceStructuredData(
            siteConfig,
            supplyPage.seo,
            supplyPage.hero.title,
            getServiceSummary(supplyPage),
          ),
        ]}
      />
      <SupplyPageView content={supplyPage} />
    </>
  );
}
