import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { ConsultancyDetailSection } from "@/components/sections/consultancy/ConsultancyDetailSection";
import { ConsultancyExpertiseStrip } from "@/components/sections/consultancy/ConsultancyExpertiseStrip";
import { ServiceCtaSection } from "@/components/sections/services/ServiceCtaSection";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import { ServiceProcessSection } from "@/components/sections/services/ServiceProcessSection";
import { ServiceStandardsSection } from "@/components/sections/services/ServiceStandardsSection";
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
        <div className="consultancy-section-group" key={section.title}>
          <ConsultancyDetailSection content={section} />
          {section.process ? (
            <ServiceProcessSection
              className="service-section--tpi-process service-section--consultancy-embedded"
              content={section.process}
            />
          ) : null}
          {section.standards ? (
            <ServiceStandardsSection
              className="service-section--tpi-standards service-section--consultancy-embedded"
              content={section.standards}
            />
          ) : null}
        </div>
      ))}
      <ConsultancyExpertiseStrip items={content.expertiseStrip} />
      <ServiceCtaSection content={content.cta} />
    </>
  );
}
