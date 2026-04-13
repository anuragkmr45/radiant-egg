import { ExternalLink, MapPin } from "lucide-react";

import type { ContactLocationContent } from "@/types/content";

interface ContactMapCardProps {
  content: ContactLocationContent;
}

export function ContactMapCard({ content }: ContactMapCardProps) {
  const mapQuery = encodeURIComponent(content.mapQuery ?? content.address);
  const embedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className="contact-map">
      <div className="contact-map__frame">
        <a
          className="contact-map__link"
          href={content.openInMapsHref}
          rel="noreferrer"
          target="_blank"
        >
          <span>Open in Maps</span>
          <ExternalLink aria-hidden="true" size={16} />
        </a>
        <iframe
          className="contact-map__iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embedUrl}
          title={`Map for ${content.address}`}
        />
      </div>
      <div className="contact-map__address">
        <MapPin aria-hidden="true" size={16} />
        <span>{content.address}</span>
      </div>
    </div>
  );
}
