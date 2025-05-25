import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import localConfig from "./config";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: localConfig.next_auth_secret as string,
    secureCookie: localConfig.NODE_ENV === "production"
  });

  // Protected routes
  const protectedRoutes = ["/admin"];

  const isProtectedRoute = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  // Redirect to login if protected route and no token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
