import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { AboutPageContent } from "@/types/content";

interface AboutPrinciplesSectionProps {
  content: AboutPageContent["principles"];
}

export function AboutPrinciplesSection({ content }: AboutPrinciplesSectionProps) {
  return (
    <section className="about-section">
      <PageContainer>
        <div className="about-principles__grid">
          {content.items.map((item, index) => (
            <article
              className="about-dual-card about-dual-card--principle"
              data-marketing-reveal=""
              key={item.title}
              style={marketingRevealStyle(index * 70)}
              tabIndex={0}
            >
              <div className="about-dual-card__face about-dual-card__face--front">
                <span className="about-dual-card__icon">
                  <HomeIcon name={item.icon} size={32} />
                </span>
                <h3 className="about-dual-card__title">{item.title}</h3>
              </div>
              <div className="about-dual-card__face about-dual-card__face--back">
                {item.values?.length ? (
                  <ul className="about-values__list" role="list">
                    {item.values.map((value) => (
                      <li className="about-values__item" key={value}>
                        <span className="about-values__bullet" aria-hidden="true" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="about-dual-card__description">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
