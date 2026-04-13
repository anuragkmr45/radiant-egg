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
  const panelId = useId();
  const inverse = tone === "inverse";

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      className="services-dropdown"
      onBlur={() => {
        requestAnimationFrame(() => {
          if (!rootRef.current?.contains(document.activeElement)) {
            setOpen(false);
          }
        });
      }}
      onFocusCapture={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="true"
        className={
          inverse
            ? "desktop-nav__link desktop-nav__link--button desktop-nav__link--inverse"
            : "desktop-nav__link desktop-nav__link--button"
        }
        onClick={() => setOpen((value) => !value)}
        type="button"
        {...(active ? { "aria-current": "page" as const } : {})}
      >
        <span>Services</span>
        <ChevronDown
          aria-hidden="true"
          className={open ? "services-dropdown__icon services-dropdown__icon--open" : "services-dropdown__icon"}
          size={16}
        />
      </button>

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
            <Link
              aria-current={currentPath === item.href ? "page" : undefined}
              className="services-dropdown__item"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              <span className="services-dropdown__title">{item.label}</span>
              <span className="services-dropdown__description">
                {item.description ?? "View the service scope."}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
