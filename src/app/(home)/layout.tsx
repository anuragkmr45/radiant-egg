import type { ReactNode } from "react";

import { HomeFooter } from "@/components/layout/HomeFooter";
import { HomeHeader } from "@/components/layout/HomeHeader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSiteConfig } from "@/config/site";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-shell">
        <HomeHeader />
        <main className="site-main" id="main-content">
          {children}
        </main>
        <HomeFooter />
        <WhatsAppFloat config={siteConfig.whatsApp} />
      </div>
    </>
  );
}
