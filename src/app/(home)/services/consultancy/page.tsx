import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { ConsultancyPageView } from "@/components/sections/consultancy/ConsultancyPageView";
import { getSiteConfig } from "@/config/site";
import { getConsultancyPage } from "@/content/consultancy";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createServiceStructuredData,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata(getConsultancyPage().seo);
}

export default function ConsultancyPage() {
  const siteConfig = getSiteConfig();
  const consultancyPage = getConsultancyPage();

  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "Consultancy Services", path: "/services/consultancy" },
          ]),
          createServiceStructuredData(
            siteConfig,
            consultancyPage.seo,
            consultancyPage.hero.title,
            consultancyPage.hero.description ?? consultancyPage.hero.summary,
          ),
        ]}
      />
      <ConsultancyPageView content={consultancyPage} />
    </>
  );
}
