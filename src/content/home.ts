import "server-only";

import { homePage as defaultHomePage } from "@/cms/defaults/home";
import { loadCmsDocument } from "@/cms/load";
import type { HomePageContent } from "@/types/content";

const homePageFile = "pages/home.json";

export function getHomePage(): HomePageContent {
  return loadCmsDocument(homePageFile, defaultHomePage);
}
