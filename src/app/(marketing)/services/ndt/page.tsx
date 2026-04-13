import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { createPageMetadata } from "@/lib/metadata";
import { ndtPage } from "@/content/ndt";

export const metadata: Metadata = createPageMetadata(ndtPage.seo);

export default function NdtPage() {
  return <PlaceholderPage content={ndtPage} />;
}
