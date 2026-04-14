"use client";

import { useEffect, useRef } from "react";

import type { HomeLogoItem } from "@/types/content";

interface HomeClientsMarqueeProps {
  items: readonly HomeLogoItem[];
}

export function HomeClientsMarquee({ items }: HomeClientsMarqueeProps) {
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

    if (reducedMotionQuery.matches) {
      trackElement.style.removeProperty("transform");
      return undefined;
    }

    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let loopWidth = 0;
    let offset = 0;
    let boost = 0;
    let lastTimestamp = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();

    function updateLoopWidth() {
      loopWidth = groupElement.scrollWidth;
    }

    function getBaseSpeed() {
      return window.innerWidth <= 767 ? 28 : 34;
    }

    function handleScroll() {
      const currentTime = performance.now();
      const deltaTime = Math.max(currentTime - lastScrollTime, 16);
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const scrollVelocity = (deltaY / deltaTime) * 1000;

      boost = Math.min(200, boost + scrollVelocity * 0.025);
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

      const deltaSeconds = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 1 / 60;
      lastTimestamp = timestamp;
      const speed = getBaseSpeed() + boost;

      offset = (offset + speed * deltaSeconds) % loopWidth;
      trackElement.style.transform = `translate3d(${-offset}px, 0, 0)`;
      boost *= Math.exp(-deltaSeconds * 3.4);
      frameId = window.requestAnimationFrame(animate);
    }

    updateLoopWidth();
    resizeObserver = new ResizeObserver(updateLoopWidth);
    resizeObserver.observe(groupElement);
    window.addEventListener("resize", updateLoopWidth);
    window.addEventListener("scroll", handleScroll, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateLoopWidth);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver?.disconnect();
      trackElement.style.removeProperty("transform");
    };
  }, []);

  return (
    <div className="home-clients__rail" data-home-reveal="">
      <div className="home-clients__viewport" aria-label="Client logos and associations">
        <div className="home-clients__track" ref={trackRef}>
          <div className="home-clients__group" ref={groupRef}>
            {items.map((item) => (
              <div className="home-client-chip" key={item.label}>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="home-clients__group">
            {items.map((item) => (
              <div className="home-client-chip" key={`${item.label}-duplicate`}>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
