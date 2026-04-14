import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { ServiceIntroContent } from "@/types/content";

interface ServiceIntroSectionProps {
  content: ServiceIntroContent;
}

export function ServiceIntroSection({ content }: ServiceIntroSectionProps) {
  if (content.variant === "centered") {
    return (
      <section className="service-section service-section--page">
        <PageContainer
          className="service-intro service-intro--centered motion-sequence"
          data-marketing-reveal=""
        >
          <p className="service-intro__description service-intro__description--centered">{content.description}</p>
        </PageContainer>
      </section>
    );
  }

  return (
    <section className="service-section service-section--page">
      <PageContainer className="service-intro service-intro--split">
        <div className="service-intro__copy motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">{content.eyebrow}</span>
          <h2 className="service-section__title">{content.title}</h2>
          <div className="service-intro__body">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {content.highlights?.length ? (
            <ul className="service-intro__highlights" role="list">
              {content.highlights.map((item) => (
                <li className="service-intro__highlight" key={item.label}>
                  <HomeIcon className="service-intro__highlight-icon" name={item.icon} size={16} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div
          className="service-intro__media"
          data-marketing-reveal=""
          style={marketingRevealStyle(90)}
        >
          <Image
            alt={content.image.alt}
            className="service-intro__image"
            height={900}
            sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
            src={content.image.src}
            width={1200}
          />
        </div>
      </PageContainer>
    </section>
  );
}
