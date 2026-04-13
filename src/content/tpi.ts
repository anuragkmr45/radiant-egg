import "server-only";

import { loadCmsDocument } from "@/cms/load";
import { tpiPage as defaultTpiPage } from "@/cms/defaults/tpi";
import type { ServicePageContent } from "@/types/content";

const tpiPageFile = "pages/tpi.json";

export function getTpiPage(): ServicePageContent {
  return loadCmsDocument(tpiPageFile, defaultTpiPage);
}
