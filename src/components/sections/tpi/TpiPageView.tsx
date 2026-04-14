import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { ServiceCtaSection } from "@/components/sections/services/ServiceCtaSection";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import { ServiceListGridSection } from "@/components/sections/services/ServiceListGridSection";
import { ServiceProcessSection } from "@/components/sections/services/ServiceProcessSection";
import { ServiceStandardsSection } from "@/components/sections/services/ServiceStandardsSection";
import type { ServicePageContent } from "@/types/content";

interface TpiPageViewProps {
  content: ServicePageContent;
}

export function TpiPageView({ content }: TpiPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <ServiceHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      {content.listGrid ? <ServiceListGridSection content={content.listGrid} /> : null}
      {content.process ? <ServiceProcessSection content={content.process} /> : null}
      {content.standards ? <ServiceStandardsSection content={content.standards} /> : null}
      <ServiceCtaSection content={content.cta} />
    </>
  );
}
