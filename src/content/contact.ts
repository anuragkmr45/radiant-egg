import { sharedPhaseZeroChecks, sharedPhaseZeroNotes } from "@/content/shared";
import type { MarketingPageContent } from "@/types/content";

export const contactPage: MarketingPageContent = {
  path: "/contact",
  eyebrow: "Contact Route",
  title: "Talk to the team coordinating consultancy, NDT, and third-party inspection.",
  description:
    "The route now shares the refined header, footer, CTA shell, and typography system so the detailed form and map work in Phase 8 can focus on function and fidelity.",
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
      "Radiant Engineering shared-shell contact page scaffold.",
    path: "/contact",
  },
};
