"use client";

import { ChevronDown, ArrowRight } from "lucide-react";

import { useContactForm } from "@/components/sections/contact/useContactForm";
import { marketingRevealStyle } from "@/lib/motion";
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
      <div
        className="contact-form__grid motion-sequence"
        data-marketing-reveal=""
        style={marketingRevealStyle(80)}
      >
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-full-name">
            {content.fullNameLabel}
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
            placeholder={content.fullNamePlaceholder}
            type="text"
            value={form.values.fullName}
          />
          <p className="contact-form__error" id="contact-full-name-error">
            {form.errors.fullName ?? ""}
          </p>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-email">
            {content.emailLabel}
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
            placeholder={content.emailPlaceholder}
            type="email"
            value={form.values.email}
          />
          <p className="contact-form__error" id="contact-email-error">
            {form.errors.email ?? ""}
          </p>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-phone">
            {content.phoneLabel}
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
            placeholder={content.phonePlaceholder}
            type="tel"
            value={form.values.phone}
          />
          <p className="contact-form__error" id="contact-phone-error">
            {form.errors.phone ?? ""}
          </p>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-company-name">
            {content.companyNameLabel}
          </label>
          <input
            aria-describedby="contact-company-name-error"
            aria-invalid={Boolean(form.errors.companyName)}
            autoComplete="organization"
            className="contact-form__control"
            id="contact-company-name"
            name="companyName"
            onBlur={() => form.blurField("companyName")}
            onChange={(event) => form.updateField("companyName", event.target.value)}
            placeholder={content.companyNamePlaceholder}
            type="text"
            value={form.values.companyName}
          />
          <p className="contact-form__error" id="contact-company-name-error">
            {form.errors.companyName ?? ""}
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

      <div
        className="contact-form__field"
        data-marketing-reveal=""
        style={marketingRevealStyle(170)}
      >
        <label className="contact-form__label" htmlFor="contact-message">
          {content.messageLabel}
        </label>
        <textarea
          aria-describedby="contact-message-error"
          aria-invalid={Boolean(form.errors.message)}
          className="contact-form__control contact-form__control--textarea"
          id="contact-message"
          name="message"
          onBlur={() => form.blurField("message")}
          onChange={(event) => form.updateField("message", event.target.value)}
          placeholder={content.messagePlaceholder}
          rows={5}
          value={form.values.message}
        />
        <p className="contact-form__error" id="contact-message-error">
          {form.errors.message ?? ""}
        </p>
      </div>

      <button
        className="contact-form__submit"
        data-marketing-reveal=""
        disabled={form.status === "submitting"}
        style={marketingRevealStyle(250)}
        type="submit"
      >
        <span>{form.status === "submitting" ? "Submitting..." : content.submitLabel}</span>
        <ArrowRight aria-hidden="true" size={16} />
      </button>

      <div
        aria-live="polite"
        className={form.status === "success" ? "contact-form__feedback contact-form__feedback--success" : "contact-form__feedback"}
        data-marketing-reveal=""
        role="status"
        style={marketingRevealStyle(320)}
      >
        {form.feedback}
      </div>
    </form>
  );
}
