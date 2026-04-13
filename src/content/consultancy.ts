import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const consultancyPage: MarketingPageContent = {
  path: "/services/consultancy",
  eyebrow: "Consultancy Route",
  title: "Consultancy services for assessments, engineering reviews, and design support.",
  description:
    "This service route now uses the shared chrome, navigation patterns, and CTA treatment that the later shared service template will inherit and extend.",
  plannedSections: [
    "Service hero",
    "Solutions section",
    "Design drawings section",
    "Audit and residual-life content",
    "Past projects",
    "Final CTA",
  ],
  notes: [
    ...sharedPhaseZeroNotes,
    "Shared services-page primitives will be extracted in Phase 4 before this route is visually completed in Phase 5.",
  ],
  phase0Checks: sharedPhaseZeroChecks,
  seo: {
    title: "Consultancy Services",
    description:
      "Radiant Engineering consultancy shared-shell scaffold.",
    path: "/services/consultancy",
  },
};
