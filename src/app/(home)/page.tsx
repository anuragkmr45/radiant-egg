import type { Metadata } from "next";

import { HomePageView } from "@/components/sections/home/HomePageView";
import { getHomePage } from "@/content/home";
import { createPageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createPageMetadata(getHomePage().seo);
}

export default function HomePage() {
  return <HomePageView content={getHomePage()} />;
}
