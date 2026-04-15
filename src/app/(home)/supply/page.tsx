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

export function generateMetadata(): Metadata {
  return createPageMetadata(getSupplyPage().seo);
}

export default function SupplyPage() {
  const siteConfig = getSiteConfig();
  const supplyPage = getSupplyPage();

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
