import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminSessionMaxAge,
  isAdminAuthConfigured,
  sanitizeAdminRedirect,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = sanitizeAdminRedirect(String(formData.get("redirectTo") ?? "/admin"));
  const loginUrl = new URL("/admin/login", request.url);
  const cookieStore = await cookies();

  if (!isAdminAuthConfigured()) {
    loginUrl.searchParams.set("error", "missing_config");

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  if (!verifyAdminCredentials(email, password)) {
    loginUrl.searchParams.set("error", "invalid_credentials");

    if (redirectTo !== "/admin") {
      loginUrl.searchParams.set("redirectTo", redirectTo);
    }

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  cookieStore.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSession(email),
    httpOnly: true,
    maxAge: getAdminSessionMaxAge(),
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(new URL(redirectTo, request.url), { status: 303 });
}
