import "server-only";

import { contactPage as defaultContactPage } from "@/cms/defaults/contact";
import { loadCmsDocument } from "@/cms/load";
import type { ContactPageContent } from "@/types/content";

const contactPageFile = "pages/contact.json";

export function getContactPage(): ContactPageContent {
  return loadCmsDocument(contactPageFile, defaultContactPage);
}
