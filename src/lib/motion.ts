import type { CSSProperties } from "react";

export function marketingRevealStyle(delayMs = 0): CSSProperties {
  return {
    "--marketing-reveal-delay": `${delayMs}ms`,
  } as CSSProperties;
}
