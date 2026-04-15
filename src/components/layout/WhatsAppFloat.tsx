import type { WhatsAppConfig } from "@/types/site";

interface WhatsAppFloatProps {
  config: WhatsAppConfig;
}

function sanitizeWhatsAppPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function buildWhatsAppHref(phone: string, message: string) {
  const sanitizedPhone = sanitizeWhatsAppPhone(phone);

  if (sanitizedPhone.length < 8) {
    return null;
  }

  const trimmedMessage = message.trim();
  const baseUrl = `https://wa.me/${sanitizedPhone}`;

  return trimmedMessage
    ? `${baseUrl}?text=${encodeURIComponent(trimmedMessage)}`
    : baseUrl;
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="whatsapp-float__icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.1c-4.92 0-8.9 3.9-8.9 8.71 0 1.7.5 3.37 1.43 4.8L3.1 20.9l4.45-1.38A9.03 9.03 0 0 0 12 20.53c4.92 0 8.9-3.9 8.9-8.72 0-4.8-3.98-8.7-8.9-8.7Z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M12 4.75c-3.97 0-7.2 3.15-7.2 7.06 0 1.43.43 2.82 1.25 4.01l-.82 2.42 2.52-.78A7.3 7.3 0 0 0 12 18.86c3.97 0 7.2-3.16 7.2-7.05 0-3.91-3.23-7.06-7.2-7.06Zm0 12.64a5.98 5.98 0 0 1-3.16-.9l-.23-.14-1.5.46.49-1.45-.15-.24a5.8 5.8 0 0 1-.9-3.11c0-3.05 2.53-5.54 5.64-5.54 3.12 0 5.64 2.49 5.64 5.54 0 3.06-2.52 5.55-5.64 5.55Z"
        fill="currentColor"
      />
      <path
        d="M9.62 8.7c-.17-.38-.34-.38-.5-.39h-.44c-.15 0-.39.05-.6.27-.2.22-.77.74-.77 1.81 0 1.07.8 2.1.92 2.24.11.14 1.56 2.47 3.88 3.36 1.92.74 2.32.59 2.74.55.42-.04 1.36-.55 1.55-1.09.2-.53.2-.99.14-1.08-.05-.09-.2-.14-.42-.25-.22-.1-1.36-.66-1.57-.74-.2-.07-.35-.1-.49.1-.15.22-.57.74-.7.89-.13.14-.26.16-.48.05-.22-.1-.93-.34-1.78-1.1-.66-.58-1.1-1.29-1.23-1.5-.13-.21-.01-.32.1-.43.11-.1.22-.26.33-.39.11-.12.14-.21.22-.35.08-.14.04-.27-.01-.38-.06-.1-.49-1.17-.69-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppFloat({ config }: WhatsAppFloatProps) {
  const href = config.enabled ? buildWhatsAppHref(config.phone, config.message) : null;

  if (!href) {
    return null;
  }

  return (
    <a
      aria-label={config.ariaLabel}
      className="whatsapp-float"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <WhatsAppIcon />
    </a>
  );
}
