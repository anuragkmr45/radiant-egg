import type { Metadata } from "next";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  cmsDocumentDefinitions,
  getCmsDocumentDefinition,
  resolveCmsDocumentPath,
} from "@/cms/documents";
import { encodeCmsFieldName, type CmsFieldPathSegment } from "@/cms/form-fields";
import { isPlainObject, loadCmsDocument } from "@/cms/load";
import {
  canStoreCmsDocuments,
  listCmsDocumentMetadata,
  type CmsDocumentMetadata,
} from "@/lib/cms-documents";
import { requireAdminAuth } from "@/lib/require-admin-auth";

import { saveCmsDocumentAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "RECPL Content Editor",
};

function getStatusCopy(status: string | string[] | undefined) {
  return status === "saved" ? "Content saved. The public route has been refreshed." : null;
}

function getErrorCopy(error: string | string[] | undefined) {
  if (error === "invalid_document") {
    return "That content document is not editable.";
  }

  if (error === "invalid_json") {
    return "The submitted content could not be matched to the expected website content structure.";
  }

  if (error === "storage") {
    return "The content could not be saved to the database. Check DATABASE_URL and try again.";
  }

  return null;
}

function formatTimestamp(value: string | null | undefined) {
  if (!value) {
    return "Not saved yet";
  }

  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function findMetadata(metadata: readonly CmsDocumentMetadata[], path: string) {
  return metadata.find((entry) => entry.path === path) ?? null;
}

const fieldLabels: Record<string, string> = {
  alt: "Image Description",
  ariaLabel: "Accessibility Label",
  backgroundImage: "Background Image",
  callAction: "Call Button",
  canonicalPath: "Canonical Path",
  cta: "Call To Action",
  defaultCta: "Default Call To Action",
  defaultKeywords: "SEO Keywords",
  description: "Description",
  email: "Email Address",
  footerDescription: "Footer Description",
  footerGroups: "Footer Link Groups",
  footerHeadline: "Footer Headline",
  fullName: "Full Name",
  glowPosition: "Glow Position",
  hero: "Hero Section",
  href: "Link URL",
  image: "Image",
  imageSide: "Image Position",
  intro: "Intro Section",
  label: "Label",
  legalName: "Legal Name",
  locale: "Locale",
  nav: "Navigation",
  pdfAction: "PDF Button",
  pdfState: "PDF State",
  phone: "Phone Number",
  phoneLabel: "Phone Label",
  primaryAction: "Primary Button",
  primaryNav: "Primary Navigation",
  quoteCta: "Quote Button",
  secondaryAction: "Secondary Button",
  seo: "SEO Settings",
  serviceNav: "Service Navigation",
  serviceOptions: "Service Options",
  shortName: "Short Name",
  siteUrl: "Site URL",
  src: "Image URL",
  summary: "Summary",
  title: "Title",
  titleAccent: "Title Accent",
  titleLead: "Title Lead",
  titleTail: "Title Tail",
  updatedBy: "Updated By",
  viewMoreLabel: "View More Label",
  whatsApp: "WhatsApp",
};

const selectOptionsByKey: Record<string, readonly string[]> = {
  changeFrequency: ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"],
  glowPosition: ["left", "right"],
  icon: [
    "award",
    "badge",
    "bolt",
    "briefcase",
    "building",
    "clipboard",
    "droplets",
    "factory",
    "flask",
    "fuel",
    "graduation",
    "hardhat",
    "layers",
    "package",
    "scroll",
    "search",
    "shield",
    "train",
  ],
  imageSide: ["left", "right"],
  kind: ["address", "phone", "email"],
  layout: ["split", "splitWithFullWidthCapabilities"],
  pdfState: ["comingSoon", "available", "hidden"],
  state: ["comingSoon", "available", "hidden"],
  tone: ["default", "muted"],
  variant: ["centered", "split"],
};

const longTextKeys = new Set([
  "address",
  "alt",
  "caption",
  "description",
  "footerDescription",
  "message",
  "note",
  "summary",
  "tagline",
]);

function formatLabel(segment: CmsFieldPathSegment | undefined) {
  if (segment === undefined) {
    return "Content";
  }

  if (typeof segment === "number") {
    return `Item ${segment + 1}`;
  }

  const mappedLabel = fieldLabels[segment];

  if (mappedLabel) {
    return mappedLabel;
  }

  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bSeo\b/g, "SEO")
    .replace(/\bCta\b/g, "CTA")
    .replace(/\bNdt\b/g, "NDT")
    .replace(/\bTpi\b/g, "TPI")
    .replace(/\bUrl\b/g, "URL");
}

