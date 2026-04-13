"use client";

import { useEffect } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { buttonClassName } from "@/components/ui/ButtonLink";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer>
      <section className="error-shell" aria-live="polite">
        <p className="status-pill">Unexpected error</p>
        <h1 className="display-title">The route shell hit an unexpected runtime error.</h1>
        <p className="lead">
          The shared shell includes an App Router error boundary so richer route work
          can be added without losing a safe recovery path.
        </p>
        <button className={buttonClassName("primary")} onClick={() => unstable_retry()}>
          Try again
        </button>
      </section>
    </PageContainer>
  );
}
