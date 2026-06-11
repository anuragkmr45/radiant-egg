import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { PageContainer } from "@/components/layout/PageContainer";
import { GalleryFilterGrid } from "@/components/sections/gallery/GalleryFilterGrid";
import { MarketingTextHero } from "@/components/sections/shared/MarketingTextHero";
import type { GalleryPageContent } from "@/types/content";

interface GalleryPageViewProps {
  content: GalleryPageContent;
}

export function GalleryPageView({ content }: GalleryPageViewProps) {
  return (
    <>
      <MarketingMotionController />

      <MarketingTextHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
        className="about-hero--gallery"
        description={content.hero.description}
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
      />

      <section className="gallery-page">
        <PageContainer>
          <GalleryFilterGrid categories={content.categories} items={content.items} />
        </PageContainer>
      </section>
    </>
  );
}
