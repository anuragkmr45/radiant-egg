import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { AdminSubmissionsPanel } from "@/components/admin/AdminSubmissionsPanel";
import { getContactPage } from "@/content/contact";
import {
  canStoreContactSubmissions,
  getContactSubmissionsCount,
  listContactSubmissions,
  type ContactSubmissionRecord,
} from "@/lib/contact-submissions";
import { requireAdminAuth } from "@/lib/require-admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Contact Submissions",
};

export default async function AdminSubmissionsPage() {
  await requireAdminAuth("/admin/submissions");

  const contactPage = getContactPage();
  let submissionCount: number | null = null;
  let submissionsError: string | null = null;
  let submissions: ContactSubmissionRecord[] = [];

  if (canStoreContactSubmissions()) {
    try {
      submissionCount = await getContactSubmissionsCount();
      submissions = await listContactSubmissions(50);
    } catch (error) {
      submissionsError = error instanceof Error ? error.message : "Unknown database error.";
    }
  } else {
    submissionsError = "DATABASE_URL is not configured for contact submission storage.";
  }

  return (
    <main className="admin-submissions-page">
      <PageContainer className="admin-submissions-page__inner">
        <div className="admin-submissions-page__topbar">
          <p className="admin-submissions-page__eyebrow">Admin</p>
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

        <AdminSubmissionsPanel
          error={submissionsError}
          serviceLabels={contactPage.form.serviceOptions}
          submissionCount={submissionCount}
          submissions={submissions}
        />
      </PageContainer>
    </main>
  );
}
