// lib/auth-server.ts
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = cache(async () => {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:3001/api/auth/get-session", {
        headers: { cookie: cookieStore.toString() },
        cache: "no-store",
    });
    return res.json();
});

export async function requireAuth() {
    const session = await getSession();
    if (!session?.user) redirect("/login");
    return session;
}