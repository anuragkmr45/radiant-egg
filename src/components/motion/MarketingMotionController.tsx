"use client";

import { RevealMotionController } from "@/components/motion/RevealMotionController";

export function MarketingMotionController() {
  return (
    <RevealMotionController
      bodyDatasetKey="marketingMotion"
      selector="[data-marketing-reveal]"
    />
  );
}
