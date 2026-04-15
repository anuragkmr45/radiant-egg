import type { ContactFormOption } from "@/types/content";

export interface ContactSubmissionInput {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

export type ContactSubmissionField = keyof ContactSubmissionInput;
export type ContactSubmissionErrors = Record<ContactSubmissionField, string | undefined>;

export const defaultContactSubmissionValues: ContactSubmissionInput = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  service: "",
  message: "",
};

export const defaultContactSubmissionErrors: ContactSubmissionErrors = {
  fullName: undefined,
  email: undefined,
  phone: undefined,
  companyName: undefined,
  service: undefined,
  message: undefined,
};

export function normalizeContactSubmission(
  input: Partial<ContactSubmissionInput> | null | undefined,
): ContactSubmissionInput {
  return {
    fullName: String(input?.fullName ?? "").trim(),
    email: String(input?.email ?? "").trim(),
    phone: String(input?.phone ?? "").trim(),
    companyName: String(input?.companyName ?? "").trim(),
    service: String(input?.service ?? "").trim(),
    message: String(input?.message ?? "").trim(),
  };
}

export function validateContactField(
  field: ContactSubmissionField,
  value: string,
  serviceOptions: readonly ContactFormOption[],
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "fullName":
      return trimmed.length >= 2 ? undefined : "Enter your full name.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? undefined
        : "Enter a valid email address.";
    case "phone":
      if (!trimmed) {
        return "Enter your phone number.";
      }

      return /^[+\d][\d\s()-]{8,}$/.test(trimmed) ? undefined : "Enter a valid phone number.";
    case "companyName":
      if (!trimmed) {
        return undefined;
      }

      return trimmed.length >= 2 ? undefined : "Enter a valid company or organisation name.";
    case "service":
      return serviceOptions.some((option) => option.value === trimmed)
        ? undefined
        : "Select a required service.";
    case "message":
      return trimmed.length >= 20
        ? undefined
        : "Enter at least 20 characters about your requirement.";
    default:
      return undefined;
  }
}

export function validateContactSubmission(
  values: ContactSubmissionInput,
  serviceOptions: readonly ContactFormOption[],
): ContactSubmissionErrors {
  return {
    fullName: validateContactField("fullName", values.fullName, serviceOptions),
    email: validateContactField("email", values.email, serviceOptions),
    phone: validateContactField("phone", values.phone, serviceOptions),
    companyName: validateContactField("companyName", values.companyName, serviceOptions),
    service: validateContactField("service", values.service, serviceOptions),
    message: validateContactField("message", values.message, serviceOptions),
  };
}

export function hasContactSubmissionErrors(errors: ContactSubmissionErrors) {
  return Object.values(errors).some((value) => Boolean(value));
}

export function toSerializableContactSubmissionErrors(errors: ContactSubmissionErrors) {
  return Object.fromEntries(
    Object.entries(errors).filter(([, value]) => Boolean(value)),
  ) as Partial<Record<ContactSubmissionField, string>>;
}
