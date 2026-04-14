import { PageContainer } from "@/components/layout/PageContainer";
import { marketingRevealStyle } from "@/lib/motion";
import type { AboutPageContent } from "@/types/content";

interface AboutStatsStripProps {
  items: AboutPageContent["stats"];
}

export function AboutStatsStrip({ items }: AboutStatsStripProps) {
  return (
    <section className="about-stats">
      <PageContainer>
        <div className="about-stats__grid">
          {items.map((item, index) => (
            <div
              className="about-stats__item"
              data-marketing-reveal=""
              key={`${item.value}-${item.label}`}
              style={marketingRevealStyle(index * 75)}
            >
              <span className="about-stats__value">{item.value}</span>
              <span className="about-stats__label">{item.label}</span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
