import type { Metadata } from "next";

import { ServicePageView } from "@/components/sections/services/ServicePageView";
import { createPageMetadata } from "@/lib/metadata";
import { tpiPage } from "@/content/tpi";

export const metadata: Metadata = createPageMetadata(tpiPage.seo);

export default function TpiPage() {
  return <ServicePageView content={tpiPage} />;
}
