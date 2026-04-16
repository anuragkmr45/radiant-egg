import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { MaterialTestingAccordionSection } from "@/components/sections/material-testing/MaterialTestingAccordionSection";
import { MaterialTestingCtaSection } from "@/components/sections/material-testing/MaterialTestingCtaSection";
import { MaterialTestingHero } from "@/components/sections/material-testing/MaterialTestingHero";
import { MaterialTestingIndustriesSection } from "@/components/sections/material-testing/MaterialTestingIndustriesSection";
import { MaterialTestingStandardsSection } from "@/components/sections/material-testing/MaterialTestingStandardsSection";
import { ServiceFeatureGridSection } from "@/components/sections/services/ServiceFeatureGridSection";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import { ServiceProcessSection } from "@/components/sections/services/ServiceProcessSection";
import type { MaterialTestingPageContent } from "@/types/content";

interface MaterialTestingPageViewProps {
  content: MaterialTestingPageContent;
}

export function MaterialTestingPageView({
  content,
}: MaterialTestingPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <MaterialTestingHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      <ServiceFeatureGridSection
        content={content.whyMatters}
        gridClassName="service-feature-grid--material-testing"
      />
      <MaterialTestingAccordionSection content={content.metalTesting} tone="metal" />
      <MaterialTestingAccordionSection content={content.concreteTesting} tone="concrete" />
      <ServiceFeatureGridSection
        content={content.whyChoose}
        gridClassName="service-feature-grid--material-testing"
        muted
      />
      <MaterialTestingIndustriesSection content={content.industries} />
      <ServiceProcessSection
        className="service-section--material-testing-process"
        content={content.process}
      />
      <MaterialTestingStandardsSection content={content.standards} />
      <MaterialTestingCtaSection cta={content.cta} relatedServices={content.relatedServices} />
    </>
  );
}
