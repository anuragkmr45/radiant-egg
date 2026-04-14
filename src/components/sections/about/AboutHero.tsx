import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import type { AboutHeroContent } from "@/types/content";

interface AboutHeroProps {
  content: AboutHeroContent;
}

export function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="about-hero">
      <PageContainer className="about-hero__inner" data-marketing-reveal="">
        <nav aria-label="Breadcrumb" className="about-hero__breadcrumbs">
          <ol className="about-hero__breadcrumb-list" role="list">
            {content.breadcrumbs.map((item, index) => {
              const isLast = index === content.breadcrumbs.length - 1;

              return (
                <li className="about-hero__breadcrumb-item" key={`${item.label}-${index}`}>
                  {item.href && !isLast ? (
                    <Link className="about-hero__breadcrumb-link" href={item.href}>
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                  )}
                  {!isLast ? <ChevronRight aria-hidden="true" size={14} /> : null}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="about-hero__title">{content.title}</h1>
        <p className="about-hero__description">{content.description}</p>
        <div aria-hidden="true" className="about-hero__accent" />
      </PageContainer>
    </section>
  );
}
