"use client";

import { RevealMotionController } from "@/components/motion/RevealMotionController";

export function HomeMotionController() {
  return <RevealMotionController bodyDatasetKey="homeMotion" selector="[data-home-reveal]" />;
}
