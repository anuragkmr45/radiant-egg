import "server-only";

import { headers } from "next/headers";

import { getPublicSiteUrl } from "@/config/site";
import type { SiteConfig } from "@/types/site";

function normalizeOrigin(input: string) {
  return new URL(input).toString().replace(/\/$/, "");
}

export async function resolveSiteOrigin(siteConfig: Pick<SiteConfig, "siteUrl">) {
  const publicSiteUrl = getPublicSiteUrl(siteConfig);

  if (publicSiteUrl) {
    return publicSiteUrl;
  }

  const headerList = await headers();
  const forwardedHost = headerList.get("x-forwarded-host") ?? headerList.get("host");

  if (!forwardedHost) {
    return normalizeOrigin("http://localhost:3000");
  }

  const forwardedProto =
    headerList.get("x-forwarded-proto") ?? (forwardedHost.includes("localhost") ? "http" : "https");

  return normalizeOrigin(`${forwardedProto}://${forwardedHost}`);
}
