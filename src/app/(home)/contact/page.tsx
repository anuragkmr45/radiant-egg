import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { ContactPageView } from "@/components/sections/contact/ContactPageView";
import { getSiteConfig } from "@/config/site";
import { getContactPage } from "@/content/contact";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbStructuredData,
  createContactStructuredData,
  createWebPageStructuredData,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return createPageMetadata(getContactPage().seo);
}

export default function ContactPage() {
  const siteConfig = getSiteConfig();
  const contactPage = getContactPage();

  return (
    <>
      <StructuredData
        data={[
          createWebPageStructuredData(siteConfig, contactPage.seo, "ContactPage"),
          createBreadcrumbStructuredData(siteConfig, [
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          createContactStructuredData(siteConfig, contactPage),
        ]}
      />
      <ContactPageView content={contactPage} />
    </>
  );
}
