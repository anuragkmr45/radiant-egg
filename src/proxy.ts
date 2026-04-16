import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, sanitizeAdminRedirect, verifyAdminSession } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const isAuthenticated = verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  const isAdminStaticAsset =
    pathname.startsWith("/admin/") &&
    pathname !== "/admin/index.html" &&
    /\.[a-z0-9]+$/i.test(pathname);

  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (isAdminStaticAsset) {
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
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