function getLastPathSegment(path: readonly CmsFieldPathSegment[]) {
  return path[path.length - 1];
}

function getFieldId(path: readonly CmsFieldPathSegment[]) {
  return `cms-field-${path.map((segment) => String(segment).replace(/[^a-z0-9]+/gi, "-")).join("-")}`;
}

function getArrayItemLabel(parentKey: CmsFieldPathSegment | undefined, index: number) {
  if (parentKey === "paragraphs") {
    return `Paragraph ${index + 1}`;
  }

  if (parentKey === "defaultKeywords") {
    return `Keyword ${index + 1}`;
  }

  if (parentKey === "categories") {
    return `Category ${index + 1}`;
  }

  if (parentKey === "values") {
    return `Value ${index + 1}`;
  }

  return `Item ${index + 1}`;
}

function getItemTitle(value: Record<string, unknown>, index: number) {
  const title = value.title ?? value.label ?? value.name ?? value.category;

  return typeof title === "string" && title.trim() ? title : `Item ${index + 1}`;
}

function getFieldHelp(key: CmsFieldPathSegment | undefined) {
  if (key === "href") {
    return "Use an internal path such as /contact or /#services.";
  }

  if (key === "src") {
    return "Use a full image URL or an existing /uploads path.";
  }

  if (key === "path") {
    return "This should match the public page route.";
  }

  if (key === "icon") {
    return "Choose the icon used by this card or list item.";
  }

  return null;
}

function isLongTextField(key: CmsFieldPathSegment | undefined, value: string) {
  return typeof key === "string" && (longTextKeys.has(key) || value.length > 96);
}

function isPrimitiveValue(value: unknown) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}

function renderPrimitiveField({
  disabled,
  label,
  path,
  value,
}: {
  disabled: boolean;
  label?: string;
  path: readonly CmsFieldPathSegment[];
  value: string | number | boolean;
}) {
  const key = getLastPathSegment(path);
  const fieldId = getFieldId(path);
  const fieldName = encodeCmsFieldName(path);
  const helpText = getFieldHelp(key);
  const selectOptions = typeof key === "string" ? selectOptionsByKey[key] : undefined;
  let control: ReactNode;

  if (typeof value === "boolean") {
    control = (
      <select
        className="admin-content-field__control"
        defaultValue={String(value)}
        disabled={disabled}
        id={fieldId}
        name={fieldName}
      >
        <option value="true">Enabled</option>
        <option value="false">Disabled</option>
      </select>
    );
  } else if (selectOptions) {
    control = (
      <select
        className="admin-content-field__control"
        defaultValue={String(value)}
        disabled={disabled}
        id={fieldId}
        name={fieldName}
      >
        {selectOptions.map((option) => (
          <option key={option} value={option}>
            {formatLabel(option)}
          </option>
        ))}
      </select>
    );
  } else if (typeof value === "number") {
    control = (
      <input
        className="admin-content-field__control"
        defaultValue={value}
        disabled={disabled}
        id={fieldId}
        name={fieldName}
        step="any"
        type="number"
      />
    );
  } else if (isLongTextField(key, value)) {
    control = (
      <textarea
        className="admin-content-field__control admin-content-field__control--textarea"
        defaultValue={value}
        disabled={disabled}
        id={fieldId}
        name={fieldName}
        rows={4}
      />
    );
  } else {
    const inputType = key === "email" ? "email" : key === "phone" ? "tel" : key === "siteUrl" ? "url" : "text";

    control = (
      <input
        className="admin-content-field__control"
        defaultValue={value}
        disabled={disabled}
        id={fieldId}
        name={fieldName}
        type={inputType}
      />
    );
  }

  return (
    <label className="admin-content-field" htmlFor={fieldId} key={fieldName}>
      <span className="admin-content-field__label">{label ?? formatLabel(key)}</span>
      <span className="admin-content-field__control-wrap">{control}</span>
      {helpText ? <small className="admin-content-field__help">{helpText}</small> : null}
    </label>
  );
}

