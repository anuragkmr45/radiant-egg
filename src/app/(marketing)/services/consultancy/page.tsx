import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { consultancyPage } from "@/content/consultancy";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(consultancyPage.seo);

export default function ConsultancyPage() {
  return <PlaceholderPage content={consultancyPage} />;
}
