import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { BadgePill } from "@/components/ui/BadgePill";
import { CardShell } from "@/components/ui/CardShell";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import { getSiteConfig } from "@/config/site";
import type { MarketingPageContent } from "@/types/content";

interface PlaceholderPageProps {
  content: MarketingPageContent;
}

export function PlaceholderPage({ content }: PlaceholderPageProps) {
  const siteConfig = getSiteConfig();
  const plannedSections = content.plannedSections ?? [];
  const notes = content.notes ?? [];
  const phase0Checks = content.phase0Checks ?? [];

  return (
    <>
      <section className="page-hero">
        <PageContainer className="page-hero__inner">
          <div className="page-hero__copy">
            <SectionHeader
              description={content.description}
              eyebrow={content.eyebrow}
              title={content.title}
            />
            <div className="page-hero__meta">
              <BadgePill tone="outline">Route preview</BadgePill>
              <span>{content.path}</span>
              <span>Responsive shared system</span>
            </div>
          </div>

          <CardShell
            description="This route already uses the shared header, footer, buttons, badges, card shell, and CTA treatment established for the marketing site."
            title="Shared delivery baseline"
          >
            <ul className="bullet-list">
              {phase0Checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </CardShell>
        </PageContainer>
      </section>

      <section className="page-section">
        <PageContainer className="page-grid">
          <CardShell
            description="The route-specific build will replace this lightweight body while preserving the shared chrome and design tokens."
            title="Planned sections"
          >
            <ol className="number-list">
              {plannedSections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ol>
          </CardShell>

          <CardShell
            description="These constraints are carried forward from the uploaded references and the phase plan."
            title="Implementation notes"
          >
            <ul className="bullet-list">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </CardShell>
        </PageContainer>
      </section>

      <section className="page-section page-section--compact">
        <PageContainer>
          <CTASection
            description={siteConfig.defaultCta.description}
            eyebrow="Contact the team"
            primaryAction={{
              href: "/contact",
              label: siteConfig.defaultCta.label,
            }}
            secondaryAction={{ href: "/services/consultancy", label: "Explore services" }}
            title="Talk to the team supporting consultancy, NDT, and third-party inspection scopes."
          />
          <div className="page-section__link-row">
            <PrimaryButton href={siteConfig.defaultCta.href} iconEnd={<ArrowRight size={16} />}>
              Open contact route
            </PrimaryButton>
            <Link className="text-link" href="/about">
              View company profile
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
