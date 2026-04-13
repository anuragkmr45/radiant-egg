import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { ConsultancyExpertiseItem } from "@/types/content";

interface ConsultancyExpertiseStripProps {
  items: readonly ConsultancyExpertiseItem[];
}

export function ConsultancyExpertiseStrip({
  items,
}: ConsultancyExpertiseStripProps) {
  return (
    <section className="consultancy-expertise">
      <PageContainer>
        <ul className="consultancy-expertise__grid" role="list">
          {items.map((item) => (
            <li className="consultancy-expertise__card" key={item.label}>
              <span className="consultancy-expertise__icon">
                <HomeIcon name={item.icon} size={32} />
              </span>
              <p className="consultancy-expertise__label">{item.label}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
