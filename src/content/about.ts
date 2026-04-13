import "server-only";

import { aboutPage as defaultAboutPage } from "@/cms/defaults/about";
import { loadCmsDocument } from "@/cms/load";
import type { AboutPageContent } from "@/types/content";

const aboutPageFile = "pages/about.json";

export function getAboutPage(): AboutPageContent {
  return loadCmsDocument(aboutPageFile, defaultAboutPage);
}
