"use client";
import { usePathname } from "next/navigation";

import { ContextualNavLink } from "@/components/navigation/ContextualNavLink";
import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import { splitNavItemsForServices } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavItem, SiteHref } from "@/types/site";

interface DesktopNavProps {
  primaryItems: readonly NavItem[];
  serviceItems: readonly NavItem[];
  serviceInsertBeforeHref?: SiteHref;
  tone?: "default" | "inverse";
}

export function DesktopNav({
  primaryItems,
  serviceItems,
  serviceInsertBeforeHref,
  tone = "default",
}: DesktopNavProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const inverse = tone === "inverse";
  const { itemsBeforeServices, itemsAfterServices } = splitNavItemsForServices(
    primaryItems,
    serviceInsertBeforeHref,
  );

  return (
    <nav
      aria-label="Primary"
      className={cn("desktop-nav", inverse ? "desktop-nav--inverse" : null)}
    >
      <ul className="desktop-nav__list" role="list">
        {itemsBeforeServices.map((item) => (
          <li key={item.href}>
            <ContextualNavLink
              ariaCurrent={currentPath === item.href ? "page" : undefined}
              className={cn(
                "desktop-nav__link",
                "motion-link",
                "motion-link--nav",
                inverse ? "desktop-nav__link--inverse" : null,
              )}
              href={item.href}
            >
              {item.label}
            </ContextualNavLink>
          </li>
        ))}
        <li>
          <ServicesDropdown
            active={currentPath.startsWith("/services/")}
            currentPath={currentPath}
            items={serviceItems}
            tone={tone}
          />
        </li>
        {itemsAfterServices.map((item) => (
          <li key={item.href}>
            <ContextualNavLink
              ariaCurrent={currentPath === item.href ? "page" : undefined}
              className={cn(
                "desktop-nav__link",
                "motion-link",
                "motion-link--nav",
                inverse ? "desktop-nav__link--inverse" : null,
              )}
              href={item.href}
            >
              {item.label}
            </ContextualNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
