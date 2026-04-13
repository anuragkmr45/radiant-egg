import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const consultancyPage: MarketingPageContent = {
  path: "/services/consultancy",
  eyebrow: "Phase 5 Target Route",
  title: "Consultancy service route is scaffolded on the shared services path.",
  description:
    "Phase 0 establishes the route, metadata, and shell so the later consultancy build can focus on extracting the final service-specific content blocks.",
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
      "Phase 0 scaffold for the Radiant Engineering consultancy services page.",
    path: "/services/consultancy",
  },
};
