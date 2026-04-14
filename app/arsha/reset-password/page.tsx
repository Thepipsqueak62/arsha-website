// app/arsha/reset-password/page.tsx
"use client";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function ResetForm() {
    const router = useRouter();

    // ✅ Read email from sessionStorage instead of URL
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Get email from sessionStorage on mount
    useEffect(() => {
        const savedEmail = sessionStorage.getItem("resetEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            // Optional: Clear after reading
            // sessionStorage.removeItem("resetEmail");
        }
    }, []);

    async function handleReset() {
        if (!email || !otp || !password) {
            setStatus("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setStatus("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setStatus("Password must be at least 8 characters");
            return;
        }

        setLoading(true);
        setStatus("");

        const { error } = await authClient.emailOtp.resetPassword({
            email,
            otp,
            password,
        });

        if (error) {
            setStatus(`Error: ${error.message}`);
        } else {
            setStatus("✅ Password reset successfully! Redirecting to sign in...");
            // ✅ Clear the stored email
            sessionStorage.removeItem("resetEmail");
            setTimeout(() => router.push("/arsha/sign-in"), 2000);
        }
        setLoading(false);
    }

    async function handleResend() {
        if (!email) {
            setStatus("Please enter your email");
            return;
        }

        setLoading(true);
        setStatus("");

        const { error } = await authClient.emailOtp.requestPasswordReset({
            email
        });

        if (error) {
            setStatus(`Error: ${error.message}`);
        } else {
            setStatus("📧 New OTP sent!");
        }
        setLoading(false);
    }

    return (
        <main style={{ padding: 40, fontFamily: "monospace", maxWidth: 400, margin: "0 auto" }}>
            <h1>Reset Password</h1>

            <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5 }}>Email:</label>
                <input
                    type="email"
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

            <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5 }}>New Password:</label>
                <input
                    type="password"
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4
                    }}
                />
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 5 }}>Confirm Password:</label>
                <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4
                    }}
                />
            </div>

            <button
                onClick={handleReset}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    marginBottom: 10,
                    cursor: loading ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "Processing..." : "Reset Password"}
            </button>

            <button
                onClick={handleResend}
                disabled={loading}
                style={{
                    width: "100%",
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

            {status && (
                <p style={{
                    marginTop: 20,
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetForm />
        </Suspense>
    );
}