import type { Metadata } from "next";

import { ConsultancyPageView } from "@/components/sections/consultancy/ConsultancyPageView";
import { getConsultancyPage } from "@/content/consultancy";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata(getConsultancyPage().seo);
}

export default function ConsultancyPage() {
  return <ConsultancyPageView content={getConsultancyPage()} />;
}
