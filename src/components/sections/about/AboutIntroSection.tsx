import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { marketingRevealStyle } from "@/lib/motion";
import type { AboutIntroContent } from "@/types/content";

interface AboutIntroSectionProps {
  content: AboutIntroContent;
}

export function AboutIntroSection({ content }: AboutIntroSectionProps) {
  return (
    <section className="about-section about-section--intro">
      <PageContainer className="about-intro">
        <div className="about-intro__copy motion-sequence" data-marketing-reveal="">
          <span className="about-section__eyebrow">{content.eyebrow}</span>
          <h2 className="about-section__title about-section__title--rule">{content.title}</h2>
          <div className="about-intro__body">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div
          className="about-intro__media"
          data-marketing-reveal=""
          style={marketingRevealStyle(80)}
        >
          <div className="about-intro__image-frame">
            <Image
              alt={content.image.alt}
              className="about-intro__image"
              height={900}
              sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
              src={content.image.src}
              width={1200}
            />
          </div>

          <div className="about-intro__credential-bar">
            {content.credentials.map((item, index) => (
              <p className="about-intro__credential" key={`${item.accent}-${index}`}>
                <span className="about-intro__credential-accent">{item.accent}</span>
                <span>{item.label}</span>
              </p>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
