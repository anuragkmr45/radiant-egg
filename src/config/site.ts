import type { SiteConfig } from "@/types/site";

const homeLink = { label: "Home", href: "/" } as const;
const aboutLink = { label: "About", href: "/about" } as const;
const contactLink = { label: "Contact", href: "/contact" } as const;

const primaryNav = [
  homeLink,
  aboutLink,
  contactLink,
] as const;

const serviceNav = [
  {
    label: "Consultancy",
    href: "/services/consultancy",
    description: "Engineering reviews, drawings, and structural audit support.",
  },
  {
    label: "NDT",
    href: "/services/ndt",
    description: "Field-ready non-destructive testing programs for critical assets.",
  },
  {
    label: "TPI",
    href: "/services/tpi",
    description: "Third-party inspection with process visibility and compliance control.",
  },
] as const;

const footerGroups = [
  {
    title: "Services",
    links: serviceNav,
  },
  {
    title: "Company",
    links: [
      homeLink,
      aboutLink,
      contactLink,
    ],
  },
] as const;

export const siteConfig = {
  name: "Radiant Engineering",
  shortName: "Radiant",
  description:
    "Independent engineering consultancy, third-party inspection, and non-destructive testing for demanding industrial programs.",
  siteUrl: "https://radiant-engineering.example",
  locale: "en_US",
  tagline: "Consultancy, inspection, and NDT for industrial programs.",
  footerHeadline:
    "Independent engineering, inspection, and quality systems for demanding industrial work.",
  footerDescription:
    "Radiant Engineering supports consultancy, NDT, and third-party inspection scopes with disciplined execution, clear documentation, and reliable field coordination.",
  defaultKeywords: [
    "Radiant Engineering",
    "engineering consultancy",
    "third-party inspection",
    "NDT services",
    "industrial quality assurance",
  ],
  primaryNav,
  serviceNav,
  footerGroups,
  contact: {
    email: "info@radiantengg.com",
    phone: "+91 98765 43210",
    address: "Industrial Corridor, Gujarat, India",
    hours: "Mon - Sat, 9:00 AM to 6:00 PM IST",
  },
  defaultCta: {
    label: "Contact the team",
    href: "/contact",
    description:
      "Speak with the team coordinating consultancy, inspection, and field quality scopes.",
  },
  routes: [
    { href: "/", changeFrequency: "weekly", priority: 1 },
    { href: "/about", changeFrequency: "monthly", priority: 0.8 },
    { href: "/services/consultancy", changeFrequency: "monthly", priority: 0.8 },
    { href: "/services/ndt", changeFrequency: "monthly", priority: 0.8 },
    { href: "/services/tpi", changeFrequency: "monthly", priority: 0.8 },
    { href: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ],
} as const satisfies SiteConfig;
