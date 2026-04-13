import { AboutCtaSection } from "@/components/sections/about/AboutCtaSection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntroSection } from "@/components/sections/about/AboutIntroSection";
import { AboutLeadershipSection } from "@/components/sections/about/AboutLeadershipSection";
import { AboutPortfolioSection } from "@/components/sections/about/AboutPortfolioSection";
import { AboutPrinciplesSection } from "@/components/sections/about/AboutPrinciplesSection";
import { AboutStatsStrip } from "@/components/sections/about/AboutStatsStrip";
import { AboutStrengthsSection } from "@/components/sections/about/AboutStrengthsSection";
import type { AboutPageContent } from "@/types/content";

interface AboutPageViewProps {
  content: AboutPageContent;
}

export function AboutPageView({ content }: AboutPageViewProps) {
  return (
    <>
      <AboutHero content={content.hero} />
      <AboutIntroSection content={content.intro} />
      <AboutStrengthsSection content={content.strengths} />
      <AboutPrinciplesSection content={content.principles} />
      <AboutLeadershipSection content={content.leadership} />
      <AboutStatsStrip items={content.stats} />
      <AboutPortfolioSection content={content.portfolio} />
      <AboutCtaSection content={content.cta} />
    </>
  );
}
