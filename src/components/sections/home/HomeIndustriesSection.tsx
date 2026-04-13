import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { HomePageContent } from "@/types/content";

interface HomeIndustriesSectionProps {
  content: HomePageContent["industries"];
}

export function HomeIndustriesSection({ content }: HomeIndustriesSectionProps) {
  const items = content.items ?? [];

  return (
    <section className="home-industries home-section" id="industries">
      <PageContainer>
        <div className="home-section__intro home-section__intro--center home-section__intro--on-dark">
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-section__title home-section__title--on-dark">{content.title}</h2>
          <p className="home-section__body home-section__body--lead home-section__body--on-dark">
            {content.description}
          </p>
        </div>

        <div className="home-industries__grid">
          {items.map((item) => (
            <article className="home-industry-card" key={item.title}>
              <span className="home-industry-card__icon">
                <HomeIcon name={item.icon} size={30} />
              </span>
              <h3 className="home-industry-card__title">{item.title}</h3>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
