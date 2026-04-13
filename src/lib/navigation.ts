import type { SiteHref } from "@/types/site";

const servicesPathPattern = /^\/services\/(?:consultancy|ndt|tpi)$/;

export function resolveContextualHref(href: SiteHref, pathname?: string | null): string {
  if (href !== "/#industries") {
    return href;
  }

  if (!pathname || !servicesPathPattern.test(pathname)) {
    return href;
  }

  return `${pathname}#industries`;
}
