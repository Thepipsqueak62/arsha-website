"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        try {
            await authClient.signOut();

            // force refresh session state
            router.refresh();

            // then redirect
            router.push("/arsha/sign-in");
        } catch (err) {
            console.error("Sign out failed:", err);
        }
    }

    return (
        <button onClick={handleSignOut}>
            Sign out
        </button>
    );
}