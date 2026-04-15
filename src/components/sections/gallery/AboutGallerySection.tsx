import { PageContainer } from "@/components/layout/PageContainer";
import { BadgePill } from "@/components/ui/BadgePill";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GalleryImageCard } from "@/components/sections/gallery/GalleryImageCard";
import type { AboutPageContent, GalleryPageContent } from "@/types/content";

interface AboutGallerySectionProps {
  content: AboutPageContent["galleryPreview"];
  gallery: GalleryPageContent;
}

export function AboutGallerySection({
  content,
  gallery,
}: AboutGallerySectionProps) {
  const previewItems = gallery.items.slice(0, content.previewCount ?? 6);

  return (
    <section className="about-section about-gallery">
      <PageContainer>
        <div className="about-section__header about-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="about-section__eyebrow">{content.eyebrow}</span>
          <h2 className="about-section__title">{content.title}</h2>
          <p className="about-section__description">{content.description}</p>
        </div>

        {previewItems.length > 0 ? (
          <div className="gallery-grid gallery-grid--preview">
            {previewItems.map((item, index) => (
              <GalleryImageCard
                index={index}
                item={item}
                key={`${item.category}-${item.title}-${index}`}
                priority={index < 3}
                sizes="(min-width: 1280px) 26vw, (min-width: 768px) 42vw, 100vw"
              />
            ))}
          </div>
        ) : (
          <div className="gallery-empty about-gallery__empty" data-marketing-reveal="">
            <p className="gallery-empty__title">Gallery images will appear here as they are added from CMS.</p>
            <p className="gallery-empty__description">
              Upload field inspections, laboratory work, design visuals, equipment shots, and team photographs to
              populate the About preview and the full gallery page together.
            </p>
            <div className="gallery-empty__categories" role="list">
              {gallery.categories.map((category) => (
                <BadgePill key={category} role="listitem" tone="outline">
                  {category}
                </BadgePill>
              ))}
            </div>
          </div>
        )}

        <div className="about-gallery__actions" data-marketing-reveal="">
          <ButtonLink className="about-gallery__action" href="/gallery" variant="ghost">
            {content.viewMoreLabel}
          </ButtonLink>
        </div>
      </PageContainer>
    </section>
  );
}
