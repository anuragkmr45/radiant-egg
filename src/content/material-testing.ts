import "server-only";

import { cache } from "react";

import { loadCmsDocument } from "@/cms/load";
import { materialTestingPage as defaultMaterialTestingPage } from "@/cms/defaults/material-testing";
import type { MaterialTestingPageContent } from "@/types/content";

const materialTestingPageFile = "pages/material-testing.json";

export const getMaterialTestingPage = cache(function getMaterialTestingPage(): MaterialTestingPageContent {
  return loadCmsDocument(materialTestingPageFile, defaultMaterialTestingPage);
});
