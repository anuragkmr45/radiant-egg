"use client";

import { ChevronDown, ArrowRight } from "lucide-react";

import { useContactForm } from "@/components/sections/contact/useContactForm";
import type { ContactFormContent } from "@/types/content";

interface ContactFormProps {
  content: ContactFormContent;
}

export function ContactForm({ content }: ContactFormProps) {
  const form = useContactForm(content.serviceOptions);

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={(event) => void form.submit(event, content.successMessage)}
    >
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-full-name">
            Full Name *
          </label>
          <input
            aria-describedby="contact-full-name-error"
            aria-invalid={Boolean(form.errors.fullName)}
            autoComplete="name"
            className="contact-form__control"
            id="contact-full-name"
            name="fullName"
            onBlur={() => form.blurField("fullName")}
            onChange={(event) => form.updateField("fullName", event.target.value)}
            placeholder="Your name"
            type="text"
            value={form.values.fullName}
          />
          <p className="contact-form__error" id="contact-full-name-error">
            {form.errors.fullName ?? ""}
          </p>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-email">
            Email Address *
          </label>
          <input
            aria-describedby="contact-email-error"
            aria-invalid={Boolean(form.errors.email)}
            autoComplete="email"
            className="contact-form__control"
            id="contact-email"
            name="email"
            onBlur={() => form.blurField("email")}
            onChange={(event) => form.updateField("email", event.target.value)}
            placeholder="you@company.com"
            type="email"
            value={form.values.email}
          />
          <p className="contact-form__error" id="contact-email-error">
            {form.errors.email ?? ""}
          </p>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-phone">
            Phone Number
          </label>
          <input
            aria-describedby="contact-phone-error"
            aria-invalid={Boolean(form.errors.phone)}
            autoComplete="tel"
            className="contact-form__control"
            id="contact-phone"
            inputMode="tel"
            name="phone"
            onBlur={() => form.blurField("phone")}
            onChange={(event) => form.updateField("phone", event.target.value)}
            placeholder="+91 XXXXX XXXXX"
            type="tel"
            value={form.values.phone}
          />
          <p className="contact-form__error" id="contact-phone-error">
            {form.errors.phone ?? ""}
          </p>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-service">
            {content.serviceLabel}
          </label>
          <div className="contact-form__select-wrap">
            <select
              aria-describedby="contact-service-error"
              aria-invalid={Boolean(form.errors.service)}
              className="contact-form__control contact-form__control--select"
              id="contact-service"
              name="service"
              onBlur={() => form.blurField("service")}
              onChange={(event) => form.updateField("service", event.target.value)}
              value={form.values.service}
            >
              <option value="">{content.servicePlaceholder}</option>
              {content.serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="contact-form__select-icon" size={16} />
          </div>
          <p className="contact-form__error" id="contact-service-error">
            {form.errors.service ?? ""}
          </p>
        </div>
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-message">
          Message *
        </label>
        <textarea
          aria-describedby="contact-message-error"
          aria-invalid={Boolean(form.errors.message)}
          className="contact-form__control contact-form__control--textarea"
          id="contact-message"
          name="message"
          onBlur={() => form.blurField("message")}
          onChange={(event) => form.updateField("message", event.target.value)}
          placeholder="Describe your project requirement or enquiry..."
          rows={5}
          value={form.values.message}
        />
        <p className="contact-form__error" id="contact-message-error">
          {form.errors.message ?? ""}
        </p>
      </div>

      <button
        className="contact-form__submit"
        disabled={form.status === "submitting"}
        type="submit"
      >
        <span>{form.status === "submitting" ? "Submitting..." : content.submitLabel}</span>
        <ArrowRight aria-hidden="true" size={16} />
      </button>

      <div
        aria-live="polite"
        className={form.status === "success" ? "contact-form__feedback contact-form__feedback--success" : "contact-form__feedback"}
        role="status"
      >
        {form.feedback}
      </div>
    </form>
  );
}
