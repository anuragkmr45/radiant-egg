import { bigserial, index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    companyName: text("company_name"),
    service: text("service").notNull(),
    message: text("message").notNull(),
    sourcePath: text("source_path"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    submittedAt: timestamp("submitted_at", {
      mode: "string",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    submittedAtIndex: index("contact_submissions_submitted_at_idx").on(table.submittedAt),
  }),
);

export const cmsDocuments = pgTable("cms_documents", {
  path: text("path").primaryKey(),
  content: jsonb("content").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "string",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedBy: text("updated_by"),
});

export const cmsAssets = pgTable(
  "cms_assets",
  {
    id: text("id").primaryKey(),
    fileName: text("file_name").notNull(),
    contentType: text("content_type").notNull(),
    byteSize: integer("byte_size").notNull(),
    dataBase64: text("data_base64").notNull(),
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    createdAtIndex: index("cms_assets_created_at_idx").on(table.createdAt),
  }),
);
