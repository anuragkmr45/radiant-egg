import "server-only";

import { cache } from "react";

import { loadCmsDocument } from "@/cms/load";
import { supplyPage as defaultSupplyPage } from "@/cms/defaults/supply";
import type { ServicePageContent } from "@/types/content";

const supplyPageFile = "pages/supply.json";

export const getSupplyPage = cache(function getSupplyPage(): ServicePageContent {
  return loadCmsDocument(supplyPageFile, defaultSupplyPage);
});
