// app/dashboard/layout.tsx
"use client";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import SignOutButton from "@/components/SignOutBtn";

export default function Dashboard() {
    const { session, isPending } = useRequireAuth();

    if (isPending || !session) return null;

    return (
        <main className="max-w-2xl mx-auto px-6 py-16">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-500">Welcome back, {session.user.name}</p>
            <SignOutButton/>
        </main>
    );
}