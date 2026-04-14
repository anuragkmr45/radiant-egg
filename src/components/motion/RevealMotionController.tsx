"use client";

import { useEffect } from "react";

interface RevealMotionControllerProps {
  selector: string;
  bodyDatasetKey: "homeMotion" | "marketingMotion";
}

export function RevealMotionController({
  selector,
  bodyDatasetKey,
}: RevealMotionControllerProps) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (nodes.length === 0) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotionQuery.matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));

      return () => {
        nodes.forEach((node) => {
          node.classList.remove("is-visible");
          node.style.removeProperty("--motion-initial-delay");
        });
      };
    }

    document.body.dataset[bodyDatasetKey] = "ready";

    const initiallyVisibleNodes = nodes.filter((node) => {
      return node.getBoundingClientRect().top <= window.innerHeight * 0.92;
    });
    const initiallyVisibleSet = new Set(initiallyVisibleNodes);
    let revealFrameId = 0;
    let revealCommitFrameId = 0;

    revealFrameId = window.requestAnimationFrame(() => {
      revealCommitFrameId = window.requestAnimationFrame(() => {
        initiallyVisibleNodes.forEach((node, index) => {
          node.style.setProperty("--motion-initial-delay", `${Math.min(index, 4) * 55}ms`);
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
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    nodes.forEach((node) => {
      if (!initiallyVisibleSet.has(node)) {
        observer.observe(node);
      }
    });

    return () => {
      window.cancelAnimationFrame(revealFrameId);
      window.cancelAnimationFrame(revealCommitFrameId);
      observer.disconnect();
      delete document.body.dataset[bodyDatasetKey];
      nodes.forEach((node) => {
        node.classList.remove("is-visible");
        node.style.removeProperty("--motion-initial-delay");
      });
    };
  }, [bodyDatasetKey, selector]);

  return null;
}
