// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001",
    plugins: [emailOTPClient()],
});

// ✅ Add client-side session utilities
export const authUtils = {
    // Check if user is authenticated on client
    async isAuthenticated() {
        try {
            const { data } = await authClient.getSession();
            return !!data?.user;
        } catch {
            return false;
        }
    },

    // Get session with validation
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

    // Refresh session if needed
    async ensureValidSession() {
        const session = await this.getValidSession();
        if (!session) {
            window.location.href = "/arsha/sign-in";
            return null;
        }
        return session;
    },

    // Sign out with cleanup
    async signOut() {
        try {
            await authClient.signOut();
            // Clear any local storage/cookies
            localStorage.clear();
            sessionStorage.clear();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }
};