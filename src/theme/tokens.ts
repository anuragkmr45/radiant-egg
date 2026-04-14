export const themeTokens = {
  colors: {
    pageBackground: "var(--color-page-bg)",
    surface: "var(--color-surface)",
    textPrimary: "var(--color-text-primary)",
    textMuted: "var(--color-text-muted)",
    border: "var(--color-border-subtle)",
    brandGold: "var(--color-brand-gold)",
    brandNavy: "var(--color-brand-navy)",
    brandNavyDeep: "var(--color-brand-navy-deep)",
  },
  fonts: {
    body: "var(--font-family-body)",
    heading: "var(--font-family-heading)",
  },
  sizes: {
    containerMax: "var(--size-container-max)",
    headerHeight: "var(--size-header-height)",
  },
  spacing: {
    pageGutter: "var(--space-page-gutter)",
    section: "var(--space-section)",
  },
  radii: {
    card: "var(--radius-card)",
    pill: "var(--radius-pill)",
  },
  shadows: {
    card: "var(--shadow-card)",
    focus: "var(--shadow-focus)",
    panel: "var(--shadow-panel)",
  },
  motion: {
    durationFast: "var(--motion-duration-fast)",
    durationStandard: "var(--motion-duration-standard)",
    durationSlow: "var(--motion-duration-slow)",
    durationReveal: "var(--motion-duration-reveal)",
    easeInteraction: "var(--motion-ease-interaction)",
    easeReveal: "var(--motion-ease-reveal)",
  },
} as const;
