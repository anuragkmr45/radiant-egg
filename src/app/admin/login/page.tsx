import type { Metadata } from "next";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { isAdminAuthConfigured, sanitizeAdminRedirect } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "RECPL Admin Login",
};

function getErrorCopy(error: string | string[] | undefined) {
  if (error === "missing_config") {
    return "Admin credentials are not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in the environment.";
  }

  if (error === "invalid_credentials") {
    return "The email or password is incorrect.";
  }

  return null;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[]; redirectTo?: string | string[] }>;
}) {
  const { error, redirectTo } = await searchParams;
  const safeRedirectTo = sanitizeAdminRedirect(
    typeof redirectTo === "string" ? redirectTo : Array.isArray(redirectTo) ? redirectTo[0] : undefined,
  );
  const errorCopy = getErrorCopy(error);

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <div className="admin-auth-card__header">
          <BrandLogo className="admin-auth-card__logo" variant="full" />
          <p className="admin-panel__eyebrow">RECPL Admin</p>
          <h1 className="admin-panel__title">Sign in</h1>
          <p className="admin-panel__description">
            Use your configured admin email and password to access the protected dashboard.
          </p>
        </div>

        {!isAdminAuthConfigured() ? (
          <div className="admin-panel__empty admin-panel__empty--compact">
            <h2>Credentials missing</h2>
            <p>Set <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> before using the admin login.</p>
          </div>
        ) : (
          <form action="/api/admin/session" className="admin-auth-form" method="post">
            <input name="redirectTo" type="hidden" value={safeRedirectTo} />

            <label className="admin-auth-form__field">
              <span>Email</span>
              <input
                autoComplete="email"
                className="admin-auth-form__control"
                name="email"
                placeholder="admin@example.com"
                required
                type="email"
              />
            </label>

            <label className="admin-auth-form__field">
              <span>Password</span>
              <input
                autoComplete="current-password"
                className="admin-auth-form__control"
                name="password"
                placeholder="Enter password"
                required
                type="password"
              />
            </label>

            {errorCopy ? <p className="admin-auth-form__error">{errorCopy}</p> : null}

            <button className="admin-auth-form__submit" type="submit">
              Login
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
