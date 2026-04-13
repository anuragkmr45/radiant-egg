import type { ConsultancyPageContent } from "@/types/content";

export const consultancyPage: ConsultancyPageContent = {
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
  detailSections: [
    {
      anchorId: "industries",
      title: "Structure Design & Engineering Drawings",
      icon: "building",
      image: {
        src: "https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F40278119f316b292a7df24a060158228d46bbf66.jpg?generation=1776077631075758&alt=media",
        alt: "CAD structural design software",
      },
      imageSide: "left",
      tone: "muted",
      paragraphs: [
        "We provide end-to-end structural design support — from concept development and load path optimisation to detailed engineering drawings ready for fabrication and construction. Our designs account for real-world site conditions, constructability constraints, and serviceability requirements.",
        "Every design undergoes rigorous strength and stability checks in accordance with applicable Indian Standards and international codes, ensuring structural integrity, safety, and long-term performance.",
      ],
      scopeLabel:
        "Scope of design support across industrial, infrastructure, and heavy engineering applications",
      capabilities: [
        { label: "Structural design for steel & RCC", icon: "building" },
        { label: "Detailed engineering drawings", icon: "clipboard" },
        { label: "Design validation & review", icon: "shield" },
        { label: "Conveyor structure design", icon: "train" },
        { label: "Solar mounting structure design", icon: "bolt" },
        { label: "Crane structure design", icon: "hardhat" },
        { label: "Steel derrick design", icon: "layers" },
        { label: "Foundation design & analysis", icon: "package" },
        { label: "Finite Element Analysis (FEA)", icon: "search" },
        { label: "Code-compliant design (IS, ASME, ASTM)", icon: "scroll" },
      ],
      projectsTitle: "Past Projects",
      projects: [
        {
          title: "Conveyor Structure Design",
          client: "AM/NS India",
          description:
            "Strength assessment for additional solar panel load on existing conveyor system.",
          icon: "train",
        },
        {
          title: "Solar Grid Structure Design",
          client: "MGM Green Energy",
          description:
            "Design and analysis of steel support systems for solar installation.",
          icon: "bolt",
        },
        {
          title: "Steel Derrick Structure",
          client: "Hindalco",
          description:
            "Engineered steel support solution for silencer erection requirements.",
          icon: "building",
        },
        {
          title: "Crane Railing Design",
          client: "Hindalco",
          description:
            "Structural safety and load-based design validation for overhead railing system.",
          icon: "hardhat",
        },
        {
          title: "Edge Protection Railing",
          client: "Balajee Infratech",
          description: "Design validation for operational safety and code alignment.",
          icon: "shield",
        },
        {
          title: "Unloading Mechanism Link & Joint Design",
          client: "Balajee Infratech",
          description:
            "Component-level engineering support for one-way unloading tipper mechanism.",
          icon: "layers",
        },
      ],
    },
    {
      title: "Structural Stability Audit & Residual Life Assessment",
      icon: "shield",
      image: {
        src: "https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2b27c016cd46d321777cd8b4ef3b9311048ae905.jpg?generation=1776077632257271&alt=media",
        alt: "Engineers inspecting industrial structure",
      },
      imageSide: "right",
      stickyImage: true,
      paragraphs: [
        "Industrial structures age, corrode, and undergo loading conditions that differ from original design assumptions. Our structural audit services provide a systematic evaluation of ageing, distressed, or modified structures — assessing their current condition, load-bearing performance, and remaining service life.",
        "We combine visual inspection with advanced non-destructive testing, material evaluation, and analytical modelling to identify distress mechanisms including cracking, deflection, corrosion, and degradation. Our assessments go beyond surface-level observation — we evaluate durability indicators, reinforcement condition, concrete quality, and structural adequacy against current codal provisions.",
        "Each audit concludes with actionable recommendations — whether it's continued service with monitoring, targeted repair, structural strengthening, or full retrofit — enabling clients to make informed decisions about asset life extension, safety compliance, and capital planning.",
      ],
      scopeLabel:
        "Comprehensive assessment tools for safety, durability, serviceability, and remedial planning",
      capabilities: [
        { label: "Structural audits for industrial buildings", icon: "building" },
        { label: "Residual life assessment", icon: "award" },
        { label: "Boiler & equipment foundation audits", icon: "flask" },
        { label: "Wagon tippler structural assessment", icon: "train" },
        { label: "Fire & corrosion damage evaluation", icon: "droplets" },
        { label: "Load testing & performance review", icon: "badge" },
        { label: "Concrete testing (UPV, rebound hammer)", icon: "search" },
        { label: "Reinforcement mapping & cover survey", icon: "layers" },
        { label: "Crack pattern analysis & diagnosis", icon: "shield" },
        { label: "Retrofit & repair recommendations", icon: "briefcase" },
        { label: "Code compliance & safety reports", icon: "scroll" },
      ],
      projectsTitle: "Past Projects",
      projects: [
        {
          title: "RCC Foundation Residual Life Assessment",
          client: "TSM with Mantra Udyog",
          description:
            "Structural audit and continued-service evaluation of wagon tippler foundation system.",
          icon: "award",
        },
        {
          title: "Structural Stability Audit of RCC & Steel Structures",
          client: "RHI Magnesita with Mantra Udyog",
          description:
            "Condition assessment of industrial structural assets for safety and performance review.",
          icon: "shield",
        },
      ],
    },
  ],
  expertiseStrip: [
    {
      label: "PhD-led engineering expertise",
      icon: "graduation",
    },
    {
      label: "Advanced FEA & structural analysis",
      icon: "bolt",
    },
    {
      label: "Compliance with IS, ASME, ASTM standards",
      icon: "scroll",
    },
    {
      label: "Pan-India industrial project delivery",
      icon: "train",
    },
  ],
  cta: {
    title: "Need expert structural design or audit services?",
    description:
      "From structural design to stability audits — let our certified experts partner with you.",
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
