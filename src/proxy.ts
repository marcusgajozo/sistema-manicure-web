import { type NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/common/lib/auth/constants";
import {
  APP_ROUTES,
  buildLoginPath,
  isPublicPath,
} from "@/common/lib/navigation/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(ACCESS_TOKEN_COOKIE);

  if (!isAuthenticated && !isPublicPath(pathname)) {
    return NextResponse.redirect(
      new URL(buildLoginPath(pathname), request.url),
    );
  }

  if (isAuthenticated && pathname === APP_ROUTES.login) {
    return NextResponse.redirect(new URL(APP_ROUTES.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
