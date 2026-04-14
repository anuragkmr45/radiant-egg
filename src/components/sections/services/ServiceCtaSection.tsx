import { ButtonLink, PrimaryButton } from "@/components/ui/ButtonLink";
import { PageContainer } from "@/components/layout/PageContainer";
import type { ServiceCtaContent } from "@/types/content";

interface ServiceCtaSectionProps {
  content: ServiceCtaContent;
}

export function ServiceCtaSection({ content }: ServiceCtaSectionProps) {
  return (
    <section className="service-cta">
      <PageContainer className="service-cta__inner" data-marketing-reveal="">
        <h2 className="service-cta__title">{content.title}</h2>
        <p className="service-cta__description">{content.description}</p>
        <div className="service-cta__actions">
          <PrimaryButton className="service-cta__button" href={content.primaryAction.href} size="lg">
            {content.primaryAction.label}
          </PrimaryButton>
          {content.secondaryAction ? (
            <ButtonLink
              className="service-cta__button service-cta__button--light motion-link motion-link--button"
              href={content.secondaryAction.href}
              size="lg"
              variant="ghost"
            >
              {content.secondaryAction.label}
            </ButtonLink>
          ) : null}
        </div>
      </PageContainer>
    </section>
  );
}
