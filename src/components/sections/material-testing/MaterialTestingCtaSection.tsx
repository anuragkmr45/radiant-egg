import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { ButtonLink, PrimaryButton } from "@/components/ui/ButtonLink";
import { marketingRevealStyle } from "@/lib/motion";
import type { MaterialTestingRelatedService, ServiceCtaContent } from "@/types/content";

interface MaterialTestingCtaSectionProps {
  cta: ServiceCtaContent;
  relatedServices: readonly MaterialTestingRelatedService[];
}

export function MaterialTestingCtaSection({
  cta,
  relatedServices,
}: MaterialTestingCtaSectionProps) {
  return (
    <section className="material-testing-cta">
      <PageContainer>
        <div className="material-testing-cta__panel motion-sequence" data-marketing-reveal="">
          <span className="service-section__eyebrow">Next Step</span>
          <h2 className="material-testing-cta__title">{cta.title}</h2>
          <p className="material-testing-cta__description">{cta.description}</p>
          <div className="material-testing-cta__actions">
            <PrimaryButton href={cta.primaryAction.href} size="lg">
              {cta.primaryAction.label}
            </PrimaryButton>
            {cta.secondaryAction ? (
              <ButtonLink href={cta.secondaryAction.href} size="lg" variant="ghost">
                {cta.secondaryAction.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <div className="material-testing-related">
          {relatedServices.map((item, index) => (
            <Link
              className="material-testing-related__card"
              data-marketing-reveal=""
              href={item.href}
              key={item.title}
              style={marketingRevealStyle(110 + index * 55)}
            >
              <span className="material-testing-related__icon">
                <HomeIcon name={item.icon} size={22} />
              </span>
              <div className="material-testing-related__copy">
                <h3 className="material-testing-related__title">{item.title}</h3>
                <p className="material-testing-related__description">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
