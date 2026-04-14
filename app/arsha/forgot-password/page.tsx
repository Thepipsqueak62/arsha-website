// app/forgot-password/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    async function handleRequest() {
        const { error } = await authClient.emailOtp.requestPasswordReset({ email });
        if (error) return setStatus(`Error: ${error.message}`);
        // Pass email via query param to the reset page
        sessionStorage.setItem("resetEmail", email);
        router.push("/arsha/reset-password");
    }

    return (
        <main style={{ padding: 40, fontFamily: "monospace" }}>
            <h1>Forgot Password</h1>
            <input
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: 8, padding: 6 }}
            />
            <button onClick={handleRequest}>Send Reset OTP</button>
            {status && <p style={{ marginTop: 16, color: "teal" }}>{status}</p>}
        </main>
    );
}