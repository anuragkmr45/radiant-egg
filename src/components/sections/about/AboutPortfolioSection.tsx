import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { AboutPageContent } from "@/types/content";

interface AboutPortfolioSectionProps {
  content: AboutPageContent["portfolio"];
}

export function AboutPortfolioSection({ content }: AboutPortfolioSectionProps) {
  return (
    <section className="about-section">
      <PageContainer>
        <div className="about-section__header about-section__header--center">
          <span className="about-section__eyebrow">{content.eyebrow}</span>
          <h2 className="about-section__title">{content.title}</h2>
        </div>

        <div className="about-portfolio__grid">
          {content.items.map((item) => (
            <article className="about-portfolio__tile" key={item.label}>
              <span className="about-portfolio__icon">
                <HomeIcon name={item.icon} size={30} />
              </span>
              <h3 className="about-portfolio__label">{item.label}</h3>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
