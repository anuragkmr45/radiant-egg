import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { TpiPageView } from "@/components/sections/tpi/TpiPageView";
import { getSiteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createServiceStructuredData,
  getServiceSummary,
} from "@/lib/structured-data";
import { getTpiPage } from "@/content/tpi";

export function generateMetadata(): Metadata {
  return createPageMetadata(getTpiPage().seo);
}

export default function TpiPage() {
  const siteConfig = getSiteConfig();
  const tpiPage = getTpiPage();

  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "TPI Services", path: "/services/tpi" },
          ]),
          createServiceStructuredData(
            siteConfig,
            tpiPage.seo,
            tpiPage.hero.title,
            getServiceSummary(tpiPage),
          ),
        ]}
      />
      <TpiPageView content={tpiPage} />
    </>
  );
}
