import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import type { HomeCtaContent } from "@/types/content";

interface HomeCtaBannerProps {
  content: HomeCtaContent;
}

export function HomeCtaBanner({ content }: HomeCtaBannerProps) {
  return (
    <section className="home-cta">
      <div className="home-cta__shape home-cta__shape--top" />
      <div className="home-cta__shape home-cta__shape--bottom" />
      <PageContainer className="home-cta__inner">
        <h2 className="home-cta__title">
          <span>{content.titleLead}</span>
          <span className="home-cta__title-accent">{content.titleAccent}</span>
        </h2>
        <p className="home-cta__description">{content.description}</p>
        <PrimaryButton className="home-cta__button" href={content.action.href} size="lg">
          {content.action.label}
        </PrimaryButton>
      </PageContainer>
    </section>
  );
}
