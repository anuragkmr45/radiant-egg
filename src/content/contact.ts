import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const contactPage: MarketingPageContent = {
  path: "/contact",
  eyebrow: "Phase 8 Target Route",
  title: "Contact route is prepared for the final form and map implementation.",
  description:
    "This placeholder route keeps contact metadata, shell spacing, and the shared CTA contracts in place until the final contact experience is built.",
  plannedSections: [
    "Contact hero",
    "Contact info strip",
    "Enquiry form",
    "Direct contact cards",
    "Lightweight map card",
  ],
  notes: [
    ...sharedPhaseZeroNotes,
    "The heavy exported map markup will be replaced with an accessible, lightweight solution in Phase 8.",
  ],
  phase0Checks: sharedPhaseZeroChecks,
  seo: {
    title: "Contact",
    description:
      "Phase 0 scaffold for the Radiant Engineering contact page.",
    path: "/contact",
  },
};
