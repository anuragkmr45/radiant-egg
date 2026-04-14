import type { NavItem, SiteHref } from "@/types/site";

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

export function splitNavItemsForServices(
  primaryItems: readonly NavItem[],
  serviceInsertBeforeHref?: SiteHref,
) {
  if (!serviceInsertBeforeHref) {
    return {
      itemsBeforeServices: primaryItems,
      itemsAfterServices: [] as readonly NavItem[],
    };
  }

  const insertionIndex = primaryItems.findIndex((item) => item.href === serviceInsertBeforeHref);

  if (insertionIndex < 0) {
    return {
      itemsBeforeServices: primaryItems,
      itemsAfterServices: [] as readonly NavItem[],
    };
  }

  return {
    itemsBeforeServices: primaryItems.slice(0, insertionIndex),
    itemsAfterServices: primaryItems.slice(insertionIndex),
  };
}
