import type { Metadata } from "next";

import { ServicePageView } from "@/components/sections/services/ServicePageView";
import { createPageMetadata } from "@/lib/metadata";
import { ndtPage } from "@/content/ndt";

export const metadata: Metadata = createPageMetadata(ndtPage.seo);

export default function NdtPage() {
  return <ServicePageView content={ndtPage} />;
}
