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

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  return createPageMetadata(contactPage.seo);
}

export default async function ContactPage() {
  const [siteConfig, contactPage] = await Promise.all([getSiteConfig(), getContactPage()]);

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
