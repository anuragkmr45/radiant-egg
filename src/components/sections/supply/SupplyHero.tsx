import { MarketingTextHero } from "@/components/sections/shared/MarketingTextHero";
import type { ServiceHeroContent } from "@/types/content";

interface SupplyHeroProps {
  content: ServiceHeroContent;
}

export function SupplyHero({ content }: SupplyHeroProps) {
  return (
    <MarketingTextHero
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Supply" },
      ]}
      className="about-hero--supply"
      description={content.description}
      eyebrow={content.eyebrow}
      primaryAction={content.primaryAction}
      summary={content.summary}
      title={content.title}
    />
  );
}
