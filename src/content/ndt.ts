import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const ndtPage: MarketingPageContent = {
  path: "/services/ndt",
  eyebrow: "NDT Route",
  title: "Non-destructive testing programs tailored to critical industrial assets.",
  description:
    "The route now shares the common chrome, responsive navigation, and CTA shell that Phase 4 and Phase 6 will reuse for the detailed NDT experience.",
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
      "Radiant Engineering NDT shared-shell scaffold.",
    path: "/services/ndt",
  },
};
