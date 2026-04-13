"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ServicesDropdown } from "@/components/navigation/ServicesDropdown";
import type { NavItem } from "@/types/site";

interface DesktopNavProps {
  primaryItems: readonly NavItem[];
  serviceItems: readonly NavItem[];
}

export function DesktopNav({ primaryItems, serviceItems }: DesktopNavProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  return (
    <nav aria-label="Primary" className="desktop-nav">
      <ul className="desktop-nav__list" role="list">
        {primaryItems.map((item) => (
          <li key={item.href}>
            <Link
              aria-current={currentPath === item.href ? "page" : undefined}
              className="desktop-nav__link"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <ServicesDropdown
            active={currentPath.startsWith("/services/")}
            currentPath={currentPath}
            items={serviceItems}
          />
        </li>
      </ul>
    </nav>
  );
}
