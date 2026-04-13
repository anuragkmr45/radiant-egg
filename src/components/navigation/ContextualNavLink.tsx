"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEventHandler, ReactNode } from "react";

import { resolveContextualHref } from "@/lib/navigation";
import type { SiteHref } from "@/types/site";

interface ContextualNavLinkProps {
  href: SiteHref;
  children: ReactNode;
  className?: string | undefined;
  ariaCurrent?: "page" | undefined;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export function ContextualNavLink({
  href,
  children,
  className,
  ariaCurrent,
  onClick,
}: ContextualNavLinkProps) {
  const pathname = usePathname();
  const resolvedHref = resolveContextualHref(href, pathname);

  return (
    <Link
      {...(ariaCurrent ? { "aria-current": ariaCurrent } : {})}
      {...(className ? { className } : {})}
      {...(onClick ? { onClick } : {})}
      href={resolvedHref}
    >
      {children}
    </Link>
  );
}
