// app/verify-email/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    async function handleVerify() {
        const { error } = await authClient.emailOtp.verifyEmail({ email, otp });
        if (error) return setStatus(`Error: ${error.message}`);
        setStatus("Email verified!");
        router.push("/dashboard");
    }

    async function handleResend() {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification",
        });
        setStatus(error ? `Error: ${error.message}` : "OTP resent!");
    }

    return (
        <main style={{ padding: 40, fontFamily: "monospace" }}>
            <h1>Verify your email</h1>
            <input
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: 8, padding: 6 }}
            />
            <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ display: "block", marginBottom: 8, padding: 6 }}
            />
            <button onClick={handleVerify} style={{ marginRight: 8 }}>Verify</button>
            <button onClick={handleResend}>Resend OTP</button>
            {status && <p style={{ marginTop: 16, color: "teal" }}>{status}</p>}
        </main>
    );
}