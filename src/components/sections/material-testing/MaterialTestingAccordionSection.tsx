import type { CSSProperties } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { marketingRevealStyle } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { MaterialTestingAccordionSectionContent } from "@/types/content";

interface MaterialTestingAccordionSectionProps {
  content: MaterialTestingAccordionSectionContent;
  tone: "metal" | "concrete";
}

export function MaterialTestingAccordionSection({
  content,
  tone,
}: MaterialTestingAccordionSectionProps) {
  return (
    <section
      className={cn(
        "service-section service-section--page material-testing-accordion-section",
        `material-testing-accordion-section--${tone}`,
      )}
      id={content.anchorId}
    >
      <PageContainer>
        <div className="service-section__header service-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          {content.description ? <p className="service-section__description">{content.description}</p> : null}
        </div>

        <div className="material-topic-grid">
          {content.groups.map((group, index) => (
            <article
              className="material-topic-block"
              data-marketing-reveal=""
              key={group.title}
              style={marketingRevealStyle(index * 65)}
            >
              <div className="material-topic-block__header">
                <h3 className="material-topic-block__title">{group.title}</h3>
                {group.description ? (
                  <p className="material-topic-block__description">{group.description}</p>
                ) : null}
              </div>

              {group.cards?.length ? (
                <div className="material-method-grid">
                  {group.cards.map((card, cardIndex) => (
                    <article
                      className="material-method-card"
                      key={card.title}
                      style={
                        {
                          "--material-card-delay": `${cardIndex * 45}ms`,
                        } as CSSProperties
                      }
                    >
                      <h3 className="material-method-card__title">{card.title}</h3>
                      <p className="material-method-card__description">{card.description}</p>

                      {card.standards?.length ? (
                        <div className="material-method-card__meta">
                          <span className="material-method-card__meta-label">Standards</span>
                          <ul className="material-method-card__pill-list" role="list">
                            {card.standards.map((item) => (
                              <li className="material-method-card__pill" key={item}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {card.applications?.length ? (
                        <div className="material-method-card__meta">
                          <span className="material-method-card__meta-label">Typical Applications</span>
                          <ul className="material-method-card__list" role="list">
                            {card.applications.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}

              {group.lists?.length ? (
                <div className="material-list-groups">
                  {group.lists.map((listGroup, listIndex) => (
                    <article
                      className="material-list-group"
                      key={listGroup.title}
                      style={
                        {
                          "--material-card-delay": `${listIndex * 55}ms`,
                        } as CSSProperties
                      }
                    >
                      <h3 className="material-list-group__title">{listGroup.title}</h3>
                      <ul className="material-list-group__items" role="list">
                        {listGroup.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
