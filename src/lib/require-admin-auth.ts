import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_SESSION_COOKIE, sanitizeAdminRedirect, verifyAdminSession } from "@/lib/admin-auth";

export async function requireAdminAuth(redirectTo: string) {
  const cookieStore = await cookies();
  const isAuthenticated = verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!isAuthenticated) {
    redirect(`/admin/login?redirectTo=${encodeURIComponent(sanitizeAdminRedirect(redirectTo))}`);
  }
}
