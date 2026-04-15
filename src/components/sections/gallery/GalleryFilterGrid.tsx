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

export function GalleryFilterGrid({
  categories,
  items,
}: GalleryFilterGridProps) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const galleryCategories = Array.from(
    new Set([...categories, ...items.map((item) => item.category)]),
  );

  if (items.length === 0) {
    return (
      <div className="gallery-empty" data-marketing-reveal="">
        <p className="gallery-empty__title">No gallery images have been published yet.</p>
        <p className="gallery-empty__description">
          Add images from the CMS Gallery collection to publish project visuals here and in the About page preview.
        </p>
        <div className="gallery-empty__categories" role="list">
          {galleryCategories.map((category) => (
            <BadgePill key={category} role="listitem" tone="outline">
              {category}
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
          {[ALL_CATEGORY, ...galleryCategories].map((category) => {
            const active = category === activeCategory;

            return (
              <button
                aria-pressed={active}
                className={active ? "gallery-filter__chip gallery-filter__chip--active" : "gallery-filter__chip"}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="gallery-grid gallery-grid--page">
        {items.map((item, index) => {
          const hidden = activeCategory !== ALL_CATEGORY && item.category !== activeCategory;

          return (
            <GalleryImageCard
              hidden={hidden}
              index={index}
              item={item}
              key={`${item.category}-${item.title}-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
