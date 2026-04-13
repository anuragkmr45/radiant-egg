import Link from "next/link";
import { Phone } from "lucide-react";

import { PageContainer } from "@/components/layout/PageContainer";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/config/site";

export function HomeHeader() {
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

        <div className="home-header__actions">
          <DesktopNav
            primaryItems={homeChrome.nav}
            serviceItems={siteConfig.serviceNav}
            tone="inverse"
          />

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
            serviceItems={siteConfig.serviceNav}
            siteName={homeChrome.brandName}
            tone="inverse"
          />
        </div>
      </PageContainer>
    </header>
  );
}
