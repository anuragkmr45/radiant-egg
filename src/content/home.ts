import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const homePage: MarketingPageContent = {
  path: "/",
  eyebrow: "Home Route",
  title: "Independent engineering assurance for complex industrial programs.",
  description:
    "The homepage now sits inside the shared brand shell and is ready for the route-specific hero, service, logo, and CTA sections that follow in Phase 2.",
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
      "Radiant Engineering shared-shell homepage scaffold in the Next.js App Router rebuild.",
    path: "/",
  },
};
