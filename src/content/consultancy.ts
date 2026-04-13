import "server-only";

import { cache } from "react";

import { consultancyPage as defaultConsultancyPage } from "@/cms/defaults/consultancy";
import { loadCmsDocument } from "@/cms/load";
import type { ConsultancyPageContent } from "@/types/content";

const consultancyPageFile = "pages/consultancy.json";

export const getConsultancyPage = cache(function getConsultancyPage(): ConsultancyPageContent {
  return loadCmsDocument(consultancyPageFile, defaultConsultancyPage);
});
