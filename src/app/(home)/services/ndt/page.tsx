import type { Metadata } from "next";

import { NdtPageView } from "@/components/sections/ndt/NdtPageView";
import { createPageMetadata } from "@/lib/metadata";
import { getNdtPage } from "@/content/ndt";

export function generateMetadata(): Metadata {
  return createPageMetadata(getNdtPage().seo);
}

export default function NdtPage() {
  return <NdtPageView content={getNdtPage()} />;
}
