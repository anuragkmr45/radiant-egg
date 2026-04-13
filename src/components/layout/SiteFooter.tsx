import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { BadgePill } from "@/components/ui/BadgePill";
import { SecondaryButton } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const footerLinks = siteConfig.footerGroups ?? [];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <PageContainer className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__summary">
            <BadgePill tone="dark">{siteConfig.shortName}</BadgePill>
            <h2 className="site-footer__title">{siteConfig.footerHeadline}</h2>
            <p className="site-footer__copy">
              {siteConfig.footerDescription}
            </p>
            <SecondaryButton href={siteConfig.defaultCta.href}>
              {siteConfig.defaultCta.label}
            </SecondaryButton>
          </div>

          <div className="footer-grid">
            {footerLinks.map((group) => (
              <section className="footer-group" key={group.title}>
                <h3 className="footer-group__title">{group.title}</h3>
                <ul className="footer-links" role="list">
                  {group.links?.map((item) => (
                    <li key={item.href}>
                      <Link className="footer-link" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  )) ?? null}
                </ul>
              </section>
            ))}

            <section className="footer-group">
              <h3 className="footer-group__title">Contact</h3>
              <ul className="footer-contact-list" role="list">
                <li className="footer-contact">
                  <Mail aria-hidden="true" />
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </li>
                <li className="footer-contact">
                  <Phone aria-hidden="true" />
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}>
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="footer-contact">
                  <MapPin aria-hidden="true" />
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="footer-contact">
                  <Clock3 aria-hidden="true" />
                  <span>{siteConfig.contact.hours}</span>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </span>
          <span>{siteConfig.tagline}</span>
        </div>
      </PageContainer>
    </footer>
  );
}
