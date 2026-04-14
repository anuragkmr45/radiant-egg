import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import type { ServiceHeroContent } from "@/types/content";

interface ServiceHeroProps {
  content: ServiceHeroContent;
}

export function ServiceHero({ content }: ServiceHeroProps) {
  const heroClassName = content.backgroundImage
    ? "service-hero service-hero--image"
    : content.glowPosition === "left"
      ? "service-hero service-hero--glow-left"
      : "service-hero service-hero--glow-right";

  return (
    <section className={heroClassName}>
      {content.backgroundImage ? (
        <div className="service-hero__media">
          <Image
            alt={content.backgroundImage.alt}
            className="service-hero__image"
            fill
            priority
            sizes="100vw"
            src={content.backgroundImage.src}
          />
          <div className="service-hero__overlay service-hero__overlay--image" />
        </div>
      ) : (
        <div className="service-hero__overlay service-hero__overlay--glow" />
      )}

      <PageContainer className="service-hero__inner motion-sequence" data-marketing-reveal="">
        <span className="service-hero__eyebrow">{content.eyebrow}</span>
        <h1 className="service-hero__title">{content.title}</h1>
        <p className="service-hero__summary">{content.summary}</p>
        {content.description ? <p className="service-hero__description">{content.description}</p> : null}
        {content.primaryAction ? (
          <PrimaryButton className="service-hero__action" href={content.primaryAction.href} size="lg">
            {content.primaryAction.label}
          </PrimaryButton>
        ) : null}
      </PageContainer>
    </section>
  );
}
