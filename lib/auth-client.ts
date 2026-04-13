// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined"
        ? window.location.origin   // same origin → cookies just work
        : "http://localhost:3000",
});