import { PageContainer } from "@/components/layout/PageContainer";
import { HomeIcon } from "@/components/sections/home/HomeIcon";
import { marketingRevealStyle } from "@/lib/motion";
import type { AboutPageContent } from "@/types/content";

interface AboutLeadershipSectionProps {
  content: AboutPageContent["leadership"];
}

export function AboutLeadershipSection({ content }: AboutLeadershipSectionProps) {
  return (
    <section className="about-section about-section--muted">
      <PageContainer>
        <div className="about-section__header about-section__header--center motion-sequence" data-marketing-reveal="">
          <span className="about-section__eyebrow">{content.eyebrow}</span>
          <h2 className="about-section__title">{content.title}</h2>
        </div>

        <div className="about-team__grid">
          {content.members.map((member, index) => (
            <article
              data-marketing-reveal=""
              className={member.featured ? "about-team-card about-team-card--framed about-team-card--featured" : "about-team-card about-team-card--framed"}
              key={member.name}
              style={marketingRevealStyle(index * 70)}
            >
              <div className={member.featured ? "about-team-card__media about-team-card__media--featured" : "about-team-card__media"}>
                <span className={member.featured ? "about-team-card__avatar about-team-card__avatar--featured" : "about-team-card__avatar"}>
                  <HomeIcon name={member.icon} size={member.featured ? 32 : 24} />
                </span>
              </div>

              <div className="about-team-card__body">
                {member.badge ? <span className="about-team-card__badge">{member.badge}</span> : null}
                <h3 className="about-team-card__name">{member.name}</h3>
                <p className="about-team-card__role">{member.role}</p>
                <p className="about-team-card__description">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
