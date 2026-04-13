import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { HomePageContent } from "@/types/content";

interface HomeReasonsSectionProps {
  content: HomePageContent["reasons"];
}

export function HomeReasonsSection({ content }: HomeReasonsSectionProps) {
  const items = content.items ?? [];

  return (
    <section className="home-reasons home-section">
      <PageContainer>
        <div className="home-section__intro home-section__intro--center">
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-section__title">{content.title}</h2>
          <p className="home-section__body home-section__body--lead">{content.description}</p>
        </div>

        <div className="home-reasons__grid">
          {items.map((item) => (
            <article className="home-reason-card" key={item.title}>
              <span className="home-reason-card__icon">
                <HomeIcon name={item.icon} size={28} />
              </span>
              <h3 className="home-reason-card__title">{item.title}</h3>
              <p className="home-reason-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
