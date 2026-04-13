"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { ContextualNavLink } from "@/components/navigation/ContextualNavLink";
import { PrimaryButton } from "@/components/ui/ButtonLink";
import type { ContactDetails, NavItem, SiteCta } from "@/types/site";

interface MobileNavDrawerProps {
  siteName: string;
  primaryItems: readonly NavItem[];
  serviceItems: readonly NavItem[];
  cta: SiteCta;
  contact: ContactDetails;
  tone?: "default" | "inverse";
}

export function MobileNavDrawer({
  siteName,
  primaryItems,
  serviceItems,
  cta,
  contact,
  tone = "default",
}: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const titleId = useId();
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  const inverse = tone === "inverse";

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else if (wasOpenRef.current) {
      toggleRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open]);

  return (
    <div className={inverse ? "mobile-drawer mobile-drawer--inverse" : "mobile-drawer"}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={inverse ? "mobile-drawer__toggle mobile-drawer__toggle--inverse" : "mobile-drawer__toggle"}
        onClick={() => setOpen((value) => !value)}
        ref={toggleRef}
        type="button"
      >
        {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>

      <div className={open ? "mobile-drawer__overlay mobile-drawer__overlay--open" : "mobile-drawer__overlay"}>
        <button
          aria-label="Close navigation menu"
          className="mobile-drawer__scrim"
          onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              ref={closeRef}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>

          <nav aria-label="Primary mobile">
            <ul className="mobile-drawer__list" role="list">
              {primaryItems.map((item) => (
                <li key={item.href}>
                  <ContextualNavLink
                    ariaCurrent={pathname === item.href ? "page" : undefined}
                    className={inverse ? "mobile-drawer__link mobile-drawer__link--inverse" : "mobile-drawer__link"}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </ContextualNavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer__section">
            <p className="mobile-drawer__section-title">Services</p>
            <ul className="mobile-drawer__list" role="list">
              {serviceItems.map((item) => (
                <li key={item.href}>
                  <Link
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={inverse ? "mobile-drawer__link mobile-drawer__link--inverse" : "mobile-drawer__link"}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    <small>{item.description ?? "View the service scope."}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mobile-drawer__footer">
            <PrimaryButton href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </PrimaryButton>
            <div className="mobile-drawer__contact">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
