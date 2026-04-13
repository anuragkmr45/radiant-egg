import type { Metadata } from "next";

import { ServicePageView } from "@/components/sections/services/ServicePageView";
import { consultancyPage } from "@/content/consultancy";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(consultancyPage.seo);

export default function ConsultancyPage() {
  return <ServicePageView content={consultancyPage} />;
}
