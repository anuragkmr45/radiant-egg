import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/sections/PlaceholderPage";
import { homePage } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(homePage.seo);

export default function HomePage() {
  return <PlaceholderPage content={homePage} />;
}