function renderArrayFields({
  disabled,
  path,
  value,
}: {
  disabled: boolean;
  path: readonly CmsFieldPathSegment[];
  value: readonly unknown[];
}) {
  const parentKey = getLastPathSegment(path);

  if (value.length === 0) {
    return <p className="admin-content__empty-note">No items are currently configured.</p>;
  }

  if (value.every(isPrimitiveValue)) {
    return (
      <div className="admin-content__field-grid">
        {value.map((item, index) =>
          renderPrimitiveField({
            disabled,
            label: getArrayItemLabel(parentKey, index),
            path: [...path, index],
            value: item as string | number | boolean,
          }),
        )}
      </div>
    );
  }

  return (
    <div className="admin-content__collection">
      {value.map((item, index) => {
        if (!isPlainObject(item)) {
          return null;
        }

        return (
          <article className="admin-content__item-card" key={`${path.join(".")}-${index}`}>
            <div className="admin-content__item-header">
              <span>{getArrayItemLabel(parentKey, index)}</span>
              <strong>{getItemTitle(item, index)}</strong>
            </div>
            {renderObjectFields({
              disabled,
              path: [...path, index],
              value: item,
            })}
          </article>
        );
      })}
    </div>
  );
}

function renderComplexField({
  disabled,
  path,
  value,
}: {
  disabled: boolean;
  path: readonly CmsFieldPathSegment[];
  value: unknown;
}) {
  const key = getLastPathSegment(path);

  return (
    <div className="admin-content__subsection" key={path.join(".")}>
      <div className="admin-content__subsection-header">
        <h4>{formatLabel(key)}</h4>
        {Array.isArray(value) ? <span>{value.length} items</span> : null}
      </div>
      {Array.isArray(value)
        ? renderArrayFields({ disabled, path, value })
        : isPlainObject(value)
          ? renderObjectFields({ disabled, path, value })
          : null}
    </div>
  );
}

function renderObjectFields({
  disabled,
  path,
  value,
}: {
  disabled: boolean;
  path: readonly CmsFieldPathSegment[];
  value: Record<string, unknown>;
}) {
  const entries = Object.entries(value);
  const primitiveEntries = entries.filter(([, fieldValue]) => isPrimitiveValue(fieldValue));
  const complexEntries = entries.filter(([, fieldValue]) => Array.isArray(fieldValue) || isPlainObject(fieldValue));

  return (
    <>
      {primitiveEntries.length > 0 ? (
        <div className="admin-content__field-grid">
          {primitiveEntries.map(([fieldKey, fieldValue]) =>
            renderPrimitiveField({
              disabled,
              path: [...path, fieldKey],
              value: fieldValue as string | number | boolean,
            }),
          )}
        </div>
      ) : null}

      {complexEntries.map(([fieldKey, fieldValue]) =>
        renderComplexField({
          disabled,
          path: [...path, fieldKey],
          value: fieldValue,
        }),
      )}
    </>
  );
}

