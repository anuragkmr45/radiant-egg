import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ServiceListGridContent } from "@/types/content";

interface ServiceListGridSectionProps {
  content: ServiceListGridContent;
}

export function ServiceListGridSection({ content }: ServiceListGridSectionProps) {
  return (
    <section className="service-section service-section--page" id={content.anchorId}>
      <PageContainer>
        <div className="service-section__header service-section__header--center" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="service-list-grid">
          {content.items.map((item, index) => (
            <article
              className="service-list-card"
              data-marketing-reveal=""
              key={item.title}
              style={marketingRevealStyle(index * 75)}
            >
              <span className="service-list-card__icon">
                <HomeIcon name={item.icon} size={24} />
              </span>
              <h3 className="service-list-card__title">{item.title}</h3>
              <ul className="service-list-card__items" role="list">
                {item.items.map((entry) => (
                  <li className="service-list-card__item" key={entry}>
                    <span aria-hidden="true" className="service-list-card__bullet" />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
