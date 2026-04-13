import type { ServicePageContent } from "@/types/content";

export const consultancyPage: ServicePageContent = {
  seo: {
    title: "Consultancy Services",
    description:
      "Engineering consultancy services for structural design, technical review, and compliance-led industrial asset assessment.",
    path: "/services/consultancy",
  },
  hero: {
    eyebrow: "Consultancy Services",
    title: "Engineering Consultancy Services",
    summary: "Precision Design. Structural Integrity. Compliance Assurance.",
    description:
      "From concept design and structural detailing to safety audits and residual life assessment, RECPL delivers engineering solutions that are practical, code-compliant, and built for long-term performance across industrial plants, infrastructure, and civil structures.",
    backgroundImage: {
      src: "https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb4b2d07d8778381446006944baa264296d4904d3.jpg?generation=1776077631084955&alt=media",
      alt: "Industrial steel plant site for consultancy services",
    },
    primaryAction: {
      label: "Request Consultancy",
      href: "/contact",
    },
  },
  intro: {
    variant: "split",
    eyebrow: "Who We Are",
    title: "Specialised Engineering Solutions",
    paragraphs: [
      "RECPL's consultancy division provides specialised engineering solutions for industries that demand precision, safety, and regulatory compliance. Our work spans structural design, engineering analysis, stability audits, and residual life assessments — all grounded in code-compliant methodology and practical site understanding.",
      "Our PhD-led team combines analytical tools such as Finite Element Analysis with decades of field experience across steel plants, power facilities, and heavy infrastructure. Every project is approached with engineering judgement shaped by real-world conditions — not theoretical assumptions alone.",
      "Whether it's validating an existing structure's load-bearing capacity, designing a new industrial installation, or providing retrofit recommendations for ageing assets, we deliver solutions that prioritise safety, serviceability, and long-term performance.",
    ],
    image: {
      src: "https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F40278119f316b292a7df24a060158228d46bbf66.jpg?generation=1776077631075758&alt=media",
      alt: "Engineers working on structural CAD designs",
    },
    highlights: [
      {
        label: "Code-compliant structural design",
        icon: "shield",
      },
      {
        label: "Detailed engineering and drawing support",
        icon: "building",
      },
      {
        label: "Residual life and safety assessment",
        icon: "award",
      },
      {
        label: "Practical retrofit-oriented recommendations",
        icon: "layers",
      },
    ],
  },
  featureGrid: {
    anchorId: "industries",
    eyebrow: "Core Delivery",
    title: "Shared Consultancy Framework",
    description:
      "The service template establishes the recurring consultancy patterns before the route-specific design-drawing, audit, and project sections are layered in during Phase 5.",
    items: [
      {
        title: "Design and Drawing Support",
        description:
          "Concept development, load path review, and code-aligned engineering drawings for steel, RCC, and heavy industrial systems.",
        icon: "building",
      },
      {
        title: "Structural Audit and Residual Life Review",
        description:
          "Condition assessment, safety evaluation, and performance validation for ageing or modified structures operating in demanding environments.",
        icon: "shield",
      },
      {
        title: "Retrofit and Compliance Recommendations",
        description:
          "Decision-ready engineering guidance covering strengthening options, codal checks, and long-term operational reliability.",
        icon: "scroll",
      },
    ],
  },
  cta: {
    title: "Need expert structural design or audit services?",
    description:
      "Connect with RECPL for engineering consultancy that balances site practicality, code compliance, and long-term asset reliability.",
    primaryAction: {
      label: "Contact Us",
      href: "/contact",
    },
    secondaryAction: {
      label: "Request Quote",
      href: "/contact",
    },
  },
};
