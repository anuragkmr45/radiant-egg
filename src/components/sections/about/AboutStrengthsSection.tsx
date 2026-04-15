import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { AboutPageContent } from "@/types/content";

interface AboutStrengthsSectionProps {
  content: AboutPageContent["strengths"];
}

export function AboutStrengthsSection({ content }: AboutStrengthsSectionProps) {
  return (
    <section className="about-section about-section--muted about-strengths">
      <PageContainer>
        <div
          className="about-section__header about-section__header--center about-strengths__header motion-sequence"
          data-marketing-reveal=""
        >
          <span className="about-section__eyebrow">{content.eyebrow}</span>
          <h2 className="about-section__title">{content.title}</h2>
          {content.description ? (
            <p className="about-section__description about-strengths__description">
              {content.description}
            </p>
          ) : null}
        </div>

        <div className="about-strengths__grid">
          {content.items.map((item, index) => (
            <article
              className="about-dual-card about-dual-card--strength"
              data-marketing-reveal=""
              key={item.title}
              style={marketingRevealStyle(index * 70)}
              tabIndex={0}
            >
              <div className="about-dual-card__face about-dual-card__face--front">
                <span className="about-dual-card__icon">
                  <HomeIcon name={item.icon} size={32} />
                </span>
                <h3 className="about-dual-card__title">{item.title}</h3>
              </div>
              <div className="about-dual-card__face about-dual-card__face--back">
                <p className="about-dual-card__description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
