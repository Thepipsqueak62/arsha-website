// lib/auth-server.ts
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = cache(async () => {
    try {
        const cookieStore = await cookies();

        // ✅ FIX: Provide fallback URL
        const authUrl = process.env.BETTER_AUTH_URL || "http://localhost:3001";

        const res = await fetch(`${authUrl}/api/auth/get-session`, {
            headers: {
                cookie: cookieStore.toString(),
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 },
            // ✅ Add error handling for network issues
            signal: AbortSignal.timeout(5000), // 5 second timeout
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

export async function requireAuth() {
    const session = await getSession();
    if (!session?.user) {
        redirect("/arsha/sign-in");
    }
    return session;
}