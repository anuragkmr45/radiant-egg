import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { createPageMetadata } from "@/lib/metadata";
import { tpiPage } from "@/content/tpi";

export const metadata: Metadata = createPageMetadata(tpiPage.seo);

export default function TpiPage() {
  return <PlaceholderPage content={tpiPage} />;
}
