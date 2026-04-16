import { MarketingTextHero } from "@/components/sections/shared/MarketingTextHero";
import type { ContactHeroContent } from "@/types/content";

interface ContactHeroProps {
  content: ContactHeroContent;
}

export function ContactHero({ content }: ContactHeroProps) {
  return (
    <MarketingTextHero
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
      className="about-hero--contact"
      description={content.description}
      eyebrow={content.eyebrow}
      title={content.title}
    />
  );
}
