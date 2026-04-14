// components/SignOutButton.tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    async function handleSignOut() {
        await authClient.signOut();
        router.push("/dev-route");
    }

    return (
        <button onClick={handleSignOut}>
            Sign out
        </button>
    );
}