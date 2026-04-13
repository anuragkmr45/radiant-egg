import type { Metadata } from "next";

import { TpiPageView } from "@/components/sections/tpi/TpiPageView";
import { createPageMetadata } from "@/lib/metadata";
import { getTpiPage } from "@/content/tpi";

export function generateMetadata(): Metadata {
  return createPageMetadata(getTpiPage().seo);
}

export default function TpiPage() {
  return <TpiPageView content={getTpiPage()} />;
}
