import type { Metadata } from "next";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { PageContainer } from "@/components/layout/PageContainer";
import { getContactPage } from "@/content/contact";
import {
  canStoreContactSubmissions,
  getContactSubmissionsCount,
} from "@/lib/contact-submissions";
import { getContactRateLimitSettings } from "@/lib/contact-rate-limit";
import { requireAdminAuth } from "@/lib/require-admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "RECPL Admin Dashboard",
};

export default async function AdminPage() {
  await requireAdminAuth("/admin");

  const contactPage = await getContactPage();
  const isDatabaseReady = canStoreContactSubmissions();
  const rateLimitSettings = getContactRateLimitSettings();
  let submissionCount: number | null = null;

  if (isDatabaseReady) {
    try {
      submissionCount = await getContactSubmissionsCount();
    } catch {
      submissionCount = null;
    }
  }

  return (
    <main className="admin-submissions-page">
      <PageContainer className="admin-submissions-page__inner">
        <div className="admin-submissions-page__topbar">
          <div className="admin-submissions-page__brand">
            <BrandLogo className="admin-submissions-page__logo" variant="compact" />
            <p className="admin-submissions-page__eyebrow">RECPL Admin</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="admin-panel__link admin-panel__link--button" type="submit">
              Logout
            </button>
          </form>
        </div>

        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
              <BrandLogo className="admin-panel__logo" variant="full" />
              <p className="admin-panel__eyebrow">Email and Password</p>
              <h1 className="admin-panel__title">Admin Dashboard</h1>
              <p className="admin-panel__description">
                This dashboard is protected by your environment-configured admin credentials and is ready for
                Vercel deployment.
              </p>
            </div>
          </div>

          <div className="admin-dashboard">
            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Contact Submissions</p>
              <h2 className="admin-dashboard__title">
                {typeof submissionCount === "number" ? submissionCount : "Unavailable"}
              </h2>
              <p className="admin-dashboard__copy">
                Review live enquiries stored in PostgreSQL. Service labels are sourced from the contact form
                configuration.
              </p>
              <a className="admin-panel__link" href="/admin/submissions">
                Open submissions
              </a>
            </article>

            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Content Editor</p>
              <h2 className="admin-dashboard__title">Ready</h2>
              <p className="admin-dashboard__copy">
                Update the current site content from the protected admin panel. Saved edits are stored in
                PostgreSQL while the checked-in JSON remains the fallback.
              </p>
              <a className="admin-panel__link" href="/admin/content">
                Open content editor
              </a>
            </article>

            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Contact Form</p>
              <h2 className="admin-dashboard__title">{contactPage.form.serviceOptions.length} services</h2>
              <p className="admin-dashboard__copy">
                Current enquiry services include consultancy, NDT, material testing, supply, and other.
                Phone and company name are already captured into the database.
              </p>
              <span className="admin-dashboard__hint">
                DATABASE_URL {isDatabaseReady ? "configured" : "not configured"}
              </span>
            </article>

            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Rate Limit and Media</p>
              <h2 className="admin-dashboard__title">{rateLimitSettings.limit} attempts</h2>
              <p className="admin-dashboard__copy">
                Review contact form throttling and upload compressed images to generate reusable website
                image URLs.
              </p>
              <a className="admin-panel__link" href="/admin/tools">
                Open tools
              </a>
            </article>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
