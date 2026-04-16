"use client";

import { useEffect } from "react";

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function MarketingTextHeroParallaxController() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-marketing-text-hero]");

    if (!hero) {
      return undefined;
    }

    const heroElement = hero;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let ticking = false;

    function reset() {
      heroElement.style.setProperty("--about-hero-pattern-offset", "0px");
      heroElement.style.setProperty("--about-hero-glow-offset", "0px");
      heroElement.style.setProperty("--about-hero-content-offset", "0px");
      heroElement.style.setProperty("--about-hero-content-opacity", "1");
      heroElement.style.setProperty("--about-hero-accent-offset", "0px");
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
          patternMax: 22,
          glowMax: 12,
          contentMax: -8,
          accentMax: -4,
          opacityMin: 0.97,
          progressSpan: 0.92,
        };
      }

      if (window.innerWidth < 1280) {
        return {
          patternMax: 38,
          glowMax: 20,
          contentMax: -12,
          accentMax: -6,
          opacityMin: 0.96,
          progressSpan: 0.84,
        };
      }

      return {
        patternMax: 52,
        glowMax: 28,
        contentMax: -16,
        accentMax: -8,
        opacityMin: 0.95,
        progressSpan: 0.78,
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
      const patternOffset = config.patternMax * progress;
      const glowOffset = config.glowMax * progress;
      const contentOffset = config.contentMax * progress;
      const accentOffset = config.accentMax * progress;
      const contentOpacity = 1 - (1 - config.opacityMin) * progress;

      heroElement.style.setProperty("--about-hero-pattern-offset", `${patternOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--about-hero-glow-offset", `${glowOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--about-hero-content-offset", `${contentOffset.toFixed(2)}px`);
      heroElement.style.setProperty("--about-hero-content-opacity", contentOpacity.toFixed(3));
      heroElement.style.setProperty("--about-hero-accent-offset", `${accentOffset.toFixed(2)}px`);
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
