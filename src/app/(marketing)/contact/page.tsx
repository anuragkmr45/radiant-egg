import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { contactPage } from "@/content/contact";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(contactPage.seo);

export default function ContactPage() {
  return <PlaceholderPage content={contactPage} />;
}
