"use client";

import { useEffect } from "react";

export function MarketingMotionController() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-marketing-reveal]"));

    if (nodes.length === 0) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));

      return () => {
        nodes.forEach((node) => node.classList.remove("is-visible"));
      };
    }

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top <= window.innerHeight * 0.92) {
        node.classList.add("is-visible");
      }
    });

    document.body.dataset.marketingMotion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    nodes.forEach((node) => {
      if (!node.classList.contains("is-visible")) {
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
      delete document.body.dataset.marketingMotion;
      nodes.forEach((node) => node.classList.remove("is-visible"));
    };
  }, []);

  return null;
}
