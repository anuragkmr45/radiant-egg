import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { StructuredData } from "@/components/seo/StructuredData";
import { getSiteConfig } from "@/config/site";
import { resolveSiteOrigin } from "@/lib/site-url";
import { createSiteStructuredData } from "@/lib/structured-data";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = getSiteConfig();
  const siteOrigin = await resolveSiteOrigin(siteConfig);

  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [...siteConfig.defaultKeywords],
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: "/",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#091d34",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = getSiteConfig();

  return (
    <html
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="site-body">
        <StructuredData data={createSiteStructuredData(siteConfig)} />
        {children}
      </body>
    </html>
  );
}
