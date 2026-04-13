import type { Metadata } from "next";

import { NdtPageView } from "@/components/sections/ndt/NdtPageView";
import { createPageMetadata } from "@/lib/metadata";
import { ndtPage } from "@/content/ndt";

export const metadata: Metadata = createPageMetadata(ndtPage.seo);

export default function NdtPage() {
  return <NdtPageView content={ndtPage} />;
}
