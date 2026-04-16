// lib/auth-server.ts
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ✅ Get the backend URL from environment
const BACKEND_URL = process.env.BETTER_AUTH_URL || "http://localhost:3001";

export const getSession = cache(async () => {
    try {
        const cookieStore = await cookies();

        // ✅ Critical: Forward all cookies to the backend
        const cookieString = cookieStore.toString();

        const res = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
            headers: {
                'Cookie': cookieString,  // ✅ Case-sensitive header
                'Content-Type': 'application/json',
            },
            // ✅ Don't cache session data too aggressively
            cache: 'no-store',
            // ✅ Longer timeout for production
            signal: AbortSignal.timeout(10000),
        });

        if (!res.ok) {
            console.error('Session fetch failed:', res.status);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Session fetch error:', error);
        return null;
    }
});

export async function requireAuth(options?: {
    requireEmailVerified?: boolean;
    redirectTo?: string;
}) {
    const session = await getSession();

    if (!session?.user) {
        redirect(options?.redirectTo || "/arsha/sign-in");
    }

    if (options?.requireEmailVerified && !session.user.emailVerified) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL ||
            process.env.NEXTJS_URL ||
            "http://localhost:3000";

        const verifyUrl = new URL("/arsha/verify-email", baseUrl);
        verifyUrl.searchParams.set("email", session.user.email);
        redirect(verifyUrl.toString());
    }

    return session;
}