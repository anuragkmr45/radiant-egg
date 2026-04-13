import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { siteConfig } from "@/config/site";
import { themeTokens } from "@/theme/tokens";

export function SiteHeader() {
  return (
    <header
      className="site-header"
      style={{ minHeight: themeTokens.sizes.headerHeight }}
    >
      <PageContainer className="site-header__inner">
        <div className="site-brand">
          <Link
            aria-label={`${siteConfig.name} home`}
            className="site-brand__mark"
            href="/"
          >
            R
          </Link>
          <div className="site-brand__content">
            <Link className="site-brand__name" href="/">
              {siteConfig.name}
            </Link>
            <p className="site-brand__tagline">
              Engineering, inspection, and quality systems placeholder shell
            </p>
          </div>
        </div>

        <nav aria-label="Primary">
          <ul className="site-nav" role="list">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link className="site-nav__link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="button-link button-link--primary" href={siteConfig.defaultCta.href}>
          {siteConfig.defaultCta.label}
        </Link>
      </PageContainer>
    </header>
  );
}
