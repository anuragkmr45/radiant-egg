import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const tpiPage: MarketingPageContent = {
  path: "/services/tpi",
  eyebrow: "TPI Route",
  title: "Third-party inspection with process visibility, reporting discipline, and compliance focus.",
  description:
    "The route now shares the chrome and layout contracts that will support the service template in Phase 4 and the detailed TPI workflow build in Phase 7.",
  plannedSections: [
    "Service hero",
    "Inspection scope cards",
    "Process steps",
    "Compliance and codes section",
    "Final CTA",
  ],
  notes: [
    ...sharedPhaseZeroNotes,
    "Phase 4 creates the shared services template before TPI-specific sections are implemented in Phase 7.",
  ],
  phase0Checks: sharedPhaseZeroChecks,
  seo: {
    title: "TPI Services",
    description:
      "Radiant Engineering TPI shared-shell scaffold.",
    path: "/services/tpi",
  },
};
