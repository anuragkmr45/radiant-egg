import { Mail, Phone, UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { marketingRevealStyle } from "@/lib/motion";
import type { ContactDirectContactsContent } from "@/types/content";

interface ContactDirectContactsSectionProps {
  content: ContactDirectContactsContent;
}

export function ContactDirectContactsSection({
  content,
}: ContactDirectContactsSectionProps) {
  return (
    <section className="contact-direct">
      <PageContainer>
        <div className="contact-direct__header motion-sequence" data-marketing-reveal="">
          <h2 className="contact-direct__title">{content.title}</h2>
          <p className="contact-direct__description">{content.description}</p>
        </div>

        <div className="contact-direct__grid">
          {content.people.map((person, index) => (
            <article
              className="contact-direct__card"
              data-marketing-reveal=""
              key={person.email}
              style={marketingRevealStyle(index * 80)}
            >
              <div className="contact-direct__person">
                <span className="contact-direct__person-icon">
                  <UserRound aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="contact-direct__person-name">{person.name}</p>
                  <p className="contact-direct__person-role">{person.role}</p>
                </div>
              </div>

              <div className="contact-direct__links">
                <a className="motion-link motion-link--text" href={`tel:${person.phone.replace(/\s+/g, "")}`}>
                  <Phone aria-hidden="true" size={14} />
                  <span>{person.phone}</span>
                </a>
                <a className="motion-link motion-link--text" href={`mailto:${person.email}`}>
                  <Mail aria-hidden="true" size={14} />
                  <span>{person.email}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
