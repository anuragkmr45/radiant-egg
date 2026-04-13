import type { Metadata } from "next";

import { HomePageView } from "@/components/sections/home/HomePageView";
import { homePage } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(homePage.seo);

export default function HomePage() {
  return <HomePageView content={homePage} />;
}
