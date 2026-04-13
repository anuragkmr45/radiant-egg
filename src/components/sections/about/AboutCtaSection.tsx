import { ButtonLink, PrimaryButton } from "@/components/ui/ButtonLink";
import { PageContainer } from "@/components/layout/PageContainer";
import type { AboutPageContent } from "@/types/content";

interface AboutCtaSectionProps {
  content: AboutPageContent["cta"];
}

export function AboutCtaSection({ content }: AboutCtaSectionProps) {
  return (
    <section className="about-cta">
      <PageContainer className="about-cta__inner">
        <h2 className="about-cta__title">{content.title}</h2>
        <p className="about-cta__description">{content.description}</p>
        <div className="about-cta__actions">
          <PrimaryButton className="about-cta__button" href={content.primaryAction.href} size="lg">
            {content.primaryAction.label}
          </PrimaryButton>
          <ButtonLink
            className="about-cta__button about-cta__button--light"
            href={content.secondaryAction.href}
            size="lg"
            variant="ghost"
          >
            {content.secondaryAction.label}
          </ButtonLink>
        </div>
      </PageContainer>
    </section>
  );
}
