import type { Metadata } from "next";

import { ConsultancyPageView } from "@/components/sections/consultancy/ConsultancyPageView";
import { consultancyPage } from "@/content/consultancy";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(consultancyPage.seo);

export default function ConsultancyPage() {
  return <ConsultancyPageView content={consultancyPage} />;
}
