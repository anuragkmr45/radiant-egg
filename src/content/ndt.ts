import type { ServicePageContent } from "@/types/content";

export const ndtPage: ServicePageContent = {
  seo: {
    title: "NDT Services",
    description:
      "Non-destructive testing services for welds, pressure equipment, structures, and critical industrial components.",
    path: "/services/ndt",
  },
  hero: {
    eyebrow: "NDT Services",
    title: "Non-Destructive Testing",
    summary:
      "Precision inspection without compromising component integrity — ensuring safety, compliance, and asset longevity.",
    glowPosition: "right",
  },
  intro: {
    variant: "centered",
    description:
      "Non-Destructive Testing (NDT) allows critical industrial components to be inspected for defects, degradation, and material anomalies — all without causing damage. RECPL's ASNT-certified technicians deploy a comprehensive suite of NDT methods across petrochemical, power, steel, and infrastructure sectors, delivering reliable data that drives informed maintenance and compliance decisions.",
  },
  featureGrid: {
    eyebrow: "Our Capabilities",
    title: "NDT Methods",
    description:
      "Industry-standard techniques executed by certified professionals with calibrated equipment.",
    items: [
      {
        title: "Ultrasonic Testing (UT)",
        description:
          "High-frequency sound waves detect internal flaws, measure wall thickness, and assess weld integrity in pressure equipment and structures.",
        icon: "search",
      },
      {
        title: "Magnetic Particle Inspection (MPI)",
        description:
          "Surface and near-surface defects in ferromagnetic materials are revealed using magnetic fields and fine iron particles.",
        icon: "award",
      },
      {
        title: "Dye Penetrant Testing (DPT)",
        description:
          "A cost-effective method for detecting surface-breaking cracks and porosity on non-porous materials.",
        icon: "droplets",
      },
      {
        title: "Eddy Current Testing (ECT)",
        description:
          "Electromagnetic induction identifies surface and sub-surface flaws in conductive materials including exchanger tubes.",
        icon: "bolt",
      },
      {
        title: "Hardness Testing",
        description:
          "On-site hardness measurements verify material properties, heat-treatment quality, and service degradation of critical components.",
        icon: "shield",
      },
      {
        title: "Universal Testing Machine (UTM)",
        description:
          "Tensile, compression, and bend tests determine mechanical properties for material qualification and failure analysis.",
        icon: "flask",
      },
    ],
  },
  listGrid: {
    anchorId: "industries",
    eyebrow: "Where We Work",
    title: "Applications and Industries",
    items: [
      {
        title: "Industries Served",
        icon: "factory",
        items: [
          "Petrochemical and refineries",
          "Power and energy plants",
          "Steel and cement industries",
          "Shipbuilding and marine",
          "Railways and infrastructure",
          "Pressure vessels and boilers",
        ],
      },
      {
        title: "Equipment and Components",
        icon: "package",
        items: [
          "Pressure vessels and storage tanks",
          "Pipelines and piping systems",
          "Crane girders and structural steelwork",
          "Heat exchangers and condensers",
          "Boiler drums and headers",
          "Weld joints and fabricated assemblies",
        ],
      },
    ],
  },
  cta: {
    title: "Need NDT inspection?",
    description:
      "Schedule calibrated non-destructive testing support for critical components, welds, and industrial assets.",
    primaryAction: {
      label: "Book Inspection",
      href: "/contact",
    },
  },
};
