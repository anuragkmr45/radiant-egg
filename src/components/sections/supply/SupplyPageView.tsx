import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { ServiceCtaSection } from "@/components/sections/services/ServiceCtaSection";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import { ServiceListGridSection } from "@/components/sections/services/ServiceListGridSection";
import type { ServicePageContent } from "@/types/content";

interface SupplyPageViewProps {
  content: ServicePageContent;
}

export function SupplyPageView({ content }: SupplyPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <ServiceHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      {content.listGrid ? (
        <ServiceListGridSection
          content={content.listGrid}
          gridClassName="service-list-grid--supply"
        />
      ) : null}
      <ServiceCtaSection content={content.cta} />
    </>
  );
}
