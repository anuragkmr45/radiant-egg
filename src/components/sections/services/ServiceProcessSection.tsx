import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ServiceProcessContent } from "@/types/content";

interface ServiceProcessSectionProps {
  content: ServiceProcessContent;
}

export function ServiceProcessSection({ content }: ServiceProcessSectionProps) {
  return (
    <section className="service-section service-section--page">
      <PageContainer>
        <div className="service-section__header service-section__header--center" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="service-process">
          <div aria-hidden="true" className="service-process__line" />
          <div className="service-process__steps">
            {content.steps.map((step, index) => (
              <article
                className="service-process__step"
                data-marketing-reveal=""
                key={step.stepLabel}
                style={marketingRevealStyle(index * 80)}
              >
                <div className="service-process__marker">
                  <HomeIcon name={step.icon} size={24} />
                </div>
                <div className="service-process__content">
                  <span className="service-process__label">{step.stepLabel}</span>
                  <h3 className="service-process__title">{step.title}</h3>
                  <p className="service-process__description">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
