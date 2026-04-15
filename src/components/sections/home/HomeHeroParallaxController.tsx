"use client";

import { useEffect } from "react";

const TABLET_BREAKPOINT = 768;
const RAIL_BREAKPOINT = 1024;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HomeHeroParallaxController() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-home-hero]");

    if (!hero) {
      return undefined;
    }

    const heroElement = hero;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let ticking = false;

    function reset() {
      heroElement.style.setProperty("--home-hero-image-offset", "0px");
      heroElement.style.setProperty("--home-hero-content-offset", "0px");
      heroElement.style.setProperty("--home-hero-rail-offset", "0px");
      heroElement.style.setProperty("--home-hero-content-opacity", "1");
    }

    function getConfig() {
      if (reducedMotionQuery.matches) {
        return null;
      }

      if (window.innerWidth < TABLET_BREAKPOINT) {
        return null;
      }

      if (window.innerWidth < RAIL_BREAKPOINT) {
        return {
          imageMax: 64,
          contentMax: -18,
          railMax: 0,
          opacityMin: 0.94,
          progressSpan: 0.82,
        };
      }

      if (window.innerWidth < 1280) {
        return {
          imageMax: 64,
          contentMax: -18,
          railMax: -8,
          opacityMin: 0.94,
          progressSpan: 0.74,
        };
      }

      return {
        imageMax: 120,
        contentMax: -34,
        railMax: -14,
        opacityMin: 0.9,
        progressSpan: 0.72,
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
      const railOffset = config.railMax * progress;
      const contentOpacity = 1 - (1 - config.opacityMin) * progress;

      heroElement.style.setProperty("--home-hero-image-offset", `${imageOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--home-hero-content-offset", `${contentOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--home-hero-rail-offset", `${railOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--home-hero-content-opacity", contentOpacity.toFixed(3));
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
