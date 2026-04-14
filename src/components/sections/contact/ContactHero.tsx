import { PageContainer } from "@/components/layout/PageContainer";
import type { ContactHeroContent } from "@/types/content";

interface ContactHeroProps {
  content: ContactHeroContent;
}

export function ContactHero({ content }: ContactHeroProps) {
  return (
    <section className="contact-hero">
      <PageContainer>
        <div className="contact-hero__copy motion-sequence" data-marketing-reveal="">
          <p className="contact-hero__eyebrow">{content.eyebrow}</p>
          <h1 className="contact-hero__title">{content.title}</h1>
          <p className="contact-hero__description">{content.description}</p>
        </div>
      </PageContainer>
    </section>
  );
}
