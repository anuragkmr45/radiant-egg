import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { siteConfig } from "@/config/site";
import type { MarketingPageContent } from "@/types/content";

interface PlaceholderPageProps {
  content: MarketingPageContent;
}

export function PlaceholderPage({ content }: PlaceholderPageProps) {
  const plannedSections = content.plannedSections ?? [];
  const notes = content.notes ?? [];
  const phase0Checks = content.phase0Checks ?? [];

  return (
    <>
      <section className="hero-shell">
        <PageContainer className="hero-shell__inner">
          <div className="surface-card surface-card--hero">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 className="display-title">{content.title}</h1>
            <p className="lead">{content.description}</p>
            <div className="meta-row">
              <span className="status-pill">Phase 0 live</span>
              <span>{content.path}</span>
              <span>App Router + src/ structure</span>
            </div>
          </div>

          <aside className="surface-card">
            <p className="surface-card__title">What this route has now</p>
            <p className="surface-card__body">
              Shared shell wiring, safe metadata, token-driven spacing, and placeholder
              content modules are ready. Final visuals remain scoped to later phases.
            </p>
            <ul className="bullet-list">
              {phase0Checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </aside>
        </PageContainer>
      </section>

      <section className="page-section">
        <PageContainer className="surface-grid">
          <article className="surface-card">
            <h2 className="surface-card__title">Planned sections</h2>
            <p className="surface-card__body">
              These route-specific sections are defined now so later phases can focus
              on matching the uploaded references.
            </p>
            <ul className="bullet-list">
              {plannedSections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card">
            <h2 className="surface-card__title">Phase notes</h2>
            <p className="surface-card__body">
              The current build intentionally favors structural correctness over final
              visual completion.
            </p>
            <ul className="bullet-list">
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        </PageContainer>
      </section>

      <section className="page-section page-section--compact">
        <PageContainer>
          <article className="cta-shell">
            <p className="eyebrow">Default CTA Contract</p>
            <h2>Shared CTA wiring is now stable across the planned route set.</h2>
            <p>
              Later phases can swap in the final copy and layout without rebuilding the
              shell, navigation, footer, or metadata contracts.
            </p>
            <Link className="button-link button-link--primary" href={siteConfig.defaultCta.href}>
              {siteConfig.defaultCta.label}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </article>
        </PageContainer>
      </section>
    </>
  );
}
