"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

import { ContextualNavLink } from "@/components/navigation/ContextualNavLink";
import { splitNavItemsForServices } from "@/lib/navigation";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import type { ContactDetails, NavItem, SiteCta, SiteHref } from "@/types/site";

const subscribe = () => () => {};

interface MobileNavDrawerProps {
  siteName: string;
  primaryItems: readonly NavItem[];
  serviceItems: readonly NavItem[];
  serviceInsertBeforeHref?: SiteHref;
  cta: SiteCta;
  contact: ContactDetails;
  tone?: "default" | "inverse";
}

export function MobileNavDrawer({
  siteName,
  primaryItems,
  serviceItems,
  serviceInsertBeforeHref,
  cta,
  contact,
  tone = "default",
}: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const titleId = useId();
  const servicesButtonId = useId();
  const servicesPanelId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  const inverse = tone === "inverse";
  const servicesActive = pathname?.startsWith("/services/") ?? false;
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { itemsBeforeServices, itemsAfterServices } = splitNavItemsForServices(
    primaryItems,
    serviceInsertBeforeHref,
  );

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
      return undefined;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setOpen(false);
      setServicesOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else if (wasOpenRef.current) {
      toggleRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  function closeDrawer() {
    setOpen(false);
    setServicesOpen(false);
  }

  const drawerOverlay = (
    <div
      aria-hidden={!open}
      className={open ? "mobile-drawer__overlay mobile-drawer__overlay--open" : "mobile-drawer__overlay"}
    >
      <button
        aria-label="Close navigation menu"
        className="mobile-drawer__scrim"
        onClick={closeDrawer}
        type="button"
      />
      <aside
        aria-labelledby={titleId}
        aria-modal="true"
        className={
          open
            ? inverse
              ? "mobile-drawer__panel mobile-drawer__panel--inverse mobile-drawer__panel--open"
              : "mobile-drawer__panel mobile-drawer__panel--open"
            : inverse
              ? "mobile-drawer__panel mobile-drawer__panel--inverse"
              : "mobile-drawer__panel"
        }
        id={panelId}
        role="dialog"
      >
        <div className="mobile-drawer__header">
          <div>
            <p className="mobile-drawer__eyebrow">Navigation</p>
            <p className="mobile-drawer__title" id={titleId}>
              {siteName}
            </p>
          </div>
          <button
            aria-label="Close navigation menu"
            className={inverse ? "mobile-drawer__close mobile-drawer__close--inverse" : "mobile-drawer__close"}
            onClick={closeDrawer}
            ref={closeRef}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <nav aria-label="Primary mobile">
          {itemsBeforeServices.length > 0 ? (
            <ul className="mobile-drawer__list" role="list">
              {itemsBeforeServices.map((item) => (
                <li key={item.href}>
                  <ContextualNavLink
                    ariaCurrent={pathname === item.href ? "page" : undefined}
                    className={inverse ? "mobile-drawer__link mobile-drawer__link--inverse" : "mobile-drawer__link"}
                    href={item.href}
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </ContextualNavLink>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mobile-drawer__section">
            <button
              aria-controls={servicesPanelId}
              aria-expanded={servicesOpen}
              className={
                inverse
                  ? servicesActive
                    ? "mobile-drawer__section-toggle mobile-drawer__section-toggle--inverse mobile-drawer__section-toggle--active"
                    : "mobile-drawer__section-toggle mobile-drawer__section-toggle--inverse"
                  : servicesActive
                    ? "mobile-drawer__section-toggle mobile-drawer__section-toggle--active"
                    : "mobile-drawer__section-toggle"
              }
              id={servicesButtonId}
              onClick={() => setServicesOpen((value) => !value)}
              type="button"
            >
              <span className="mobile-drawer__section-title">Services</span>
              <ChevronDown
                aria-hidden="true"
                className={
                  servicesOpen
                    ? "mobile-drawer__section-chevron mobile-drawer__section-chevron--open"
                    : "mobile-drawer__section-chevron"
                }
                size={18}
              />
            </button>

            <div
              aria-hidden={!servicesOpen}
              aria-labelledby={servicesButtonId}
              className={
                servicesOpen
                  ? "mobile-drawer__section-panel mobile-drawer__section-panel--open"
                  : "mobile-drawer__section-panel"
              }
              id={servicesPanelId}
              role="region"
            >
              <div className="mobile-drawer__section-body">
                <ul className="mobile-drawer__list mobile-drawer__list--nested" role="list">
                  {serviceItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={inverse ? "mobile-drawer__link mobile-drawer__link--inverse" : "mobile-drawer__link"}
                        href={item.href}
                        onClick={closeDrawer}
                      >
                        <span>{item.label}</span>
                        <small>{item.description ?? "View the service scope."}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {itemsAfterServices.length > 0 ? (
            <ul className="mobile-drawer__list" role="list">
              {itemsAfterServices.map((item) => (
                <li key={item.href}>
                  <ContextualNavLink
                    ariaCurrent={pathname === item.href ? "page" : undefined}
                    className={inverse ? "mobile-drawer__link mobile-drawer__link--inverse" : "mobile-drawer__link"}
                    href={item.href}
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </ContextualNavLink>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>

        <div className="mobile-drawer__footer">
          <PrimaryButton href={cta.href} onClick={closeDrawer}>
            {cta.label}
          </PrimaryButton>
          <div className="mobile-drawer__contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
          </div>
        </div>
      </aside>
    </div>
  );

  return (
    <div className={inverse ? "mobile-drawer mobile-drawer--inverse" : "mobile-drawer"}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={inverse ? "mobile-drawer__toggle mobile-drawer__toggle--inverse" : "mobile-drawer__toggle"}
        onClick={() => {
          setOpen((value) => !value);
          setServicesOpen(false);
        }}
        ref={toggleRef}
        type="button"
      >
        {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>
      {mounted ? createPortal(drawerOverlay, document.body) : null}
    </div>
  );
}
