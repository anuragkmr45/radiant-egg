import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { ConsultancyProjectRail } from "@/components/sections/consultancy/ConsultancyProjectRail";
import { cn } from "@/lib/utils";
import type { ConsultancyDetailSection as ConsultancyDetailSectionContent } from "@/types/content";

interface ConsultancyDetailSectionProps {
  content: ConsultancyDetailSectionContent;
}

export function ConsultancyDetailSection({
  content,
}: ConsultancyDetailSectionProps) {
  const imageFirst = content.imageSide === "left";

  return (
    <section
      className={cn(
        "consultancy-detail",
        content.tone === "muted" ? "consultancy-detail--muted" : null,
      )}
      id={content.anchorId}
    >
      <PageContainer>
        <div className="consultancy-detail__grid">
          <div
            className={cn(
              "consultancy-detail__media",
              imageFirst
                ? "consultancy-detail__media--first"
                : "consultancy-detail__media--last",
              content.stickyImage ? "consultancy-detail__media--sticky" : null,
            )}
          >
            <Image
              alt={content.image.alt}
              className="consultancy-detail__image"
              height={900}
              sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
              src={content.image.src}
              width={1200}
            />
          </div>

          <div
            className={cn(
              "consultancy-detail__copy",
              imageFirst
                ? "consultancy-detail__copy--last"
                : "consultancy-detail__copy--first",
            )}
          >
            <div className="consultancy-detail__title-row">
              <span className="consultancy-detail__title-icon">
                <HomeIcon name={content.icon} size={20} />
              </span>
              <h2 className="consultancy-detail__title">{content.title}</h2>
            </div>

            <div className="consultancy-detail__body">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="consultancy-detail__scope">{content.scopeLabel}</p>
            <ul className="consultancy-detail__capabilities" role="list">
              {content.capabilities.map((item) => (
                <li className="consultancy-detail__capability" key={item.label}>
                  <span className="consultancy-detail__capability-icon">
                    <HomeIcon name={item.icon} size={20} />
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>

            <ConsultancyProjectRail
              projects={content.projects}
              title={content.projectsTitle}
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
