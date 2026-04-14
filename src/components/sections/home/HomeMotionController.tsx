"use client";

import { useEffect } from "react";

export function HomeMotionController() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-home-reveal]"));

    if (nodes.length === 0) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    document.body.dataset.homeMotion = "ready";
    const initiallyVisibleNodes = nodes.filter((node) => {
      return node.getBoundingClientRect().top <= window.innerHeight * 0.92;
    });
    let revealFrameId = 0;
    let revealCommitFrameId = 0;

    revealFrameId = window.requestAnimationFrame(() => {
      revealCommitFrameId = window.requestAnimationFrame(() => {
        initiallyVisibleNodes.forEach((node, index) => {
          node.style.setProperty("--reveal-initial-delay", `${Math.min(index, 4) * 55}ms`);
          node.classList.add("is-visible");
        });
      });
    });

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
      if (!initiallyVisibleNodes.includes(node)) {
        observer.observe(node);
      }
    });

    return () => {
      window.cancelAnimationFrame(revealFrameId);
      window.cancelAnimationFrame(revealCommitFrameId);
      observer.disconnect();
      delete document.body.dataset.homeMotion;
      nodes.forEach((node) => {
        node.classList.remove("is-visible");
        node.style.removeProperty("--reveal-initial-delay");
      });
    };
  }, []);

  return null;
}
