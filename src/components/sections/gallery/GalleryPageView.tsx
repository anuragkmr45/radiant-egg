import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { PageContainer } from "@/components/layout/PageContainer";
import { GalleryFilterGrid } from "@/components/sections/gallery/GalleryFilterGrid";
import type { GalleryPageContent } from "@/types/content";

interface GalleryPageViewProps {
  content: GalleryPageContent;
}

export function GalleryPageView({ content }: GalleryPageViewProps) {
  return (
    <>
      <MarketingMotionController />

      <section className="gallery-hero">
        <PageContainer>
          <div className="gallery-hero__copy motion-sequence" data-marketing-reveal="">
            <p className="gallery-hero__eyebrow">{content.hero.eyebrow}</p>
            <h1 className="gallery-hero__title">{content.hero.title}</h1>
            <p className="gallery-hero__description">{content.hero.description}</p>
          </div>
        </PageContainer>
      </section>

      <section className="gallery-page">
        <PageContainer>
          <GalleryFilterGrid categories={content.categories} items={content.items} />
        </PageContainer>
      </section>
    </>
  );
}
