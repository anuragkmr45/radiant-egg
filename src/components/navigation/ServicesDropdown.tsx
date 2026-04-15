"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { NavItem } from "@/types/site";

interface ServicesDropdownProps {
  items: readonly NavItem[];
  currentPath?: string;
  active?: boolean;
  tone?: "default" | "inverse";
}

export function ServicesDropdown({
  items,
  currentPath = "",
  active = false,
  tone = "default",
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const panelId = useId();
  const inverse = tone === "inverse";

  function cancelClose() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      if (!rootRef.current?.contains(document.activeElement)) {
        setOpen(false);
      }
      closeTimeoutRef.current = null;
    }, 140);
  }

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        cancelClose();
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        cancelClose();
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  function isItemActive(href: NavItem["href"]) {
    return currentPath === href || currentPath === href.split("#")[0];
  }

  return (
    <div
      className="services-dropdown"
      onBlur={() => {
        window.requestAnimationFrame(() => {
          if (!rootRef.current?.contains(document.activeElement)) {
            scheduleClose();
          }
        });
      }}
      onFocusCapture={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={() => {
        scheduleClose();
      }}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="true"
        className={
          inverse
            ? "desktop-nav__link desktop-nav__link--button desktop-nav__link--inverse desktop-nav__link--service"
            : "desktop-nav__link desktop-nav__link--button desktop-nav__link--service"
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            cancelClose();
            setOpen(true);
            return;
          }

          if (event.key === "Escape") {
            cancelClose();
            setOpen(false);
          }
        }}
        onClick={() => {
          cancelClose();
          setOpen(true);
        }}
        type="button"
        {...(active ? { "aria-current": "page" as const } : {})}
      >
        <span className="desktop-nav__trigger-label">Services</span>
        <ChevronDown
          aria-hidden="true"
          className={open ? "services-dropdown__icon services-dropdown__icon--open" : "services-dropdown__icon"}
          size={16}
        />
      </button>

      <div
        aria-hidden="true"
        className={open ? "services-dropdown__bridge services-dropdown__bridge--open" : "services-dropdown__bridge"}
      />

      <div
        className={
          open
            ? inverse
              ? "services-dropdown__panel services-dropdown__panel--inverse services-dropdown__panel--open"
              : "services-dropdown__panel services-dropdown__panel--open"
            : inverse
              ? "services-dropdown__panel services-dropdown__panel--inverse"
              : "services-dropdown__panel"
        }
        id={panelId}
        role="group"
      >
        <div className="services-dropdown__grid">
          {items.map((item) => (
            <div className="services-dropdown__group" key={item.href}>
              <Link
                aria-current={isItemActive(item.href) ? "page" : undefined}
                className="services-dropdown__item"
                href={item.href}
                onClick={() => {
                  cancelClose();
                  setOpen(false);
                }}
              >
                <span className="services-dropdown__title">{item.label}</span>
                <span className="services-dropdown__description">
                  {item.description ?? "View the service scope."}
                </span>
              </Link>

              {item.children?.length ? (
                <div className="services-dropdown__children">
                  {item.children.map((child) => (
                    <Link
                      className="services-dropdown__child motion-link motion-link--text"
                      href={child.href}
                      key={child.href}
                      onClick={() => {
                        cancelClose();
                        setOpen(false);
                      }}
                    >
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
