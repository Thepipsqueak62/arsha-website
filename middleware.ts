// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only protect dashboard/app routes
    const isProtectedRoute = pathname.startsWith("/arsha/app");

    // Better Auth cookie (check your browser if unsure)
    const sessionCookie =
        req.cookies.get("better-auth.session_token") ||
        req.cookies.get("better-auth.session");

    if (isProtectedRoute && !sessionCookie) {
        const loginUrl = new URL("/arsha/sign-in", req.url);

        // preserve where user was going
        loginUrl.searchParams.set("from", pathname);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/arsha/app/:path*"],
};