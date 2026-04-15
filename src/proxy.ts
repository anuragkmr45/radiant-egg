import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, sanitizeAdminRedirect, verifyAdminSession } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const isAuthenticated = verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    const redirectTo = sanitizeAdminRedirect(`${pathname}${nextUrl.search}`);

    if (redirectTo !== "/admin") {
      loginUrl.searchParams.set("redirectTo", redirectTo);
    }

    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/admin/index.html" && process.env.NODE_ENV === "production") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
