import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ServiceFeatureGridContent } from "@/types/content";

interface ServiceFeatureGridSectionProps {
  content: ServiceFeatureGridContent;
  muted?: boolean;
}

export function ServiceFeatureGridSection({
  content,
  muted = false,
}: ServiceFeatureGridSectionProps) {
  return (
    <section
      className={muted ? "service-section service-section--muted" : "service-section service-section--page"}
      id={content.anchorId}
    >
      <PageContainer>
        <div className="service-section__header service-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="service-feature-grid">
          {content.items.map((item, index) => (
            <article
              className="service-feature-card"
              data-marketing-reveal=""
              key={item.title}
              style={marketingRevealStyle(index * 70)}
            >
              <span className="service-feature-card__icon">
                <HomeIcon name={item.icon} size={24} />
              </span>
              <h3 className="service-feature-card__title">{item.title}</h3>
              <p className="service-feature-card__description">{item.description}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
