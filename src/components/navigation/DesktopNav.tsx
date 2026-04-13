"use client";
import { usePathname } from "next/navigation";

import { ContextualNavLink } from "@/components/navigation/ContextualNavLink";
import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/site";

interface DesktopNavProps {
  primaryItems: readonly NavItem[];
  serviceItems: readonly NavItem[];
  tone?: "default" | "inverse";
}

export function DesktopNav({
  primaryItems,
  serviceItems,
  tone = "default",
}: DesktopNavProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const inverse = tone === "inverse";

  return (
    <nav
      aria-label="Primary"
      className={cn("desktop-nav", inverse ? "desktop-nav--inverse" : null)}
    >
      <ul className="desktop-nav__list" role="list">
        {primaryItems.map((item) => (
          <li key={item.href}>
            <ContextualNavLink
              ariaCurrent={currentPath === item.href ? "page" : undefined}
              className={cn(
                "desktop-nav__link",
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
      </ul>
    </nav>
  );
}
