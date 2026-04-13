import type { Metadata } from "next";

import { AboutPageView } from "@/components/sections/about/AboutPageView";
import { aboutPage } from "@/content/about";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(aboutPage.seo);

export default function AboutPage() {
  return <AboutPageView content={aboutPage} />;
}
