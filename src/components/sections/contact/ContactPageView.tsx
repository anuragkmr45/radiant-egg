import { MarketingMotionController } from "@/components/motion/MarketingMotionController";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContactDirectContactsSection } from "@/components/sections/contact/ContactDirectContactsSection";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactInfoStrip } from "@/components/sections/contact/ContactInfoStrip";
import { ContactMapCard } from "@/components/sections/contact/ContactMapCard";
import { marketingRevealStyle } from "@/lib/motion";
import type { ContactInfoItem, ContactPageContent } from "@/types/content";

interface ContactPageViewProps {
  content: ContactPageContent;
}

export function ContactPageView({ content }: ContactPageViewProps) {
  const infoStripItems: ContactInfoItem[] = [
    {
      kind: "address",
      label: content.location.addressLabel,
      value: content.location.address,
    },
    ...content.infoStrip.filter((item) => item.kind !== "address"),
  ];

  return (
    <>
      <MarketingMotionController />
      <ContactHero content={content.hero} />
      <ContactInfoStrip items={infoStripItems} />

      <section className="contact-body">
        <PageContainer>
          <div className="contact-body__grid">
            <div className="contact-body__column motion-sequence" data-marketing-reveal="">
              <h2 className="contact-body__title">{content.form.title}</h2>
              <p className="contact-body__description">{content.form.description}</p>
              <ContactForm content={content.form} />
            </div>

            <div
              className="contact-body__column contact-body__column--map motion-sequence"
              data-marketing-reveal=""
              style={marketingRevealStyle(90)}
            >
              <h2 className="contact-body__title">{content.location.title}</h2>
              <p className="contact-body__description">{content.location.description}</p>
              <ContactMapCard content={content.location} />
            </div>
          </div>
        </PageContainer>
      </section>

      <ContactDirectContactsSection content={content.directContacts} />
    </>
  );
}
