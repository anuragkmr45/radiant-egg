import { randomUUID } from "node:crypto";

import { desc, eq, sql } from "drizzle-orm";

import { cmsAssets } from "@/db/schema";
import { getDb, isPostgresConfigured } from "@/lib/postgres";

export interface CmsAssetRecord {
  id: string;
  fileName: string;
  contentType: string;
  byteSize: number;
  createdAt: string;
  url: string;
}

export interface CmsAssetPayload extends CmsAssetRecord {
  dataBase64: string;
}

export function canStoreCmsAssets() {
  return isPostgresConfigured();
}

export function getCmsAssetUrl(asset: Pick<CmsAssetRecord, "fileName" | "id">) {
  return `/uploads/${encodeURIComponent(asset.id)}/${encodeURIComponent(asset.fileName)}`;
}

export async function ensureCmsAssetsTable() {
  const db = getDb();

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "cms_assets" (
      "id" TEXT PRIMARY KEY,
      "file_name" TEXT NOT NULL,
      "content_type" TEXT NOT NULL,
      "byte_size" INTEGER NOT NULL,
      "data_base64" TEXT NOT NULL,
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "cms_assets_created_at_idx"
    ON "cms_assets" ("created_at" DESC)
  `);
}

export async function saveCmsAsset({
  buffer,
  contentType,
  fileName,
}: {
  buffer: Buffer;
  contentType: string;
  fileName: string;
}): Promise<CmsAssetRecord> {
  const db = getDb();
  const id = randomUUID();

  await ensureCmsAssetsTable();

  const [row] = await db
    .insert(cmsAssets)
    .values({
      byteSize: buffer.byteLength,
      contentType,
      dataBase64: buffer.toString("base64"),
      fileName,
      id,
    })
    .returning({
      byteSize: cmsAssets.byteSize,
      contentType: cmsAssets.contentType,
      createdAt: cmsAssets.createdAt,
      fileName: cmsAssets.fileName,
      id: cmsAssets.id,
    });

  const asset = {
    byteSize: Number(row?.byteSize ?? buffer.byteLength),
    contentType: row?.contentType ?? contentType,
    createdAt: row?.createdAt ?? "",
    fileName: row?.fileName ?? fileName,
    id: row?.id ?? id,
  };

  return {
    ...asset,
    url: getCmsAssetUrl(asset),
  };
}

export async function getCmsAsset(id: string): Promise<CmsAssetPayload | null> {
  if (!canStoreCmsAssets()) {
    return null;
  }

  const db = getDb();

  await ensureCmsAssetsTable();

  const [row] = await db
    .select({
      byteSize: cmsAssets.byteSize,
      contentType: cmsAssets.contentType,
      createdAt: cmsAssets.createdAt,
      dataBase64: cmsAssets.dataBase64,
      fileName: cmsAssets.fileName,
      id: cmsAssets.id,
    })
    .from(cmsAssets)
    .where(eq(cmsAssets.id, id))
    .limit(1);

  return row
    ? {
        ...row,
        byteSize: Number(row.byteSize),
        url: getCmsAssetUrl(row),
      }
    : null;
}

export async function listCmsAssets(limit = 12): Promise<CmsAssetRecord[]> {
  if (!canStoreCmsAssets()) {
    return [];
  }

  const db = getDb();

  await ensureCmsAssetsTable();

  const rows = await db
    .select({
      byteSize: cmsAssets.byteSize,
      contentType: cmsAssets.contentType,
      createdAt: cmsAssets.createdAt,
      fileName: cmsAssets.fileName,
      id: cmsAssets.id,
    })
    .from(cmsAssets)
    .orderBy(desc(cmsAssets.createdAt))
    .limit(limit);

  return rows.map((row) => ({
    ...row,
    byteSize: Number(row.byteSize),
    url: getCmsAssetUrl(row),
  }));
}
