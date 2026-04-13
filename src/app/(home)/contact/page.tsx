import type { Metadata } from "next";

import { ContactPageView } from "@/components/sections/contact/ContactPageView";
import { contactPage } from "@/content/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(contactPage.seo);

export default function ContactPage() {
  return <ContactPageView content={contactPage} />;
}
