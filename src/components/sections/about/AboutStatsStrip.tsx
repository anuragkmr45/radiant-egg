import { PageContainer } from "@/components/layout/PageContainer";
import type { AboutPageContent } from "@/types/content";

interface AboutStatsStripProps {
  items: AboutPageContent["stats"];
}

export function AboutStatsStrip({ items }: AboutStatsStripProps) {
  return (
    <section className="about-stats">
      <PageContainer>
        <div className="about-stats__grid">
          {items.map((item) => (
            <div className="about-stats__item" key={`${item.value}-${item.label}`}>
              <span className="about-stats__value">{item.value}</span>
              <span className="about-stats__label">{item.label}</span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
