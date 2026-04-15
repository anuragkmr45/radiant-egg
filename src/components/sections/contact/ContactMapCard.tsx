import { MapPin } from "lucide-react";

import { marketingRevealStyle } from "@/lib/motion";
import type { ContactLocationContent } from "@/types/content";

interface ContactMapCardProps {
  content: ContactLocationContent;
}

export function ContactMapCard({ content }: ContactMapCardProps) {
  const mapQuery = encodeURIComponent(content.address.replace(/\s+/g, " ").trim());
  const embedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const openInMapsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="contact-map">
      <div
        className="contact-map__frame"
        data-marketing-reveal=""
        style={marketingRevealStyle(80)}
      >
        <a
          className="contact-map__link motion-link motion-link--text"
          href={openInMapsHref}
          rel="noreferrer"
          target="_blank"
        >
          <span>{content.mapLabel}</span>
        </a>
        <iframe
          className="contact-map__iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
          title={`Map for ${content.address}`}
        />
      </div>
      <div
        className="contact-map__address"
        data-marketing-reveal=""
        style={marketingRevealStyle(170)}
      >
        <MapPin aria-hidden="true" size={16} />
        <span>{content.address}</span>
      </div>
    </div>
  );
}
