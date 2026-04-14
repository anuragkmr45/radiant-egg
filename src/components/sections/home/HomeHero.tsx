import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton, SecondaryButton } from "@/components/ui/ButtonLink";
import type { HomeHeroContent } from "@/types/content";

interface HomeHeroProps {
  content: HomeHeroContent;
}

export function HomeHero({ content }: HomeHeroProps) {
  return (
    <section className="home-hero" id="home">
      <div className="home-hero__media">
        <Image
          alt={content.backgroundImage.alt}
          className="home-hero__image"
          fill
          priority
          sizes="100vw"
          src={content.backgroundImage.src}
        />
        <div className="home-hero__overlay home-hero__overlay--base" />
        <div className="home-hero__overlay home-hero__overlay--directional" />
      </div>

      <PageContainer className="home-hero__inner">
        <div className="home-hero__content motion-sequence" data-home-reveal="">
          <h1 className="home-hero__title">
            <span>{content.titleLead}</span>
            <span className="home-hero__title-accent">{content.titleAccent}</span>
            <span>{content.titleTail}</span>
          </h1>
          <p className="home-hero__description">{content.description}</p>
          <div className="home-hero__actions">
            <PrimaryButton className="home-hero__primary" href={content.primaryAction.href} size="lg">
              {content.primaryAction.label}
            </PrimaryButton>
            <SecondaryButton className="home-hero__secondary" href={content.secondaryAction.href} size="lg">
              {content.secondaryAction.label}
            </SecondaryButton>
          </div>
        </div>
      </PageContainer>

      <div className="home-hero__fade" />
    </section>
  );
}
