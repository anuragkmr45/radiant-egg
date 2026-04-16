import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ServiceFeatureGridContent } from "@/types/content";

interface MaterialTestingIndustriesSectionProps {
  content: ServiceFeatureGridContent;
}

export function MaterialTestingIndustriesSection({
  content,
}: MaterialTestingIndustriesSectionProps) {
  return (
    <section className="service-section service-section--muted material-industries" id={content.anchorId}>
      <PageContainer>
        <div className="service-section__header service-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="material-industries__rail" data-marketing-reveal="" style={marketingRevealStyle(80)}>
          <div className="material-industries__viewport" aria-label="Industries supported by RECPL material testing">
            <div className="material-industries__track">
              <div className="material-industries__group">
                {content.items.map((item) => (
                  <article className="material-industry-card" key={item.title}>
                    <span className="material-industry-card__icon">
                      <HomeIcon name={item.icon} size={26} />
                    </span>
                    <h3 className="material-industry-card__title">{item.title}</h3>
                    <p className="material-industry-card__description">{item.description}</p>
                  </article>
                ))}
              </div>
              <div aria-hidden="true" className="material-industries__group">
                {content.items.map((item) => (
                  <article className="material-industry-card" key={`${item.title}-duplicate`}>
                    <span className="material-industry-card__icon">
                      <HomeIcon name={item.icon} size={26} />
                    </span>
                    <h3 className="material-industry-card__title">{item.title}</h3>
                    <p className="material-industry-card__description">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
