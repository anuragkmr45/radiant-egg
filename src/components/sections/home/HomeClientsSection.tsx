import { PageContainer } from "@/components/layout/PageContainer";
import type { HomePageContent } from "@/types/content";

interface HomeClientsSectionProps {
  content: HomePageContent["clients"];
}

export function HomeClientsSection({ content }: HomeClientsSectionProps) {
  const items = content.items ?? [];

  return (
    <section className="home-clients home-section">
      <PageContainer>
        <div className="home-section__intro home-section__intro--center home-clients__intro">
          <p className="home-section__eyebrow">{content.eyebrow}</p>
          <h2 className="home-clients__title">{content.title}</h2>
        </div>
      </PageContainer>

      <div className="home-clients__rail" aria-label="Client logos and associations">
        <div className="home-clients__track">
          {items.map((item) => (
            <div className="home-client-chip" key={item.label}>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
