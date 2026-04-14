import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { NdtApplicationsSection } from "@/components/sections/ndt/NdtApplicationsSection";
import { ServiceCtaSection } from "@/components/sections/services/ServiceCtaSection";
import { ServiceFeatureGridSection } from "@/components/sections/services/ServiceFeatureGridSection";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import type { NdtPageContent } from "@/types/content";

interface NdtPageViewProps {
  content: NdtPageContent;
}

export function NdtPageView({ content }: NdtPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <ServiceHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      <ServiceFeatureGridSection content={content.methods} muted />
      <NdtApplicationsSection content={content.applications} />
      <ServiceCtaSection content={content.cta} />
    </>
  );
}
