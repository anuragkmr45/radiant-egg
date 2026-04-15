import Link from "next/link";

import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";
import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import { getSiteConfig } from "@/config/site";
import { themeTokens } from "@/theme/tokens";

export function SiteHeader() {
  const siteConfig = getSiteConfig();

  return (
    <header
      className="site-header"
      style={{ minHeight: themeTokens.sizes.headerHeight }}
    >
      <PageContainer className="site-header__inner">
        <Link aria-label={`${siteConfig.name} home`} className="brand-lockup" href="/">
          <span className="brand-lockup__mark">RE</span>
          <span className="brand-lockup__text">
            <span className="brand-lockup__name">{siteConfig.name}</span>
            <span className="brand-lockup__tagline">{siteConfig.tagline}</span>
          </span>
        </Link>

        <div className="site-header__actions">
          <DesktopNav
            primaryItems={siteConfig.primaryNav}
            serviceInsertBeforeHref="/supply"
            serviceItems={siteConfig.serviceNav}
          />

          <PrimaryButton className="site-header__cta" href={siteConfig.defaultCta.href}>
            {siteConfig.defaultCta.label}
          </PrimaryButton>

          <MobileNavDrawer
            contact={siteConfig.contact}
            cta={siteConfig.defaultCta}
            primaryItems={siteConfig.primaryNav}
            serviceInsertBeforeHref="/supply"
            siteName={siteConfig.name}
            serviceItems={siteConfig.serviceNav}
          />
        </div>
      </PageContainer>
    </header>
  );
}
