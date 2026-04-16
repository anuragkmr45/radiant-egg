import Image from "next/image";
import { Download } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { ServiceHeroParallaxController } from "@/components/sections/services/ServiceHeroParallaxController";
import { ButtonLink, PrimaryButton, buttonClassName } from "@/components/ui/ButtonLink";
import type { MaterialTestingHeroContent } from "@/types/content";

interface MaterialTestingHeroProps {
  content: MaterialTestingHeroContent;
}

export function MaterialTestingHero({ content }: MaterialTestingHeroProps) {
  const downloadAction = content.downloadAction;

  return (
    <section className="service-hero service-hero--image material-testing-hero" data-service-hero="">
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

      <PageContainer className="service-hero__inner">
        <div className="service-hero__content material-testing-hero__content motion-sequence" data-marketing-reveal="">
          <span className="service-hero__eyebrow">{content.eyebrow}</span>
          <h1 className="service-hero__title">{content.title}</h1>
          <p className="service-hero__summary">{content.summary}</p>
          <p className="material-testing-hero__tagline">{content.tagline}</p>
          <div className="material-testing-hero__actions">
            <PrimaryButton className="service-hero__action" href={content.primaryAction.href} size="lg">
              {content.primaryAction.label}
            </PrimaryButton>
            {downloadAction?.state === "available" && downloadAction.href ? (
              <ButtonLink
                className="service-hero__action material-testing-hero__download-link"
                href={downloadAction.href}
                iconEnd={<Download size={18} />}
                size="lg"
                variant="ghost"
              >
                {downloadAction.label}
              </ButtonLink>
            ) : null}
            {downloadAction?.state === "comingSoon" ? (
              <span
                className={buttonClassName(
                  "ghost",
                  "lg",
                  "service-hero__action material-testing-hero__download-link material-testing-hero__download-link--disabled",
                )}
              >
                <span>{downloadAction.label}</span>
                <span className="material-testing-hero__download-status">
                  {downloadAction.statusLabel ?? "Coming Soon"}
                </span>
              </span>
            ) : null}
          </div>
        </div>
      </PageContainer>

      <ServiceHeroParallaxController />
    </section>
  );
}
