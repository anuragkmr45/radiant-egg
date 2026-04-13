import type { Metadata } from "next";

import { AboutPageView } from "@/components/sections/about/AboutPageView";
import { getAboutPage } from "@/content/about";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata(getAboutPage().seo);
}

export default function AboutPage() {
  return <AboutPageView content={getAboutPage()} />;
}
