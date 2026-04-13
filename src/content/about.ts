import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const aboutPage: MarketingPageContent = {
  path: "/about",
  eyebrow: "About Route",
  title: "A focused team built around inspection discipline and field reliability.",
  description:
    "The about route now inherits the final shared chrome so the detailed story, strengths grid, team cards, and gallery sections can be built without shell changes in Phase 3.",
  plannedSections: [
    "Inner hero",
    "Who we are",
    "Strengths grid",
    "Leadership and team cards",
    "Gallery or work section",
    "Final CTA",
  ],
  notes: sharedPhaseZeroNotes,
  phase0Checks: sharedPhaseZeroChecks,
  seo: {
    title: "About",
    description:
      "Radiant Engineering shared-shell about page scaffold.",
    path: "/about",
  },
};
