import { Mail, MapPin, Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContextualNavLink } from "@/components/navigation/ContextualNavLink";
import { getSiteConfig } from "@/config/site";
import { revealStyle } from "@/lib/motion";

export function HomeFooter() {
  const siteConfig = getSiteConfig();
  const homeChrome = siteConfig.homeChrome;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer--home">
      <PageContainer className="home-footer__inner">
        <div className="home-footer__grid">
          <div className="home-footer__brand motion-sequence" data-home-reveal="">
            <div className="home-footer__lockup">
              <BrandLogo className="home-footer__logo" variant="footer" />
            </div>
            <p className="home-footer__description">{homeChrome.footerDescription}</p>
          </div>

          {homeChrome.footerGroups.map((group, index) => (
            <section
              className="home-footer__column motion-sequence"
              data-home-reveal=""
              key={group.title}
              style={revealStyle(70 + index * 60)}
            >
              <h2 className="home-footer__heading">{group.title}</h2>
              <ul className="home-footer__links" role="list">
                {group.links.map((item) => (
                  <li key={`${group.title}-${item.href}`}>
                    <ContextualNavLink className="home-footer__link motion-link motion-link--footer" href={item.href}>
                      {item.label}
                    </ContextualNavLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section
            className="home-footer__column motion-sequence"
            data-home-reveal=""
            style={revealStyle(210)}
          >
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

        <div className="home-footer__bottom" data-home-reveal="" style={revealStyle(280)}>
          <p>&copy; {currentYear} {homeChrome.legalName}. All Rights Reserved.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