function renderContentSections({
  content,
  disabled,
}: {
  content: unknown;
  disabled: boolean;
}) {
  if (!isPlainObject(content)) {
    return <p className="admin-content__empty-note">This content cannot be edited in the field editor.</p>;
  }

  const entries = Object.entries(content);
  const primitiveEntries = entries.filter(([, value]) => isPrimitiveValue(value));
  const sectionEntries = entries.filter(([, value]) => Array.isArray(value) || isPlainObject(value));

  return (
    <div className="admin-content__form-stack">
      {primitiveEntries.length > 0 ? (
        <section className="admin-content__section">
          <div className="admin-content__section-header">
            <p className="admin-panel__eyebrow">General</p>
            <h3>General Settings</h3>
          </div>
          <div className="admin-content__field-grid">
            {primitiveEntries.map(([fieldKey, fieldValue]) =>
              renderPrimitiveField({
                disabled,
                path: [fieldKey],
                value: fieldValue as string | number | boolean,
              }),
            )}
          </div>
        </section>
      ) : null}

      {sectionEntries.map(([sectionKey, sectionValue]) => (
        <section className="admin-content__section" key={sectionKey}>
          <div className="admin-content__section-header">
            <p className="admin-panel__eyebrow">{sectionKey}</p>
            <h3>{formatLabel(sectionKey)}</h3>
            {Array.isArray(sectionValue) ? <span>{sectionValue.length} items</span> : null}
          </div>
          {Array.isArray(sectionValue)
            ? renderArrayFields({ disabled, path: [sectionKey], value: sectionValue })
            : isPlainObject(sectionValue)
              ? renderObjectFields({ disabled, path: [sectionKey], value: sectionValue })
              : null}
        </section>
      ))}
    </div>
  );
}

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams: Promise<{
    document?: string | string[];
    error?: string | string[];
    status?: string | string[];
  }>;
}) {
  await requireAdminAuth("/admin/content");

  const { document, error, status } = await searchParams;
  const selectedPath = resolveCmsDocumentPath(document);
  const selectedDocument = getCmsDocumentDefinition(selectedPath) ?? cmsDocumentDefinitions[0]!;
  const databaseReady = canStoreCmsDocuments();
  const statusCopy = getStatusCopy(status);
  const errorCopy = getErrorCopy(error);
  let storageError: string | null = null;
  let documentMetadata: CmsDocumentMetadata[] = [];

  if (databaseReady) {
    try {
      documentMetadata = await listCmsDocumentMetadata();
    } catch (metadataError) {
      storageError = metadataError instanceof Error ? metadataError.message : "Unable to read content storage.";
    }
  } else {
    storageError = "DATABASE_URL is not configured for content editing.";
  }

  const selectedMetadata = findMetadata(documentMetadata, selectedDocument.path);
  const selectedContent = await loadCmsDocument(selectedDocument.path, selectedDocument.defaultContent);
  const isEditorDisabled = Boolean(storageError);

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
              <p className="admin-panel__eyebrow">Database Content</p>
              <h1 className="admin-panel__title">Content Editor</h1>
              <p className="admin-panel__description">
                Update the website content through clear page sections and labeled fields. The public page
                design, spacing, typography, and section structure continue to come from the existing React
                components.
              </p>
            </div>
          </div>

          <div className="admin-content">
            <aside className="admin-content__sidebar" aria-label="Editable content documents">
              {cmsDocumentDefinitions.map((contentDocument) => {
                const metadata = findMetadata(documentMetadata, contentDocument.path);
                const isSelected = contentDocument.path === selectedDocument.path;

                return (
                  <a
                    aria-current={isSelected ? "page" : undefined}
                    className="admin-content__nav-link"
                    data-active={isSelected ? "" : undefined}
                    href={`/admin/content?document=${encodeURIComponent(contentDocument.path)}`}
                    key={contentDocument.path}
                  >
                    <span>{contentDocument.label}</span>
                    <small>{metadata ? "Saved in database" : "Using fallback JSON"}</small>
                  </a>
                );
              })}
            </aside>

            <form action={saveCmsDocumentAction} className="admin-content__editor">
              <input name="path" type="hidden" value={selectedDocument.path} />

              <div className="admin-content__editor-header">
                <div>
                  <p className="admin-panel__eyebrow">{selectedDocument.path}</p>
                  <h2 className="admin-dashboard__title">{selectedDocument.label}</h2>
                  <p className="admin-dashboard__copy">{selectedDocument.description}</p>
                </div>
                <div className="admin-content__meta">
                  <span>{selectedMetadata ? "Database override" : "Fallback JSON"}</span>
                  <strong>{formatTimestamp(selectedMetadata?.updatedAt)}</strong>
                  {selectedDocument.publicPath ? (
                    <a href={selectedDocument.publicPath} target="_blank" rel="noreferrer">
                      View public page
                    </a>
                  ) : null}
                </div>
              </div>

              {statusCopy ? <p className="admin-content__notice">{statusCopy}</p> : null}
              {errorCopy ? <p className="admin-content__notice admin-content__notice--error">{errorCopy}</p> : null}
              {storageError ? (
                <p className="admin-content__notice admin-content__notice--error">{storageError}</p>
              ) : null}

              {renderContentSections({
                content: selectedContent,
                disabled: isEditorDisabled,
              })}

              <div className="admin-content__actions">
                <button className="admin-auth-form__submit" disabled={isEditorDisabled} type="submit">
                  Save content
                </button>
                <span className="admin-dashboard__hint">
                  Saved fields keep the current website layout and formatting intact.
                </span>
              </div>
            </form>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
