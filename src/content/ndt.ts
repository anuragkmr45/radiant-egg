import "server-only";

import { loadCmsDocument } from "@/cms/load";
import { ndtPage as defaultNdtPage } from "@/cms/defaults/ndt";
import type { NdtPageContent } from "@/types/content";

const ndtPageFile = "pages/ndt.json";

export function getNdtPage(): NdtPageContent {
  return loadCmsDocument(ndtPageFile, defaultNdtPage);
}
