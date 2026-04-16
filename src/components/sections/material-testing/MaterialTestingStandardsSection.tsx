import { PageContainer } from "@/components/layout/PageContainer";
import { marketingRevealStyle } from "@/lib/motion";
import type { MaterialTestingStandardsContent } from "@/types/content";

interface MaterialTestingStandardsSectionProps {
  content: MaterialTestingStandardsContent;
}

export function MaterialTestingStandardsSection({
  content,
}: MaterialTestingStandardsSectionProps) {
  return (
    <section className="service-section service-section--page material-standards">
      <PageContainer>
        <div className="service-section__header service-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="material-standards__grid">
          {content.groups.map((group, index) => (
            <article
              className="material-standards__card"
              data-marketing-reveal=""
              key={group.title}
              style={marketingRevealStyle(index * 60)}
            >
              <h3 className="material-standards__card-title">{group.title}</h3>
              <ul className="material-standards__list" role="list">
                {group.items.map((item) => (
                  <li className="material-standards__pill" key={item}>
                    {item}
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
