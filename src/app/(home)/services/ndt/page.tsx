import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { NdtPageView } from "@/components/sections/ndt/NdtPageView";
import { getSiteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createServiceStructuredData,
  getServiceSummary,
} from "@/lib/structured-data";
import { getNdtPage } from "@/content/ndt";

export async function generateMetadata(): Promise<Metadata> {
  const ndtPage = await getNdtPage();

  return createPageMetadata(ndtPage.seo);
}

export default async function NdtPage() {
  const [siteConfig, ndtPage] = await Promise.all([getSiteConfig(), getNdtPage()]);

  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "NDT Services", path: "/services/ndt" },
          ]),
          createServiceStructuredData(
            siteConfig,
            ndtPage.seo,
            ndtPage.hero.title,
            getServiceSummary(ndtPage),
          ),
        ]}
      />
      <NdtPageView content={ndtPage} />
    </>
  );
}
