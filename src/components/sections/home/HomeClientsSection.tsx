import { PageContainer } from "@/components/layout/PageContainer";
import { HomeClientsMarquee } from "@/components/sections/home/HomeClientsMarquee";
import type { HomePageContent } from "@/types/content";

interface HomeClientsSectionProps {
  content: HomePageContent["clients"];
}

export function HomeClientsSection({ content }: HomeClientsSectionProps) {
  const items = content.items ?? [];

  return (
    <section className="home-clients home-section">
      <PageContainer>
        <div className="home-section__intro home-section__intro--center home-clients__intro motion-sequence" data-home-reveal="">
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-clients__title">{content.title}</h2>
        </div>
        <HomeClientsMarquee items={items} />
      </PageContainer>
    </section>
  );
}
