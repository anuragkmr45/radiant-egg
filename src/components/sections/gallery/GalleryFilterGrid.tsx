"use client";

import { useState } from "react";

import { BadgePill } from "@/components/ui/BadgePill";
import { GalleryImageCard } from "@/components/sections/gallery/GalleryImageCard";
import type { GalleryItem } from "@/types/content";

interface GalleryFilterGridProps {
  categories: readonly string[];
  items: readonly GalleryItem[];
}

const ALL_CATEGORY = "All";
const ALL_CATEGORY_KEY = "__all__";

function formatGalleryCategory(category: string) {
  return category.trim().replace(/\s+/g, " ");
}

function getGalleryCategoryKey(category: string) {
  return formatGalleryCategory(category)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getGalleryCategories({
  categories,
  items,
}: {
  categories: readonly string[];
  items: readonly GalleryItem[];
}) {
  const categoryMap = new Map<string, string>();

  for (const category of [...categories, ...items.map((item) => item.category)]) {
    const label = formatGalleryCategory(category);
    const key = getGalleryCategoryKey(label);

    if (!label || !key || key === "all" || categoryMap.has(key)) {
      continue;
    }

    categoryMap.set(key, label);
  }

  return Array.from(categoryMap, ([key, label]) => ({
    key,
    label,
  }));
}

export function GalleryFilterGrid({
  categories,
  items,
}: GalleryFilterGridProps) {
  const [activeCategoryKey, setActiveCategoryKey] = useState(ALL_CATEGORY_KEY);
  const galleryCategories = getGalleryCategories({ categories, items });

  if (items.length === 0) {
    return (
      <div className="gallery-empty" data-marketing-reveal="">
        <p className="gallery-empty__title">No gallery images have been published yet.</p>
        <p className="gallery-empty__description">
          Add images from the CMS Gallery collection to publish project visuals here and in the About page preview.
        </p>
        <div className="gallery-empty__categories" role="list">
          {galleryCategories.map((category) => (
            <BadgePill key={category.key} role="listitem" tone="outline">
              {category.label}
            </BadgePill>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-filter" data-marketing-reveal="">
        <div
          aria-label="Filter gallery by category"
          className="gallery-filter__chips"
          role="toolbar"
        >
          {[{ key: ALL_CATEGORY_KEY, label: ALL_CATEGORY }, ...galleryCategories].map((category) => {
            const active = category.key === activeCategoryKey;

            return (
              <button
                aria-pressed={active}
                className={active ? "gallery-filter__chip gallery-filter__chip--active" : "gallery-filter__chip"}
                key={category.key}
                onClick={() => setActiveCategoryKey(category.key)}
                type="button"
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="gallery-grid gallery-grid--page">
        {items.map((item, index) => {
          const hidden =
            activeCategoryKey !== ALL_CATEGORY_KEY && getGalleryCategoryKey(item.category) !== activeCategoryKey;

          return (
            <GalleryImageCard
              hidden={hidden}
              index={index}
              item={item}
              key={`${item.category}-${item.title}-${index}`}
              priority={activeCategoryKey === ALL_CATEGORY_KEY ? index < 2 : !hidden}
            />
          );
        })}
      </div>
    </>
  );
}
