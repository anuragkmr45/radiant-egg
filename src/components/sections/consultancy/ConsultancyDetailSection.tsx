import Image from "next/image";

import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { ConsultancyProjectRail } from "@/components/sections/consultancy/ConsultancyProjectRail";
import { marketingRevealStyle } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ConsultancyDetailSection as ConsultancyDetailSectionContent } from "@/types/content";

interface ConsultancyDetailSectionProps {
  content: ConsultancyDetailSectionContent;
}

export function ConsultancyDetailSection({
  content,
}: ConsultancyDetailSectionProps) {
  const imageFirst = content.imageSide === "left";
  const usesFullWidthCapabilities = content.layout === "splitWithFullWidthCapabilities";
  const mediaClassName = cn(
    "consultancy-detail__media",
    imageFirst
      ? "consultancy-detail__media--first"
      : "consultancy-detail__media--last",
    content.stickyImage && !usesFullWidthCapabilities
      ? "consultancy-detail__media--sticky"
      : null,
    usesFullWidthCapabilities ? "consultancy-detail__media--tall" : null,
  );
  const copyClassName = cn(
    "consultancy-detail__copy",
    "motion-sequence",
    imageFirst
      ? "consultancy-detail__copy--last"
      : "consultancy-detail__copy--first",
    usesFullWidthCapabilities ? "consultancy-detail__copy--top" : null,
  );
  const capabilityGridClassName = cn(
    "consultancy-detail__capabilities",
    usesFullWidthCapabilities
      ? "consultancy-detail__capabilities--full"
      : null,
  );

  return (
    <section
      className={cn(
        "consultancy-detail",
        content.tone === "muted" ? "consultancy-detail--muted" : null,
      )}
      id={content.anchorId}
    >
      <PageContainer>
        <div
          className={cn(
            "consultancy-detail__grid",
            usesFullWidthCapabilities
              ? "consultancy-detail__grid--staged"
              : null,
          )}
        >
          <div
            className={mediaClassName}
            data-marketing-reveal=""
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
            className={copyClassName}
            data-marketing-reveal=""
            style={marketingRevealStyle(90)}
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

            {!usesFullWidthCapabilities ? (
              <>
                <p className="consultancy-detail__scope">{content.scopeLabel}</p>
                <ul className={capabilityGridClassName} role="list">
                  {content.capabilities.map((item, index) => (
                    <li
                      className="consultancy-detail__capability"
                      data-marketing-reveal=""
                      key={item.label}
                      style={marketingRevealStyle(140 + index * 55)}
                    >
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
              </>
            ) : null}
          </div>

          {usesFullWidthCapabilities ? (
            <div
              className="consultancy-detail__full-span motion-sequence"
              data-marketing-reveal=""
              style={marketingRevealStyle(130)}
            >
              <p className="consultancy-detail__scope consultancy-detail__scope--full">
                {content.scopeLabel}
              </p>
              <ul className={capabilityGridClassName} role="list">
                {content.capabilities.map((item, index) => (
                  <li
                    className="consultancy-detail__capability consultancy-detail__capability--compact"
                    data-marketing-reveal=""
                    key={item.label}
                    style={marketingRevealStyle(170 + index * 45)}
                  >
                    <span className="consultancy-detail__capability-icon">
                      <HomeIcon name={item.icon} size={20} />
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {usesFullWidthCapabilities ? (
            <div
              className="consultancy-detail__full-span consultancy-detail__full-span--projects motion-sequence"
              data-marketing-reveal=""
              style={marketingRevealStyle(180)}
            >
              <ConsultancyProjectRail
                projects={content.projects}
                title={content.projectsTitle}
                variant="grid"
              />
            </div>
          ) : null}
        </div>
      </PageContainer>
    </section>
  );
}
