import { desc, sql } from "drizzle-orm";

import { contactSubmissions } from "@/db/schema";
import type { ContactSubmissionInput } from "@/lib/contact-submission";
import { getDb, isPostgresConfigured } from "@/lib/postgres";

interface SaveContactSubmissionInput {
  submission: ContactSubmissionInput;
  sourcePath?: string | undefined;
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
}

export interface ContactSubmissionRecord {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  service: string;
  message: string;
  sourcePath: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  submittedAt: string;
}

export function canStoreContactSubmissions() {
  return isPostgresConfigured();
}

export async function ensureContactSubmissionsTable() {
  const db = getDb();

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contact_submissions" (
      "id" BIGSERIAL PRIMARY KEY,
      "full_name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "company_name" TEXT,
      "service" TEXT NOT NULL,
      "message" TEXT NOT NULL,
      "source_path" TEXT,
      "ip_address" TEXT,
      "user_agent" TEXT,
      "submitted_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    ALTER TABLE "contact_submissions"
    ADD COLUMN IF NOT EXISTS "company_name" TEXT
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "contact_submissions_submitted_at_idx"
    ON "contact_submissions" ("submitted_at" DESC)
  `);
}

export async function saveContactSubmission({
  submission,
  sourcePath,
  ipAddress,
  userAgent,
}: SaveContactSubmissionInput) {
  const db = getDb();

  await ensureContactSubmissionsTable();

  const [row] = await db
    .insert(contactSubmissions)
    .values({
      companyName: submission.companyName || null,
      email: submission.email,
      fullName: submission.fullName,
      ipAddress: ipAddress?.trim() || null,
      message: submission.message,
      phone: submission.phone || null,
      service: submission.service,
      sourcePath: sourcePath?.trim() || null,
      userAgent: userAgent?.trim() || null,
    })
    .returning({
      id: contactSubmissions.id,
      submittedAt: contactSubmissions.submittedAt,
    });

  return {
    id: Number(row?.id ?? 0),
    submittedAt: row?.submittedAt ?? "",
  };
}

export async function listContactSubmissions(limit = 50): Promise<ContactSubmissionRecord[]> {
  const db = getDb();

  await ensureContactSubmissionsTable();

  const rows = await db
    .select({
      companyName: contactSubmissions.companyName,
      email: contactSubmissions.email,
      fullName: contactSubmissions.fullName,
      id: contactSubmissions.id,
      ipAddress: contactSubmissions.ipAddress,
      message: contactSubmissions.message,
      phone: contactSubmissions.phone,
      service: contactSubmissions.service,
      sourcePath: contactSubmissions.sourcePath,
      submittedAt: contactSubmissions.submittedAt,
      userAgent: contactSubmissions.userAgent,
    })
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.id))
    .limit(limit);

  return rows.map((row) => ({
    ...row,
    submittedAt: row.submittedAt ?? "",
  }));
}

export async function getContactSubmissionsCount() {
  const db = getDb();

  await ensureContactSubmissionsTable();

  const [row] = await db
    .select({
      count: sql<number>`count(*)::int`,
    })
    .from(contactSubmissions);

  return Number(row?.count ?? 0);
}
