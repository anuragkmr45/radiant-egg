import type { Metadata } from "next";

import { AdminImageTools } from "@/components/admin/AdminImageTools";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  canStoreCmsAssets,
  listCmsAssets,
  type CmsAssetRecord,
} from "@/lib/cms-assets";
import { getContactRateLimitSettings } from "@/lib/contact-rate-limit";
import { requireAdminAuth } from "@/lib/require-admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "RECPL Admin Tools",
};

function formatWindow(seconds: number) {
  if (seconds % 60 !== 0) {
    return `${seconds} seconds`;
  }

  const minutes = seconds / 60;

  return minutes === 1 ? "1 minute" : `${minutes} minutes`;
}

export default async function AdminToolsPage() {
  await requireAdminAuth("/admin/tools");

  const rateLimitSettings = getContactRateLimitSettings();
  const canUpload = canStoreCmsAssets();
  let recentAssets: CmsAssetRecord[] = [];
  let assetStorageError: string | null = null;

  if (canUpload) {
    try {
      recentAssets = await listCmsAssets(8);
    } catch (error) {
      assetStorageError = error instanceof Error ? error.message : "Unable to load image uploads.";
    }
  } else {
    assetStorageError = "DATABASE_URL is not configured for image uploads.";
  }

  return (
    <main className="admin-submissions-page">
      <PageContainer className="admin-submissions-page__inner">
        <div className="admin-submissions-page__topbar">
          <div className="admin-submissions-page__brand">
            <BrandLogo className="admin-submissions-page__logo" variant="compact" />
            <p className="admin-submissions-page__eyebrow">RECPL Admin</p>
          </div>
          <div className="admin-submissions-page__actions">
            <a className="admin-panel__link" href="/admin">
              Back to dashboard
            </a>
            <form action="/api/admin/logout" method="post">
              <button className="admin-panel__link admin-panel__link--button" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>

        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <BrandLogo className="admin-panel__logo" variant="full" />
              <p className="admin-panel__eyebrow">Site Controls</p>
              <h1 className="admin-panel__title">Rate Limit and Media Tools</h1>
              <p className="admin-panel__description">
                Review contact form protection and generate compressed image URLs for content fields across
                the website.
              </p>
            </div>
          </div>

          <div className="admin-tools__grid">
            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Contact Rate Limit</p>
              <h2 className="admin-dashboard__title">
                {rateLimitSettings.limit} attempts
              </h2>
              <p className="admin-dashboard__copy">
                Contact form submissions are limited per visitor every{" "}
                {formatWindow(rateLimitSettings.windowSeconds)}.
              </p>
              <span className="admin-dashboard__hint">
                Configure with CONTACT_RATE_LIMIT_MAX_ATTEMPTS and CONTACT_RATE_LIMIT_WINDOW_SECONDS.
              </span>
            </article>

            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Image URLs</p>
              <h2 className="admin-dashboard__title">
                {canUpload ? `${recentAssets.length} recent` : "Unavailable"}
              </h2>
              <p className="admin-dashboard__copy">
                Uploaded images are stored in PostgreSQL and shown as complete URLs that can be pasted into
                image source fields.
              </p>
              <a className="admin-panel__link" href="/admin/content">
                Open content editor
              </a>
            </article>
          </div>

          {assetStorageError ? (
            <p className="admin-content__notice admin-content__notice--error">{assetStorageError}</p>
          ) : null}

          <AdminImageTools canUpload={canUpload && !assetStorageError} recentAssets={recentAssets} />
        </section>
      </PageContainer>
    </main>
  );
}
