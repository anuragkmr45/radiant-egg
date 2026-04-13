import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { getSiteConfig } from "@/config/site";

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

export function generateMetadata(): Metadata {
  const siteConfig = getSiteConfig();

  return {
    metadataBase: new URL(siteConfig.siteUrl),
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
      url: siteConfig.siteUrl,
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
  return (
    <html
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="site-body">{children}</body>
    </html>
  );
}
