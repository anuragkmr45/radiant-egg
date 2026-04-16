import type { CSSProperties } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIndustriesMarquee } from "@/components/sections/home/HomeIndustriesMarquee";
import type { HomePageContent } from "@/types/content";

interface HomeIndustriesSectionProps {
  content: HomePageContent["industries"];
}

export function HomeIndustriesSection({ content }: HomeIndustriesSectionProps) {
  const items = content.items ?? [];

  return (
    <section className="home-industries home-section" id="industries">
      <PageContainer>
        <div
          className="home-section__intro home-section__intro--center home-section__intro--on-dark motion-sequence"
          data-home-reveal=""
        >
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-section__title home-section__title--on-dark">{content.title}</h2>
          <p className="home-section__body home-section__body--lead home-section__body--on-dark">
            {content.description}
          </p>
        </div>

        <div data-home-reveal="" style={{ "--reveal-delay": "70ms" } as CSSProperties}>
          <HomeIndustriesMarquee items={items} />
        </div>
      </PageContainer>
    </section>
  );
}
