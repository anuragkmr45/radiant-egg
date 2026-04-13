import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { HomeCredentialItem } from "@/types/content";

interface HomeCredentialsStripProps {
  items: readonly HomeCredentialItem[];
}

export function HomeCredentialsStrip({ items }: HomeCredentialsStripProps) {
  const credentials = items ?? [];

  return (
    <section className="home-credentials" aria-label="Professional certifications">
      <PageContainer>
        <div className="home-credentials__panel">
          {credentials.map((item) => (
            <div className="home-credentials__item" key={item.label}>
              <span className="home-credentials__icon">
                <HomeIcon name={item.icon} size={24} />
              </span>
              <span className="home-credentials__label">{item.label}</span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
