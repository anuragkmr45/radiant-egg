import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { buttonClassName } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <PageContainer>
      <section className="not-found-shell">
        <p className="status-pill">404</p>
        <h1 className="display-title">The requested route is not part of this build.</h1>
        <p className="lead">
          Only the approved marketing routes are live right now. Unmatched URLs fall
          back to this shared not-found experience.
        </p>
        <Link className={buttonClassName("primary")} href="/">
          Return home
        </Link>
      </section>
    </PageContainer>
  );
}
