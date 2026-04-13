import type { ReactNode } from "react";

import { HomeFooter } from "@/components/layout/HomeFooter";
import { HomeHeader } from "@/components/layout/HomeHeader";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
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
      </div>
    </>
  );
}
