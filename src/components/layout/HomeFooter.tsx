import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { siteConfig } from "@/config/site";

export function HomeFooter() {
  const homeChrome = siteConfig.homeChrome;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer--home">
      <PageContainer className="home-footer__inner">
        <div className="home-footer__grid">
          <div className="home-footer__brand">
            <div className="home-footer__lockup">
              <span className="home-footer__mark">RE</span>
              <span className="home-footer__short">{homeChrome.shortName}</span>
            </div>
            <p className="home-footer__description">{homeChrome.footerDescription}</p>
          </div>

          {homeChrome.footerGroups.map((group) => (
            <section className="home-footer__column" key={group.title}>
              <h2 className="home-footer__heading">{group.title}</h2>
              <ul className="home-footer__links" role="list">
                {group.links.map((item) => (
                  <li key={`${group.title}-${item.href}`}>
                    <Link className="home-footer__link" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="home-footer__column">
            <h2 className="home-footer__heading">Contact Us</h2>
            <ul className="home-footer__contact-list" role="list">
              <li className="home-footer__contact-item">
                <Phone aria-hidden="true" size={16} />
                <a href={`tel:${homeChrome.contact.phone.replace(/\s+/g, "")}`}>
                  {homeChrome.contact.phone}
                </a>
              </li>
              <li className="home-footer__contact-item">
                <Mail aria-hidden="true" size={16} />
                <a href={`mailto:${homeChrome.contact.email}`}>{homeChrome.contact.email}</a>
              </li>
              <li className="home-footer__contact-item">
                <MapPin aria-hidden="true" size={16} />
                <span>{homeChrome.contact.address}</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="home-footer__bottom">
          <p>&copy; {currentYear} {homeChrome.legalName}. All rights reserved.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
