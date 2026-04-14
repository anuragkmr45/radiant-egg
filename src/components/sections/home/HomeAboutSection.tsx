import type { CSSProperties } from "react";

import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import type { HomeAboutContent } from "@/types/content";

interface HomeAboutSectionProps {
  content: HomeAboutContent;
}

export function HomeAboutSection({ content }: HomeAboutSectionProps) {
  const paragraphs = content.paragraphs ?? [];

  return (
    <section className="home-about home-section" id="about">
      <PageContainer className="home-about__grid">
        <div className="home-about__media" data-home-reveal="">
          <Image
            alt={content.image.alt}
            className="home-about__image"
            height={540}
            sizes="(max-width: 1023px) 100vw, 50vw"
            src={content.image.src}
            width={720}
          />
        </div>

        <div
          className="home-about__copy motion-sequence"
          data-home-reveal=""
          style={{ "--reveal-delay": "80ms" } as CSSProperties}
        >
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-section__title">{content.title}</h2>
          {paragraphs.map((paragraph) => (
            <p className="home-section__body" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <PrimaryButton className="home-about__cta" href={content.action.href}>
            {content.action.label}
          </PrimaryButton>
        </div>
      </PageContainer>
    </section>
  );
}
