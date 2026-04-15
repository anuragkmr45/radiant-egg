import { bigserial, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
