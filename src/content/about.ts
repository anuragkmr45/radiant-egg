import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const aboutPage: MarketingPageContent = {
  path: "/about",
  eyebrow: "Phase 3 Target Route",
  title: "About page scaffold is wired into the shared marketing system.",
  description:
    "The about route is prepared with placeholder content, metadata, and the final layout shell so Phase 3 can focus on visual fidelity instead of structure.",
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
      "Phase 0 scaffold for the Radiant Engineering about page.",
    path: "/about",
  },
};
