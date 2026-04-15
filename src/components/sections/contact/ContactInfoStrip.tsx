import { Mail, MapPin, Phone } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { marketingRevealStyle } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ContactInfoItem } from "@/types/content";

interface ContactInfoStripProps {
  items: readonly ContactInfoItem[];
}

function ContactInfoIcon({ kind }: { kind: ContactInfoItem["kind"] }) {
  switch (kind) {
    case "address":
      return <MapPin aria-hidden="true" size={20} />;
    case "phone":
      return <Phone aria-hidden="true" size={20} />;
    case "email":
      return <Mail aria-hidden="true" size={20} />;
    default:
      return null;
  }
}

export function ContactInfoStrip({ items }: ContactInfoStripProps) {
  return (
    <section className="contact-strip">
      <PageContainer>
        <div className="contact-strip__grid">
          {items.map((item, index) => {
            const content = item.href ? (
              <a className="motion-link motion-link--text" href={item.href}>
                {item.value}
              </a>
            ) : (
              <span>{item.value}</span>
            );

            return (
              <div
                className={cn(
                  "contact-strip__item",
                  index > 0 ? "contact-strip__item--bordered" : null,
                )}
                data-marketing-reveal=""
                key={`${item.kind}-${item.label}`}
                style={marketingRevealStyle(index * 75)}
              >
                <span className="contact-strip__icon">
                  <ContactInfoIcon kind={item.kind} />
                </span>
                <div className="contact-strip__content">
                  <p className="contact-strip__label">{item.label}</p>
                  <div className={item.kind === "address" ? "contact-strip__value contact-strip__value--address" : "contact-strip__value"}>
                    {content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
