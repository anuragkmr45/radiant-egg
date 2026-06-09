import "server-only";

import { cache } from "react";

import { loadCmsDocument } from "@/cms/load";
import { tpiPage as defaultTpiPage } from "@/cms/defaults/tpi";
import type { ServicePageContent } from "@/types/content";

const tpiPageFile = "pages/tpi.json";

export const getTpiPage = cache(async function getTpiPage(): Promise<ServicePageContent> {
  return loadCmsDocument(tpiPageFile, defaultTpiPage);
});
