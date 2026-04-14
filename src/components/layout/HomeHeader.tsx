import Link from "next/link";
import { Phone } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import { getSiteConfig } from "@/config/site";

export function HomeHeader() {
  const siteConfig = getSiteConfig();
  const homeChrome = siteConfig.homeChrome;

  return (
    <header className="site-header site-header--home">
      <PageContainer className="home-header__inner">
        <Link aria-label={`${homeChrome.brandName} home`} className="home-brand" href="/">
          <span className="home-brand__mark">RE</span>
          <span className="home-brand__text">
            <span className="home-brand__name">{homeChrome.brandName}</span>
            <span className="home-brand__tagline">{homeChrome.tagline}</span>
          </span>
        </Link>

        <div className="home-header__nav-slot">
          <DesktopNav
            primaryItems={homeChrome.nav}
            serviceInsertBeforeHref="/#industries"
            serviceItems={siteConfig.serviceNav}
            tone="inverse"
          />
        </div>

        <div className="home-header__actions">
          <a className="home-header__phone" href={`tel:${homeChrome.phoneLabel.replace(/\s+/g, "")}`}>
            <Phone aria-hidden="true" size={16} />
            <span>{homeChrome.phoneLabel}</span>
          </a>

          <PrimaryButton className="home-header__cta" href={homeChrome.quoteCta.href}>
            {homeChrome.quoteCta.label}
          </PrimaryButton>

          <MobileNavDrawer
            contact={homeChrome.contact}
            cta={homeChrome.quoteCta}
            primaryItems={homeChrome.nav}
            serviceInsertBeforeHref="/#industries"
            serviceItems={siteConfig.serviceNav}
            siteName={homeChrome.brandName}
            tone="inverse"
          />
        </div>
      </PageContainer>
    </header>
  );
}
