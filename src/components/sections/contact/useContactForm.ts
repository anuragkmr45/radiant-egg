"use client";

import { useState, type FormEvent } from "react";

import {
  defaultContactSubmissionErrors,
  defaultContactSubmissionValues,
  hasContactSubmissionErrors,
  type ContactSubmissionErrors,
  type ContactSubmissionField,
  validateContactField,
  validateContactSubmission,
} from "@/lib/contact-submission";
import type { ContactFormOption } from "@/types/content";
type ContactFormStatus = "idle" | "submitting" | "success";

export function useContactForm(serviceOptions: readonly ContactFormOption[]) {
  const [values, setValues] = useState(defaultContactSubmissionValues);
  const [errors, setErrors] = useState<ContactSubmissionErrors>(defaultContactSubmissionErrors);
  const [touched, setTouched] = useState<Record<ContactSubmissionField, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    companyName: false,
    service: false,
    message: false,
  });
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(field: ContactSubmissionField, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setFeedback("");

    if (touched[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateContactField(field, value, serviceOptions),
      }));
    }
  }

  function blurField(field: ContactSubmissionField) {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));

    setErrors((current) => ({
      ...current,
      [field]: validateContactField(field, values[field], serviceOptions),
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>, successMessage: string) {
    event.preventDefault();

    const nextErrors = validateContactSubmission(values, serviceOptions);
    const hasErrors = hasContactSubmissionErrors(nextErrors);

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      companyName: true,
      service: true,
      message: true,
    });
    setErrors(nextErrors);

    if (hasErrors) {
      setStatus("idle");
      setFeedback("Please correct the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          ...values,
          sourcePath: window.location.pathname,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            errors?: Partial<Record<ContactSubmissionField, string>>;
            message?: string;
          }
        | null;

      if (!response.ok) {
        if (payload?.errors) {
          setErrors((current) => ({
            ...current,
            ...payload.errors,
          }));
        }

        setStatus("idle");
        setFeedback(payload?.message ?? "Unable to submit your enquiry right now. Please try again shortly.");
        return;
      }

      setStatus("success");
      setFeedback(payload?.message ?? successMessage);
      setValues(defaultContactSubmissionValues);
      setErrors(defaultContactSubmissionErrors);
      setTouched({
        fullName: false,
        email: false,
        phone: false,
        companyName: false,
        service: false,
        message: false,
      });
    } catch {
      setStatus("idle");
      setFeedback("Unable to submit your enquiry right now. Please try again shortly.");
    }
  }

  return {
    values,
    errors,
    touched,
    status,
    feedback,
    updateField,
    blurField,
    submit,
  };
}
