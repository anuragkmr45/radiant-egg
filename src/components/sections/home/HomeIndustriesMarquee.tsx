"use client";

import { useEffect, useRef } from "react";

import { HomeIcon } from "@/components/sections/home/HomeIcon";
import type { HomePageContent } from "@/types/content";

interface HomeIndustriesMarqueeProps {
  items: HomePageContent["industries"]["items"];
}

export function HomeIndustriesMarquee({ items }: HomeIndustriesMarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const group = groupRef.current;

    if (!track || !group) {
      return undefined;
    }

    const trackElement = track;
    const groupElement = group;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldPauseForReducedMotion = reducedMotionQuery.matches && window.innerWidth > 767;

    if (shouldPauseForReducedMotion) {
      trackElement.style.removeProperty("transform");
      return undefined;
    }

    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let loopWidth = 0;
    let offset = 0;
    let boost = 0;
    let boostTarget = 0;
    let lastTimestamp = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let settleTimeoutId = 0;
    let measureFrameId = 0;
    let measureCommitFrameId = 0;

    function updateLoopWidth() {
      loopWidth = Math.max(groupElement.scrollWidth, groupElement.getBoundingClientRect().width);

      if (loopWidth > 0) {
        offset %= loopWidth;
      }
    }

    function getBaseSpeed() {
      if (window.innerWidth <= 767) {
        return 36;
      }

      if (window.innerWidth <= 1023) {
        return 33;
      }

      return 30;
    }

    function getMaxBoost() {
      return window.innerWidth <= 767 ? 140 : 118;
    }

    function scheduleLoopWidthUpdate() {
      window.cancelAnimationFrame(measureFrameId);
      window.cancelAnimationFrame(measureCommitFrameId);
      window.clearTimeout(settleTimeoutId);

      updateLoopWidth();
      measureFrameId = window.requestAnimationFrame(() => {
        measureCommitFrameId = window.requestAnimationFrame(updateLoopWidth);
      });
      settleTimeoutId = window.setTimeout(updateLoopWidth, 180);
    }

    function handleScroll() {
      const currentTime = performance.now();
      const deltaTime = Math.max(currentTime - lastScrollTime, 16);
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const scrollVelocity = (deltaY / deltaTime) * 1000;

      boostTarget = Math.min(getMaxBoost(), scrollVelocity * 0.085);
      lastScrollY = window.scrollY;
      lastScrollTime = currentTime;
    }

    function animate(timestamp: number) {
      if (!loopWidth) {
        updateLoopWidth();
      }

      if (!loopWidth) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      const deltaSeconds = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.08) : 1 / 60;
      lastTimestamp = timestamp;
      const boostLerp = 1 - Math.exp(-deltaSeconds * 7.2);

      boost += (boostTarget - boost) * boostLerp;
      boostTarget *= Math.exp(-deltaSeconds * 3.5);
      const speed = getBaseSpeed() + boost;

      offset = (offset + speed * deltaSeconds) % loopWidth;
      trackElement.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frameId = window.requestAnimationFrame(animate);
    }

    scheduleLoopWidthUpdate();
    resizeObserver = new ResizeObserver(scheduleLoopWidthUpdate);
    resizeObserver.observe(groupElement);
    window.addEventListener("resize", scheduleLoopWidthUpdate);
    window.addEventListener("orientationchange", scheduleLoopWidthUpdate);
    window.addEventListener("scroll", handleScroll, { passive: true });

    void document.fonts?.ready?.then(() => {
      scheduleLoopWidthUpdate();
    });

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(measureFrameId);
      window.cancelAnimationFrame(measureCommitFrameId);
      window.clearTimeout(settleTimeoutId);
      window.removeEventListener("resize", scheduleLoopWidthUpdate);
      window.removeEventListener("orientationchange", scheduleLoopWidthUpdate);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver?.disconnect();
      trackElement.style.removeProperty("transform");
    };
  }, []);

  return (
    <div className="home-industries__rail">
      <div className="home-industries__viewport" aria-label="Industries RECPL supports across India">
        <div className="home-industries__track" ref={trackRef}>
          <div className="home-industries__group" ref={groupRef}>
            {items.map((item) => (
              <article className="home-industry-card home-industry-card--marquee" key={item.title}>
                <span className="home-industry-card__icon">
                  <HomeIcon name={item.icon} size={30} />
                </span>
                <h3 className="home-industry-card__title">{item.title}</h3>
              </article>
            ))}
          </div>
          <div aria-hidden="true" className="home-industries__group">
            {items.map((item) => (
              <article className="home-industry-card home-industry-card--marquee" key={`${item.title}-duplicate`}>
                <span className="home-industry-card__icon">
                  <HomeIcon name={item.icon} size={30} />
                </span>
                <h3 className="home-industry-card__title">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
