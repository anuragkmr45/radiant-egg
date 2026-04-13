"use client";

import { useState, type FormEvent } from "react";

import type { ContactFormOption } from "@/types/content";

type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type ContactFormErrors = Record<keyof ContactFormValues, string | undefined>;
type ContactFormStatus = "idle" | "submitting" | "success";

const defaultValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const defaultErrors: ContactFormErrors = {
  fullName: undefined,
  email: undefined,
  phone: undefined,
  service: undefined,
  message: undefined,
};

function validateField(
  field: keyof ContactFormValues,
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
        return undefined;
      }

      return /^[+\d][\d\s()-]{8,}$/.test(trimmed)
        ? undefined
        : "Enter a valid phone number.";
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

function validateValues(
  values: ContactFormValues,
  serviceOptions: readonly ContactFormOption[],
): ContactFormErrors {
  return {
    fullName: validateField("fullName", values.fullName, serviceOptions),
    email: validateField("email", values.email, serviceOptions),
    phone: validateField("phone", values.phone, serviceOptions),
    service: validateField("service", values.service, serviceOptions),
    message: validateField("message", values.message, serviceOptions),
  };
}

export function useContactForm(serviceOptions: readonly ContactFormOption[]) {
  const [values, setValues] = useState<ContactFormValues>(defaultValues);
  const [errors, setErrors] = useState<ContactFormErrors>(defaultErrors);
  const [touched, setTouched] = useState<Record<keyof ContactFormValues, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    service: false,
    message: false,
  });
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setFeedback("");

    if (touched[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value, serviceOptions),
      }));
    }
  }

  function blurField(field: keyof ContactFormValues) {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));

    setErrors((current) => ({
      ...current,
      [field]: validateField(field, values[field], serviceOptions),
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>, successMessage: string) {
    event.preventDefault();

    const nextErrors = validateValues(values, serviceOptions);
    const hasErrors = Object.values(nextErrors).some((value) => Boolean(value));

    setTouched({
      fullName: true,
      email: true,
      phone: true,
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

    await new Promise((resolve) => {
      window.setTimeout(resolve, 600);
    });

    setStatus("success");
    setFeedback(successMessage);
    setValues(defaultValues);
    setErrors(defaultErrors);
    setTouched({
      fullName: false,
      email: false,
      phone: false,
      service: false,
      message: false,
    });
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
