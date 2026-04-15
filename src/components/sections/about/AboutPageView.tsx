import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { AboutCtaSection } from "@/components/sections/about/AboutCtaSection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntroSection } from "@/components/sections/about/AboutIntroSection";
import { AboutLeadershipSection } from "@/components/sections/about/AboutLeadershipSection";
import { AboutPrinciplesSection } from "@/components/sections/about/AboutPrinciplesSection";
import { AboutStatsStrip } from "@/components/sections/about/AboutStatsStrip";
import { AboutStrengthsSection } from "@/components/sections/about/AboutStrengthsSection";
import { AboutGallerySection } from "@/components/sections/gallery/AboutGallerySection";
import type { AboutPageContent, GalleryPageContent } from "@/types/content";

interface AboutPageViewProps {
  content: AboutPageContent;
  gallery: GalleryPageContent;
}

export function AboutPageView({ content, gallery }: AboutPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <AboutHero content={content.hero} />
      <AboutIntroSection content={content.intro} />
      <AboutStrengthsSection content={content.strengths} />
      <AboutPrinciplesSection content={content.principles} />
      <AboutLeadershipSection content={content.leadership} />
      <AboutStatsStrip items={content.stats} />
      <AboutGallerySection content={content.galleryPreview} gallery={gallery} />
      <AboutCtaSection content={content.cta} />
    </>
  );
}
