import React from 'react';
import SignOutButton from "@/components/SignOutBtn";
import { requireAuth } from "@/lib/auth-server";


export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const session = await requireAuth({
        requireEmailVerified: true,
    });

    return (
        <main className="max-w-2xl mx-auto px-6 py-16">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-500">Welcome back, {session.user.name}</p>
            <SignOutButton/>
        </main>
    );
}




