import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const ndtPage: MarketingPageContent = {
  path: "/services/ndt",
  eyebrow: "Phase 6 Target Route",
  title: "NDT service route is ready for the shared services template.",
  description:
    "The route wiring, metadata, and placeholder structure are in place so the NDT page can be implemented on top of the Phase 4 shared services system.",
  plannedSections: [
    "Service hero",
    "NDT methods cards",
    "Applications and industries",
    "Equipment and components",
    "Final CTA",
  ],
  notes: [
    ...sharedPhaseZeroNotes,
    "Phase 4 creates the common service-page system before NDT-specific sections are layered in during Phase 6.",
  ],
  phase0Checks: sharedPhaseZeroChecks,
  seo: {
    title: "NDT Services",
    description:
      "Phase 0 scaffold for the Radiant Engineering NDT services page.",
    path: "/services/ndt",
  },
};
