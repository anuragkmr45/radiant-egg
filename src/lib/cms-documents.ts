import { eq, sql } from "drizzle-orm";

import { cmsDocuments } from "@/db/schema";
import { getDb, isPostgresConfigured } from "@/lib/postgres";

export interface CmsDocumentMetadata {
  path: string;
  updatedAt: string;
  updatedBy: string | null;
}

export function canStoreCmsDocuments() {
  return isPostgresConfigured();
}

export async function ensureCmsDocumentsTable() {
  const db = getDb();

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "cms_documents" (
      "path" TEXT PRIMARY KEY,
      "content" JSONB NOT NULL,
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_by" TEXT
    )
  `);
}

export async function getStoredCmsDocument(path: string) {
  if (!canStoreCmsDocuments()) {
    return null;
  }

  const db = getDb();

  const [row] = await db
    .select({
      content: cmsDocuments.content,
    })
    .from(cmsDocuments)
    .where(eq(cmsDocuments.path, path))
    .limit(1);

  return row?.content ?? null;
}

export async function getCmsDocumentMetadata(path: string): Promise<CmsDocumentMetadata | null> {
  if (!canStoreCmsDocuments()) {
    return null;
  }

  const db = getDb();

  await ensureCmsDocumentsTable();

  const [row] = await db
    .select({
      path: cmsDocuments.path,
      updatedAt: cmsDocuments.updatedAt,
      updatedBy: cmsDocuments.updatedBy,
    })
    .from(cmsDocuments)
    .where(eq(cmsDocuments.path, path))
    .limit(1);

  return row ?? null;
}

export async function listCmsDocumentMetadata(): Promise<CmsDocumentMetadata[]> {
  if (!canStoreCmsDocuments()) {
    return [];
  }

  const db = getDb();

  await ensureCmsDocumentsTable();

  return db
    .select({
      path: cmsDocuments.path,
      updatedAt: cmsDocuments.updatedAt,
      updatedBy: cmsDocuments.updatedBy,
    })
    .from(cmsDocuments);
}

export async function upsertCmsDocument({
  content,
  path,
  updatedBy,
}: {
  content: Record<string, unknown>;
  path: string;
  updatedBy?: string | null;
}) {
  if (!canStoreCmsDocuments()) {
    throw new Error("DATABASE_URL is not configured for content editing.");
  }

  const db = getDb();

  await ensureCmsDocumentsTable();

  await db
    .insert(cmsDocuments)
    .values({
      content,
      path,
      updatedBy: updatedBy?.trim() || null,
    })
    .onConflictDoUpdate({
      target: cmsDocuments.path,
      set: {
        content,
        updatedAt: sql`NOW()`,
        updatedBy: updatedBy?.trim() || null,
      },
    });
}
