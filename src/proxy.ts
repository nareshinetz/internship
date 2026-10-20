import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password");
  const isAdminRoute = pathname.startsWith("/admin");
  const isStudentRoute = pathname.startsWith("/student");
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding") ||
    isAdminRoute || isStudentRoute;

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && role !== "admin" && role !== "super_admin") return NextResponse.redirect(new URL("/dashboard", req.url));
  if (
  isStudentRoute &&
  role !== "student" &&
  role !== "admin" &&
  role !== "super_admin"
) {
  return NextResponse.redirect(new URL("/", req.url));
}

  if (isAuthRoute && token) {
    return NextResponse.redirect(
      new URL(role === "admin" || role === "super_admin" ? "/admin" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/admin/:path*",
    "/student/:path*",
    "/login",
    "/register",
  ],
};
