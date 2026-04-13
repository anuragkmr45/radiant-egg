import type { ServicePageContent } from "@/types/content";

export const tpiPage: ServicePageContent = {
  seo: {
    title: "TPI Services",
    description:
      "Third-party inspection services for statutory compliance, certification, and safe operation of critical industrial assets.",
    path: "/services/tpi",
  },
  hero: {
    eyebrow: "Statutory Compliance",
    title: "Third Party Inspection",
    summary:
      "Authorized inspections by Factory Act Competent Persons — ensuring statutory compliance and operational safety for your critical assets.",
    glowPosition: "left",
  },
  intro: {
    variant: "centered",
    description:
      "Under the Factories Act 1948, all lifting equipment, pressure vessels, and boilers must be periodically inspected and certified by a Competent Person. RECPL's government-approved inspectors carry out thorough examinations, testing, and certification — helping you stay compliant, avoid penalties, and most importantly, prevent workplace accidents.",
  },
  listGrid: {
    anchorId: "industries",
    eyebrow: "Scope of Work",
    title: "What We Inspect",
    items: [
      {
        title: "Lifting Equipment",
        icon: "hardhat",
        items: [
          "EOT and HOT cranes",
          "Chain pulley blocks and hoists",
          "Wire ropes and slings",
          "Lifting tackles and accessories",
          "Goods and passenger lifts",
        ],
      },
      {
        title: "Pressure Vessels",
        icon: "fuel",
        items: [
          "Unfired pressure vessels",
          "Air receivers and compressors",
          "Autoclaves and reactors",
          "Storage tanks",
          "Heat exchangers",
        ],
      },
      {
        title: "Boilers and Fired Equipment",
        icon: "flask",
        items: [
          "Steam boilers (IBR)",
          "Hot water generators",
          "Thermic fluid heaters",
          "Economisers and super-heaters",
          "Boiler mountings and fittings",
        ],
      },
    ],
  },
  process: {
    eyebrow: "How We Work",
    title: "Our Inspection Process",
    steps: [
      {
        stepLabel: "Step 1",
        title: "Planning and Scheduling",
        description:
          "Review documentation, understand scope, and schedule inspections per statutory timelines and client requirements.",
        icon: "briefcase",
      },
      {
        stepLabel: "Step 2",
        title: "On-Site Inspection",
        description:
          "Visual examination, dimensional checks, and condition assessment by our Factory Act Competent Person.",
        icon: "search",
      },
      {
        stepLabel: "Step 3",
        title: "Testing and Evaluation",
        description:
          "NDT, proof tests, load tests, and safety device verification are performed as applicable.",
        icon: "clipboard",
      },
      {
        stepLabel: "Step 4",
        title: "Certification and Reporting",
        description:
          "Issue statutory certificates and inspection reports with clear compliance observations and recommendations.",
        icon: "scroll",
      },
    ],
  },
  standards: {
    eyebrow: "Compliance Framework",
    title: "Codes and Standards",
    description:
      "Every inspection is conducted in accordance with applicable Indian and international codes.",
    items: [
      { code: "IS 3177", description: "Lifting appliances", icon: "scroll" },
      { code: "IS 2825", description: "Pressure vessels", icon: "scroll" },
      { code: "ASME Sec VIII", description: "Boiler and PV code", icon: "scroll", featured: true },
      { code: "IBR 1950", description: "Indian Boiler Regulations", icon: "scroll" },
      { code: "Factories Act", description: "Sections 28, 29, 31", icon: "scroll" },
      { code: "IS 807", description: "Crane design code", icon: "scroll" },
      { code: "OSHA", description: "Safety standards", icon: "scroll" },
      { code: "NBIC", description: "Inspection code", icon: "scroll" },
    ],
  },
  cta: {
    title: "Need statutory inspection?",
    description:
      "From crane load tests to boiler certifications — our Competent Persons ensure full compliance with the Factories Act.",
    primaryAction: {
      label: "Request Inspection",
      href: "/contact",
    },
  },
};
