export const sharedPhaseZeroChecks = [
  "Route exists under src/app and is rendered through the shared marketing shell.",
  "Header placeholder uses the shared 80px baseline and the 1400px container width.",
  "Typography, spacing, radii, shadows, and color decisions come from the shared token layer.",
  "The route is ready for visual implementation in its assigned design phase without rewriting the shell.",
] as const;

export const sharedPhaseZeroNotes = [
  "Phase 0 establishes layout contracts only; final marketing visuals are intentionally deferred.",
  "The uploaded .make exports provide layout baselines and tokens, but no usable embedded image assets.",
  "Tablet and mobile artboards are not separate exports, so later phases will derive responsive layouts from the desktop-first responsive set.",
] as const;
