import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { aboutPage } from "@/content/about";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(aboutPage.seo);

export default function AboutPage() {
  return <PlaceholderPage content={aboutPage} />;
}
