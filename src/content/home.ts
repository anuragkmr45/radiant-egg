import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const homePage: MarketingPageContent = {
  path: "/",
  eyebrow: "Phase 2 Target Route",
  title: "Home page scaffold is ready for the detailed build.",
  description:
    "This route now carries the shared shell, metadata wiring, and tokenized layout primitives required for the final homepage implementation.",
  plannedSections: [
    "Hero",
    "Certification strip",
    "About intro",
    "Core services grid",
    "Why choose us",
    "Industries grid",
    "Client logos",
    "Final CTA",
  ],
  notes: sharedPhaseZeroNotes,
  phase0Checks: sharedPhaseZeroChecks,
  seo: {
    title: "Home",
    description:
      "Phase 0 scaffold for the Radiant Engineering homepage in the Next.js App Router rebuild.",
    path: "/",
  },
};
