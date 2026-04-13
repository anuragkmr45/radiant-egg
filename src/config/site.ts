import type { SiteConfig } from "@/types/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Consultancy", href: "/services/consultancy" },
  { label: "NDT", href: "/services/ndt" },
  { label: "TPI", href: "/services/tpi" },
  { label: "Contact", href: "/contact" },
] as const;

const footerGroups = [
  {
    title: "Services",
    links: [
      nav[2],
      nav[3],
      nav[4],
    ],
  },
  {
    title: "Company",
    links: [
      nav[0],
      nav[1],
      nav[5],
    ],
  },
] as const;

export const siteConfig = {
  name: "Radiant Engineering",
  shortName: "Radiant",
  description:
    "Industrial engineering, consultancy, third-party inspection, and NDT placeholder site rebuilt in Next.js App Router.",
  siteUrl: "https://radiant-engineering.example",
  locale: "en_US",
  defaultKeywords: [
    "Radiant Engineering",
    "engineering consultancy",
    "third-party inspection",
    "NDT services",
    "industrial quality assurance",
  ],
  nav,
  footerGroups,
  contact: {
    email: "info@radiant-engineering.example",
    phone: "+91 98765 43210",
    address: "Industrial Corridor, Gujarat, India",
    hours: "Mon - Sat, 9:00 AM to 6:00 PM IST",
  },
  defaultCta: {
    label: "Contact the team",
    href: "/contact",
    description:
      "The contact route is scaffolded now and will be upgraded with the final enquiry flow in Phase 8.",
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
