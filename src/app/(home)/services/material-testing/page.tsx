import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { MaterialTestingPageView } from "@/components/sections/material-testing/MaterialTestingPageView";
import { getSiteConfig } from "@/config/site";
import { getMaterialTestingPage } from "@/content/material-testing";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createServiceStructuredData,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata(getMaterialTestingPage().seo);
}

export default function MaterialTestingPage() {
  const siteConfig = getSiteConfig();
  const materialTestingPage = getMaterialTestingPage();

  return (
    <>
      <StructuredData
        data={[
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "Material Testing (Metal & Concrete)", path: "/services/material-testing" },
          ]),
          createServiceStructuredData(
            siteConfig,
            materialTestingPage.seo,
            materialTestingPage.hero.title,
            materialTestingPage.intro.paragraphs[0] ?? materialTestingPage.hero.summary,
          ),
        ]}
      />
      <MaterialTestingPageView content={materialTestingPage} />
    </>
  );
}
