import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { getContactPage } from "@/content/contact";
import {
  canStoreContactSubmissions,
  getContactSubmissionsCount,
} from "@/lib/contact-submissions";
import { requireAdminAuth } from "@/lib/require-admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  await requireAdminAuth("/admin");

  const contactPage = getContactPage();
  const isDatabaseReady = canStoreContactSubmissions();
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
          <p className="admin-submissions-page__eyebrow">Admin</p>
          <form action="/api/admin/logout" method="post">
            <button className="admin-panel__link admin-panel__link--button" type="submit">
              Logout
            </button>
          </form>
        </div>

        <section className="admin-panel">
          <div className="admin-panel__header">
            <div>
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
              <h2 className="admin-dashboard__title">Migration Needed</h2>
              <p className="admin-dashboard__copy">
                Public site content is still loaded from repo JSON files, so the old Decap editor remains a
                local-only workflow. Production content editing needs a separate data migration before it can
                work cleanly on Vercel.
              </p>
              {process.env.NODE_ENV === "development" ? (
                <a className="admin-panel__link" href="/admin/index.html">
                  Open local Decap CMS
                </a>
              ) : (
                <span className="admin-dashboard__hint">Hidden on production deployments</span>
              )}
            </article>

            <article className="admin-dashboard__card">
              <p className="admin-dashboard__label">Contact Form</p>
              <h2 className="admin-dashboard__title">{contactPage.form.serviceOptions.length} services</h2>
              <p className="admin-dashboard__copy">
                Current enquiry services include consultancy, NDT, TPI, supply, and other. Phone and company
                name are already captured into the database.
              </p>
              <span className="admin-dashboard__hint">
                DATABASE_URL {isDatabaseReady ? "configured" : "not configured"}
              </span>
            </article>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
