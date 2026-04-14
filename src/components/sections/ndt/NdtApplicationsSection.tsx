import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { NdtApplicationsContent } from "@/types/content";

interface NdtApplicationsSectionProps {
  content: NdtApplicationsContent;
}

export function NdtApplicationsSection({ content }: NdtApplicationsSectionProps) {
  return (
    <section className="service-section service-section--page ndt-applications" id={content.anchorId}>
      <PageContainer>
        <div className="service-section__header service-section__header--center" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
        </div>

        <div className="ndt-applications__grid">
          <div className="ndt-applications__column" data-marketing-reveal="">
            <h3 className="ndt-applications__column-title">{content.industriesTitle}</h3>
            <ul className="ndt-applications__chips" role="list">
              {content.industries.map((item, index) => (
                <li
                  className="ndt-applications__chip"
                  data-marketing-reveal=""
                  key={item.label}
                  style={marketingRevealStyle(index * 60)}
                >
                  <span className="ndt-applications__chip-icon">
                    <HomeIcon name={item.icon} size={20} />
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="ndt-applications__column"
            data-marketing-reveal=""
            style={marketingRevealStyle(90)}
          >
            <h3 className="ndt-applications__column-title">{content.equipmentTitle}</h3>
            <ul className="ndt-applications__list" role="list">
              {content.equipment.map((item, index) => (
                <li
                  className="ndt-applications__list-item"
                  data-marketing-reveal=""
                  key={item}
                  style={marketingRevealStyle(120 + index * 45)}
                >
                  <span className="ndt-applications__list-bullet" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
