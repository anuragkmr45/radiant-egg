import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { SupplyCatalogueSection } from "@/components/sections/supply/SupplyCatalogueSection";
import { SupplyHero } from "@/components/sections/supply/SupplyHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import { ServiceListGridSection } from "@/components/sections/services/ServiceListGridSection";
import type { SupplyPageContent } from "@/types/content";

interface SupplyPageViewProps {
  content: SupplyPageContent;
}

export function SupplyPageView({ content }: SupplyPageViewProps) {
  return (
    <>
      <MarketingMotionController />
      <SupplyHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      {content.listGrid ? (
        <ServiceListGridSection
          content={content.listGrid}
          gridClassName="service-list-grid--supply"
        />
      ) : null}
      <SupplyCatalogueSection content={content.catalogue} />
    </>
  );
}
