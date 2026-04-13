import "server-only";

import { cache } from "react";

import { contactPage as defaultContactPage } from "@/cms/defaults/contact";
import { loadCmsDocument } from "@/cms/load";
import type { ContactPageContent } from "@/types/content";

const contactPageFile = "pages/contact.json";

export const getContactPage = cache(function getContactPage(): ContactPageContent {
  return loadCmsDocument(contactPageFile, defaultContactPage);
});
