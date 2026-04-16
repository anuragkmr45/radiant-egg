import { getPublicSiteUrl } from "@/config/site";
import type {
  ContactPageContent,
  SeoFields,
} from "@/types/content";
import type { SiteConfig, SitePath } from "@/types/site";

type JsonLd = Record<string, unknown>;

interface BreadcrumbItem {
  name: string;
  path: SitePath;
}

function toAbsoluteUrl(siteConfig: SiteConfig, routePath: string) {
  const publicSiteUrl = getPublicSiteUrl(siteConfig);

  return publicSiteUrl ? new URL(routePath, publicSiteUrl).toString() : routePath;
}

function createThingReference(siteConfig: SiteConfig, hash: string) {
  const publicSiteUrl = getPublicSiteUrl(siteConfig);

  return publicSiteUrl ? `${publicSiteUrl}${hash}` : hash;
}

export function createSiteStructuredData(siteConfig: SiteConfig): JsonLd[] {
  const publicSiteUrl = getPublicSiteUrl(siteConfig);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": createThingReference(siteConfig, "#organization"),
      name: siteConfig.name,
      description: siteConfig.description,
      url: publicSiteUrl ?? "/",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.contact.address,
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contact.email,
          telephone: siteConfig.contact.phone,
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": createThingReference(siteConfig, "#website"),
      url: publicSiteUrl ?? "/",
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        "@id": createThingReference(siteConfig, "#organization"),
      },
      inLanguage: "en",
    },
  ];
}

export function createBreadcrumbStructuredData(
  siteConfig: SiteConfig,
  items: readonly BreadcrumbItem[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(siteConfig, item.path),
    })),
  };
}

export function createWebPageStructuredData(
  siteConfig: SiteConfig,
  seo: SeoFields,
  pageType: "WebPage" | "AboutPage" | "ContactPage" = "WebPage",
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": createThingReference(siteConfig, `${seo.path}#webpage`),
    url: toAbsoluteUrl(siteConfig, seo.path),
    name: seo.title,
    description: seo.description,
    isPartOf: {
      "@id": createThingReference(siteConfig, "#website"),
    },
    about: {
      "@id": createThingReference(siteConfig, "#organization"),
    },
    inLanguage: "en",
  };
}

export function createServiceStructuredData(
  siteConfig: SiteConfig,
  seo: SeoFields,
  serviceTitle: string,
  serviceDescription: string,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": createThingReference(siteConfig, `${seo.path}#service`),
    name: serviceTitle,
    description: serviceDescription,
    serviceType: serviceTitle,
    url: toAbsoluteUrl(siteConfig, seo.path),
    areaServed: "India",
    provider: {
      "@id": createThingReference(siteConfig, "#organization"),
    },
  };
}

export function createContactStructuredData(
  siteConfig: SiteConfig,
  content: ContactPageContent,
): JsonLd {
  const publicSiteUrl = getPublicSiteUrl(siteConfig);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": createThingReference(siteConfig, "#organization"),
    url: publicSiteUrl ?? "/",
    name: siteConfig.name,
    contactPoint: content.directContacts.people.map((person) => ({
      "@type": "ContactPoint",
      contactType: person.role,
      email: person.email,
      telephone: person.phone,
      availableLanguage: ["en"],
    })),
  };
}

export function getServiceSummary(content: {
  hero: {
    description?: string;
    summary: string;
  };
}) {
  return content.hero.description ?? content.hero.summary;
}
