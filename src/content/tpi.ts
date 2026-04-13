import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const tpiPage: MarketingPageContent = {
  path: "/services/tpi",
  eyebrow: "Phase 7 Target Route",
  title: "TPI service route is prepared for the final inspection workflow UI.",
  description:
    "This placeholder keeps the route thin and type-safe while the shared services template and the TPI-specific sections are completed in later phases.",
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
      "Phase 0 scaffold for the Radiant Engineering TPI services page.",
    path: "/services/tpi",
  },
};
