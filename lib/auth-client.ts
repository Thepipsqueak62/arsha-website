// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    // ✅ This should be your Render backend URL in production
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001",
    plugins: [emailOTPClient()],

    // ✅ Add these for cross-domain cookie support
    credentials: 'include',  // Required for cookies
});

export const authUtils = {
    async isAuthenticated() {
        try {
            const { data } = await authClient.getSession();
            return !!data?.user;
        } catch {
            return false;
        }
    },

    async getValidSession() {
        try {
            const { data } = await authClient.getSession();

            if (!data?.user || !data?.session) {
                return null;
            }

            // Check expiration
            const expiresAt = new Date(data.session.expiresAt);
            if (expiresAt < new Date()) {
                await this.signOut();
                return null;
            }

            return data;
        } catch {
            return null;
        }
    },

    async ensureValidSession() {
        const session = await this.getValidSession();
        if (!session) {
            // ✅ Use window.location for client-side redirect
            if (typeof window !== 'undefined') {
                window.location.href = "/arsha/sign-in";
            }
            return null;
        }
        return session;
    },

    async signOut() {
        try {
            await authClient.signOut();
            // Clear any local storage/cookies
            if (typeof window !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
            }
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }
};