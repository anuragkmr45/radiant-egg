import "server-only";

import { cache } from "react";

import { loadCmsDocument } from "@/cms/load";
import { supplyPage as defaultSupplyPage } from "@/cms/defaults/supply";
import type { SupplyPageContent } from "@/types/content";

const supplyPageFile = "pages/supply.json";

export const getSupplyPage = cache(async function getSupplyPage(): Promise<SupplyPageContent> {
  return loadCmsDocument(supplyPageFile, defaultSupplyPage);
});
