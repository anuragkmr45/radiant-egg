import Image from "next/image";

import { marketingRevealStyle } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/content";

interface GalleryImageCardProps {
  item: GalleryItem;
  index: number;
  hidden?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function GalleryImageCard({
  item,
  index,
  hidden = false,
  priority = false,
  sizes = "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw",
}: GalleryImageCardProps) {
  return (
    <article
      className={cn("gallery-card", hidden ? "gallery-card--hidden" : null)}
      data-marketing-reveal=""
      hidden={hidden}
      tabIndex={0}
      style={marketingRevealStyle(index * 70)}
    >
      <div className="gallery-card__media">
        <Image
          alt={item.alt}
          className="gallery-card__image"
          fill
          priority={priority}
          sizes={sizes}
          src={item.image.src}
        />
        <div className="gallery-card__overlay" />
        <div className="gallery-card__body">
          <p className="gallery-card__category">{item.category}</p>
          <h3 className="gallery-card__title">{item.title}</h3>
          {item.caption ? <p className="gallery-card__caption">{item.caption}</p> : null}
        </div>
      </div>
    </article>
  );
}
