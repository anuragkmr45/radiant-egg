import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
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
          <BrandLogo className="brand-lockup__logo" priority variant="nav" />
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
