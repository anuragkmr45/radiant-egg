import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton, buttonClassName } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";
import type { SupplyCatalogueSectionContent } from "@/types/content";

interface SupplyCatalogueSectionProps {
  content: SupplyCatalogueSectionContent;
}

function toTelephoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function SupplyCatalogueSection({ content }: SupplyCatalogueSectionProps) {
  const pdfActionState = content.pdfAction.pdfState;
  const showPdfAction = pdfActionState !== "hidden";
  const pdfStatusLabel = content.pdfAction.statusLabel?.trim() || "Coming Soon";

  return (
    <section className="service-cta supply-catalogue">
      <PageContainer className="service-cta__inner supply-catalogue__inner motion-sequence" data-marketing-reveal="">
        <h2 className="service-cta__title supply-catalogue__title">{content.title}</h2>
        <p className="service-cta__description supply-catalogue__description">{content.description}</p>

        <div className="service-cta__actions supply-catalogue__actions">
          <div className="supply-catalogue__action-item">
            <PrimaryButton className="service-cta__button supply-catalogue__button" href={content.primaryAction.href} size="lg">
              {content.primaryAction.label}
            </PrimaryButton>
          </div>

          {showPdfAction ? (
            <div className="supply-catalogue__action-item">
              {pdfActionState === "available" && content.pdfAction.href ? (
                <a
                  className={buttonClassName(
                    "ghost",
                    "lg",
                    "service-cta__button supply-catalogue__button supply-catalogue__button--download",
                  )}
                  href={content.pdfAction.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{content.pdfAction.label}</span>
                </a>
              ) : (
                <>
                  <span
                    aria-disabled="true"
                    className={buttonClassName(
                      "ghost",
                      "lg",
                      "service-cta__button supply-catalogue__button supply-catalogue__button--disabled",
                    )}
                  >
                    <span>{content.pdfAction.label}</span>
                  </span>
                  <span className="supply-catalogue__status">{pdfStatusLabel}</span>
                </>
              )}
            </div>
          ) : null}

          <div className="supply-catalogue__action-item">
            <a
              className={cn(
                buttonClassName(
                  "secondary",
                  "lg",
                  "service-cta__button supply-catalogue__button supply-catalogue__button--call",
                ),
              )}
              href={toTelephoneHref(content.callAction.phone)}
            >
              <span>{content.callAction.label}</span>
            </a>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
