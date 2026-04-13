import type { Metadata } from "next";

import { TpiPageView } from "@/components/sections/tpi/TpiPageView";
import { createPageMetadata } from "@/lib/metadata";
import { tpiPage } from "@/content/tpi";

export const metadata: Metadata = createPageMetadata(tpiPage.seo);

export default function TpiPage() {
  return <TpiPageView content={tpiPage} />;
}
