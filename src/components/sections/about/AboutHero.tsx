import { MarketingTextHero } from "@/components/sections/shared/MarketingTextHero";
import type { AboutHeroContent } from "@/types/content";

interface AboutHeroProps {
  content: AboutHeroContent;
}

export function AboutHero({ content }: AboutHeroProps) {
  return (
    <MarketingTextHero
      breadcrumbs={content.breadcrumbs}
      className="about-hero--about"
      description={content.description}
      title={content.title}
    />
  );
}
