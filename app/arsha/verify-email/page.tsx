// app/arsha/verify-email/page.tsx
"use client";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function VerifyEmailForm() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Get email from sessionStorage
    useEffect(() => {
        const savedEmail = sessionStorage.getItem("verifyEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    async function handleVerify() {
        if (!email || !otp) {
            setStatus("Email and OTP are required");
            return;
        }

        setLoading(true);
        const { error } = await authClient.emailOtp.verifyEmail({ email, otp });

        if (error) {
            setStatus(`Error: ${error.message}`);
        } else {
            setStatus("✅ Email verified!");
            sessionStorage.removeItem("verifyEmail");
            setTimeout(() => router.push("/arsha/app/dashboard"), 1500);
        }
        setLoading(false);
    }

    async function handleResend() {
        if (!email) {
            setStatus("Email is required");
            return;
        }

        setLoading(true);
        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification",
        });

        setStatus(error ? `Error: ${error.message}` : "📧 New OTP sent!");
        setLoading(false);
    }

    return (
        <main style={{ padding: 40, fontFamily: "monospace", maxWidth: 400, margin: "0 auto" }}>
            <h1>Verify your email</h1>

            <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5 }}>Email:</label>
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4
                    }}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5 }}>OTP Code:</label>
                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
                <button
                    onClick={handleVerify}
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>

                <button
                    onClick={handleResend}
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#666",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    Resend OTP
                </button>
            </div>

            {status && (
                <p style={{
                    marginTop: 16,
                    padding: 10,
                    backgroundColor: status.includes("✅") ? "#e6ffe6" : "#fff3cd",
                    border: "1px solid " + (status.includes("✅") ? "#b3ffb3" : "#ffeaa7"),
                    borderRadius: 4
                }}>
                    {status}
                </p>
            )}
        </main>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailForm />
        </Suspense>
    );
}