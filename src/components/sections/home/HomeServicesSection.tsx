import type { CSSProperties } from "react";

import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { HomePageContent } from "@/types/content";

interface HomeServicesSectionProps {
  content: HomePageContent["services"];
}

export function HomeServicesSection({ content }: HomeServicesSectionProps) {
  const services = content.items ?? [];

  return (
    <section className="home-services home-section" id="services">
      <PageContainer>
        <div className="home-section__intro home-section__intro--center" data-home-reveal="">
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-section__title">{content.title}</h2>
          <p className="home-section__body home-section__body--lead">{content.description}</p>
        </div>

        <div className="home-services__grid">
          {services.map((service, index) => (
            <article
              className="home-service-card"
              data-home-reveal=""
              key={service.title}
              style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
            >
              <span className="home-service-card__icon">
                <HomeIcon name={service.icon} size={24} />
              </span>
              <h3 className="home-service-card__title">{service.title}</h3>
              <p className="home-service-card__description">{service.description}</p>
              <Link className="home-service-card__link motion-link motion-link--text" href={service.href}>
                Learn More
              </Link>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
