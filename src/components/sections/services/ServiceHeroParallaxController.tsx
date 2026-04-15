"use client";

import { useEffect } from "react";

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ServiceHeroParallaxController() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-service-hero]");

    if (!hero) {
      return undefined;
    }

    const heroElement = hero;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let ticking = false;

    function reset() {
      heroElement.style.setProperty("--service-hero-image-offset", "0px");
      heroElement.style.setProperty("--service-hero-content-offset", "0px");
      heroElement.style.setProperty("--service-hero-content-opacity", "1");
      heroElement.style.setProperty("--service-hero-overlay-offset", "0px");
    }

    function getConfig() {
      if (reducedMotionQuery.matches) {
        return null;
      }

      if (window.innerWidth < TABLET_BREAKPOINT) {
        return null;
      }

      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        return {
          imageMax: 30,
          contentMax: -8,
          overlayMax: 12,
          opacityMin: 0.975,
          progressSpan: 0.94,
        };
      }

      if (window.innerWidth < 1280) {
        return {
          imageMax: 46,
          contentMax: -12,
          overlayMax: 18,
          opacityMin: 0.965,
          progressSpan: 0.86,
        };
      }

      return {
        imageMax: 60,
        contentMax: -16,
        overlayMax: 24,
        opacityMin: 0.955,
        progressSpan: 0.8,
      };
    }

    function update() {
      ticking = false;
      animationFrameId = 0;

      const config = getConfig();

      if (!config) {
        reset();
        return;
      }

      const rect = heroElement.getBoundingClientRect();
      const progress = rect.height > 0 ? clamp((-rect.top) / (rect.height * config.progressSpan), 0, 1) : 0;
      const imageOffset = config.imageMax * progress;
      const contentOffset = config.contentMax * progress;
      const overlayOffset = config.overlayMax * progress;
      const contentOpacity = 1 - (1 - config.opacityMin) * progress;

      heroElement.style.setProperty("--service-hero-image-offset", `${imageOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--service-hero-content-offset", `${contentOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--service-hero-content-opacity", contentOpacity.toFixed(3));
      heroElement.style.setProperty("--service-hero-overlay-offset", `${overlayOffset.toFixed(2)}px`);
    }

    function scheduleUpdate() {
      if (ticking) {
        return;
      }

      ticking = true;
      animationFrameId = window.requestAnimationFrame(update);
    }

    function handleReducedMotionChange() {
      scheduleUpdate();
    }

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }

      reset();
    };
  }, []);

  return null;
}
