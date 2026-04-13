import type { Metadata } from "next";

import { ContactPageView } from "@/components/sections/contact/ContactPageView";
import { getContactPage } from "@/content/contact";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata(getContactPage().seo);
}

export default function ContactPage() {
  return <ContactPageView content={getContactPage()} />;
}
