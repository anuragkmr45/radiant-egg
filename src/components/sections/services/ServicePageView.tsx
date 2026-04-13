import { ServiceCtaSection } from "@/components/sections/services/ServiceCtaSection";
import { ServiceFeatureGridSection } from "@/components/sections/services/ServiceFeatureGridSection";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntroSection } from "@/components/sections/services/ServiceIntroSection";
import { ServiceListGridSection } from "@/components/sections/services/ServiceListGridSection";
import { ServiceProcessSection } from "@/components/sections/services/ServiceProcessSection";
import { ServiceStandardsSection } from "@/components/sections/services/ServiceStandardsSection";
import type { ServicePageContent } from "@/types/content";

interface ServicePageViewProps {
  content: ServicePageContent;
}

export function ServicePageView({ content }: ServicePageViewProps) {
  return (
    <>
      <ServiceHero content={content.hero} />
      <ServiceIntroSection content={content.intro} />
      {content.featureGrid ? <ServiceFeatureGridSection content={content.featureGrid} muted /> : null}
      {content.listGrid ? <ServiceListGridSection content={content.listGrid} /> : null}
      {content.process ? <ServiceProcessSection content={content.process} /> : null}
      {content.standards ? <ServiceStandardsSection content={content.standards} /> : null}
      <ServiceCtaSection content={content.cta} />
    </>
  );
}
