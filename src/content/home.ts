import "server-only";

import { cache } from "react";

import { homePage as defaultHomePage } from "@/cms/defaults/home";
import { loadCmsDocument } from "@/cms/load";
import type { HomePageContent } from "@/types/content";

const homePageFile = "pages/home.json";

export const getHomePage = cache(function getHomePage(): HomePageContent {
  return loadCmsDocument(homePageFile, defaultHomePage);
});
