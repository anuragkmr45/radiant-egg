import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { ConsultancyDetailSection } from "@/components/sections/consultancy/ConsultancyDetailSection";
import { ConsultancyExpertiseStrip } from "@/components/sections/consultancy/ConsultancyExpertiseStrip";
import { ServiceCtaSection } from "@/components/sections/services/ServiceCtaSection";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import type { ConsultancyPageContent } from "@/types/content";

interface ConsultancyPageViewProps {
  content: ConsultancyPageContent;
}

export function ConsultancyPageView({ content }: ConsultancyPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <ServiceHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      {content.detailSections.map((section) => (
        <ConsultancyDetailSection content={section} key={section.title} />
      ))}
      <ConsultancyExpertiseStrip items={content.expertiseStrip} />
      <ServiceCtaSection content={content.cta} />
    </>
  );
}
