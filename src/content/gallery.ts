import "server-only";

import { cache } from "react";

import { galleryPage as defaultGalleryPage } from "@/cms/defaults/gallery";
import { loadCmsDocument } from "@/cms/load";
import type { GalleryPageContent } from "@/types/content";

const galleryPageFile = "gallery.json";

export const getGalleryPage = cache(function getGalleryPage(): GalleryPageContent {
  return loadCmsDocument(galleryPageFile, defaultGalleryPage);
});
