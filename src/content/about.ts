import "server-only";

import { cache } from "react";

import { aboutPage as defaultAboutPage } from "@/cms/defaults/about";
import { loadCmsDocument } from "@/cms/load";
import type { AboutPageContent } from "@/types/content";

const aboutPageFile = "pages/about.json";

export const getAboutPage = cache(async function getAboutPage(): Promise<AboutPageContent> {
  return loadCmsDocument(aboutPageFile, defaultAboutPage);
});
