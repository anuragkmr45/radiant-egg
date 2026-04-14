import type { CSSProperties } from "react";

export function revealStyle(delayMs = 0): CSSProperties {
  return {
    "--motion-reveal-delay": `${delayMs}ms`,
  } as CSSProperties;
}

export function marketingRevealStyle(delayMs = 0): CSSProperties {
  return {
    "--motion-reveal-delay": `${delayMs}ms`,
    "--marketing-reveal-delay": `${delayMs}ms`,
  } as CSSProperties;
}
