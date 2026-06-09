"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCmsDocumentDefinition } from "@/cms/documents";
import { decodeCmsFieldName, type CmsFieldPathSegment } from "@/cms/form-fields";
import { isPlainObject, loadCmsDocument, mergeCmsValue } from "@/cms/load";
import { upsertCmsDocument } from "@/lib/cms-documents";
import { requireAdminAuth } from "@/lib/require-admin-auth";

function contentEditorUrl(path: string, params: Record<string, string>) {
  const urlParams = new URLSearchParams({
    document: path,
    ...params,
  });

  return `/admin/content?${urlParams.toString()}`;
}

function getRevalidationPaths(documentPath: string) {
  const definition = getCmsDocumentDefinition(documentPath);

  const paths = definition?.publicPath ? [definition.publicPath] : [];

  if (documentPath === "gallery.json") {
    paths.push("/about");
  }

  return Array.from(new Set(paths));
}

function coerceFieldValue(currentValue: unknown, rawValue: string) {
  if (typeof currentValue === "boolean") {
    return rawValue === "true";
  }

  if (typeof currentValue === "number") {
    const parsedValue = Number(rawValue);

    return Number.isFinite(parsedValue) ? parsedValue : currentValue;
  }

  return rawValue;
}

function getPathValue(root: unknown, path: readonly CmsFieldPathSegment[]) {
  let cursor = root;

  for (const segment of path) {
    if (typeof segment === "number" && Array.isArray(cursor)) {
      cursor = cursor[segment];
    } else if (typeof segment === "string" && isPlainObject(cursor)) {
      cursor = cursor[segment];
    } else {
      return undefined;
    }
  }

  return cursor;
}

function setPathValue(root: unknown, path: readonly CmsFieldPathSegment[], rawValue: string) {
  if (path.length === 0) {
    return;
  }

  let parent = root;

  for (const segment of path.slice(0, -1)) {
    if (typeof segment === "number" && Array.isArray(parent)) {
      parent = parent[segment];
    } else if (typeof segment === "string" && isPlainObject(parent)) {
      parent = parent[segment];
    } else {
      return;
    }
  }

  const leafSegment = path[path.length - 1];
  const currentValue = getPathValue(root, path);
  const nextValue = coerceFieldValue(currentValue, rawValue);

  if (typeof leafSegment === "number" && Array.isArray(parent)) {
    parent[leafSegment] = nextValue;
  } else if (typeof leafSegment === "string" && isPlainObject(parent)) {
    parent[leafSegment] = nextValue;
  }
}

export async function saveCmsDocumentAction(formData: FormData) {
  await requireAdminAuth("/admin/content");

  const documentPath = String(formData.get("path") ?? "");
  const definition = getCmsDocumentDefinition(documentPath);

  if (!definition) {
    redirect(contentEditorUrl("pages/home.json", { error: "invalid_document" }));
  }

  const editableContent = await loadCmsDocument(documentPath, definition.defaultContent);

  for (const [fieldName, fieldValue] of formData.entries()) {
    if (typeof fieldValue !== "string") {
      continue;
    }

    const fieldPath = decodeCmsFieldName(fieldName);

    if (!fieldPath) {
      continue;
    }

    setPathValue(editableContent, fieldPath, fieldValue);
  }

  const mergedContent = mergeCmsValue(definition.defaultContent, editableContent);

  if (!isPlainObject(mergedContent)) {
    redirect(contentEditorUrl(documentPath, { error: "invalid_json" }));
  }

  try {
    await upsertCmsDocument({
      content: mergedContent,
      path: documentPath,
      updatedBy: process.env.ADMIN_EMAIL ?? null,
    });
  } catch {
    redirect(contentEditorUrl(documentPath, { error: "storage" }));
  }

  if (documentPath === "site.json") {
    revalidatePath("/", "layout");
  } else {
    for (const path of getRevalidationPaths(documentPath)) {
      revalidatePath(path);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/content");

  redirect(contentEditorUrl(documentPath, { status: "saved" }));
}
