"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        // Only runs if signout succeeded on the server
                        window.dispatchEvent(new Event("auth:signout"));
                        router.push("/");
                    },
                    onError: (ctx) => {
                        console.error("Sign out failed:", ctx.error);
                    }
                }
            });
        } catch (err) {
            console.error("Sign out error:", err);
            // Still clear local state even if server call fails
            window.dispatchEvent(new Event("auth:signout"));
            router.push("/");
        }
    }

    return (
        <button onClick={handleSignOut}>
            Sign out
        </button>
    );
}