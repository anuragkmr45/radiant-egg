import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { MarketingTextHeroParallaxController } from "@/components/sections/shared/MarketingTextHeroParallaxController";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils";

export interface MarketingTextHeroBreadcrumb {
  label: string;
  href?: string;
}

interface MarketingTextHeroAction {
  label: string;
  href: string;
}

interface MarketingTextHeroProps {
  breadcrumbs: readonly MarketingTextHeroBreadcrumb[];
  title: string;
  description?: string | undefined;
  eyebrow?: string | undefined;
  summary?: string | undefined;
  primaryAction?: MarketingTextHeroAction | undefined;
  className?: string;
}

export function MarketingTextHero({
  breadcrumbs,
  title,
  description,
  eyebrow,
  summary,
  primaryAction,
  className,
}: MarketingTextHeroProps) {
  return (
    <section className={cn("about-hero", className)} data-marketing-text-hero="">
      <PageContainer className="about-hero__inner">
        <div className="about-hero__content motion-sequence" data-marketing-reveal="">
          {breadcrumbs.length ? (
            <nav aria-label="Breadcrumb" className="about-hero__breadcrumbs">
              <ol className="about-hero__breadcrumb-list" role="list">
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <li className="about-hero__breadcrumb-item" key={`${item.label}-${index}`}>
                      {item.href && !isLast ? (
                        <Link className="about-hero__breadcrumb-link" href={item.href}>
                          {item.label}
                        </Link>
                      ) : (
                        <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                      )}
                      {!isLast ? <ChevronRight aria-hidden="true" size={14} /> : null}
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : null}

          {eyebrow ? <p className="about-hero__eyebrow">{eyebrow}</p> : null}
          <h1 className="about-hero__title">{title}</h1>
          {summary ? <p className="about-hero__summary">{summary}</p> : null}
          {description ? <p className="about-hero__description">{description}</p> : null}
          {primaryAction ? (
            <div className="about-hero__actions">
              <PrimaryButton className="about-hero__action" href={primaryAction.href} size="lg">
                {primaryAction.label}
              </PrimaryButton>
            </div>
          ) : null}
          <div aria-hidden="true" className="about-hero__accent" />
        </div>
      </PageContainer>
      <MarketingTextHeroParallaxController />
    </section>
  );
}
