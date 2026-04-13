interface StructuredDataProps {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}

function sanitizeStructuredData(data: Record<string, unknown> | readonly Record<string, unknown>[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: sanitizeStructuredData(data) }}
      type="application/ld+json"
    />
  );
}
