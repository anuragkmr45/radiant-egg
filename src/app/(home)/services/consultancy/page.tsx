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

export async function generateMetadata(): Promise<Metadata> {
  const consultancyPage = await getConsultancyPage();

  return createPageMetadata(consultancyPage.seo);
}

export default async function ConsultancyPage() {
  const [siteConfig, consultancyPage] = await Promise.all([getSiteConfig(), getConsultancyPage()]);

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
