import type { ContactSubmissionRecord } from "@/lib/contact-submissions";

interface AdminSubmissionsPanelProps {
  error?: string | null;
  serviceLabels: readonly { label: string; value: string }[];
  submissionCount: number | null;
  submissions: readonly ContactSubmissionRecord[];
}

function formatSubmittedAt(value: string) {
  if (!value) {
    return "Unknown time";
  }

  const date = new Date(value);

  return Number.isNaN(date.valueOf())
    ? value
    : new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export function AdminSubmissionsPanel({
  error = null,
  serviceLabels,
  submissionCount,
  submissions,
}: AdminSubmissionsPanelProps) {
  const serviceLabelMap = new Map(serviceLabels.map((option) => [option.value, option.label] as const));

  return (
    <section className="admin-panel">
      <div className="admin-panel__header">
        <div>
          <p className="admin-panel__eyebrow">PostgreSQL</p>
          <h1 className="admin-panel__title">Contact Submissions</h1>
          <p className="admin-panel__description">
            Live enquiries captured from the contact form and stored in the <code>contact_submissions</code>{" "}
            table.
          </p>
        </div>
        <div className="admin-panel__meta">
          <span className="admin-panel__meta-label">Total</span>
          <strong>{typeof submissionCount === "number" ? submissionCount : "Unavailable"}</strong>
        </div>
      </div>

      <div className="admin-panel__body">
        {error ? (
          <div className="admin-panel__empty">
            <h2>Unable to load submissions</h2>
            <p>{error}</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="admin-panel__empty">
            <h2>No submissions yet</h2>
            <p>Your contact enquiries will appear here after the first successful form submission.</p>
          </div>
        ) : (
          <div className="admin-submissions">
            {submissions.map((submission) => (
              <article className="admin-submission-card" key={submission.id}>
                <div className="admin-submission-card__header">
                  <div>
                    <h2 className="admin-submission-card__name">{submission.fullName}</h2>
                    <p className="admin-submission-card__meta">
                      {serviceLabelMap.get(submission.service) ?? submission.service}
                    </p>
                  </div>
                  <div className="admin-submission-card__stamp">
                    <span>#{submission.id}</span>
                    <span>{formatSubmittedAt(submission.submittedAt)}</span>
                  </div>
                </div>

                <dl className="admin-submission-card__grid">
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${submission.email}`}>{submission.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      {submission.phone ? (
                        <a href={`tel:${submission.phone.replace(/\s+/g, "")}`}>{submission.phone}</a>
                      ) : (
                        "Not provided"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Company</dt>
                    <dd>{submission.companyName ?? "Not provided"}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{submission.sourcePath ?? "Unknown"}</dd>
                  </div>
                  <div>
                    <dt>IP Address</dt>
                    <dd>{submission.ipAddress ?? "Unavailable"}</dd>
                  </div>
                </dl>

                <div className="admin-submission-card__message">
                  <span>Message</span>
                  <p>{submission.message}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
