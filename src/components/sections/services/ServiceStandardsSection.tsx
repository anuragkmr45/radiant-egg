import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ServiceStandardsContent } from "@/types/content";

interface ServiceStandardsSectionProps {
  content: ServiceStandardsContent;
}

export function ServiceStandardsSection({ content }: ServiceStandardsSectionProps) {
  return (
    <section className="service-section service-section--muted">
      <PageContainer>
        <div className="service-section__header service-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="service-standards">
          {content.items.map((item, index) => (
            <article
              className={item.featured ? "service-standard-card service-standard-card--featured" : "service-standard-card"}
              data-marketing-reveal=""
              key={item.code}
              style={marketingRevealStyle(index * 55)}
            >
              <span className="service-standard-card__icon">
                <HomeIcon name={item.icon} size={18} />
              </span>
              <h3 className="service-standard-card__code">{item.code}</h3>
              <p className="service-standard-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
