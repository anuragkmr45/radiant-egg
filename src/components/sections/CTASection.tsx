import { ArrowRight } from "lucide-react";

import { BadgePill } from "@/components/ui/BadgePill";
import { PrimaryButton, SecondaryButton } from "@/components/ui/ButtonLink";
import type { SitePath } from "@/types/site";

interface CTASectionProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: {
    label: string;
    href: SitePath;
  };
  secondaryAction?: {
    label: string;
    href: SitePath;
  };
}

export function CTASection({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-section__body">
        <BadgePill tone="dark">{eyebrow}</BadgePill>
        <h2 className="cta-section__title">{title}</h2>
        <p className="cta-section__description">{description}</p>
      </div>
      <div className="cta-section__actions">
        <PrimaryButton href={primaryAction.href} iconEnd={<ArrowRight size={16} />}>
          {primaryAction.label}
        </PrimaryButton>
        {secondaryAction ? (
          <SecondaryButton href={secondaryAction.href}>
            {secondaryAction.label}
          </SecondaryButton>
        ) : null}
      </div>
    </section>
  );
}
