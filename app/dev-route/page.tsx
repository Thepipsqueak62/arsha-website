"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function TestPage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        setLoading(true);
        setStatus("");

        const { error } = await authClient.signUp.email({
            email,
            password,
            name: email.split('@')[0]
        });

        if (error) {
            setStatus(`Sign up error: ${error.message}`);
        } else {
            setStatus("✅ Signed up! OTP sent to your email. Redirecting to verification...");
            setTimeout(() => {
                router.push(`/verify-email?email=${encodeURIComponent(email)}`);
            }, 1500);
        }
        setLoading(false);
    }

    async function handleSignIn() {
        setLoading(true);
        setStatus("");

        const { error } = await authClient.signIn.email({ email, password });

        if (error) {
            setStatus(`Sign in error: ${error.message}`);
        } else {
            setStatus("✅ Signed in successfully!");
        }
        setLoading(false);
    }

    async function handleSignOut() {
        await authClient.signOut();
        setStatus("Signed out");
    }

    return (
        <main style={{ padding: 40, fontFamily: "monospace", maxWidth: 400, margin: "0 auto" }}>
            <h1>Better Auth Test</h1>

            <section style={{ marginBottom: 30 }}>
                <h2>Session</h2>
                {isPending ? (
                    <p>Loading...</p>
                ) : session ? (
                    <div>
                        <pre style={{
                            backgroundColor: "#f5f5f5",
                            padding: 10,
                            borderRadius: 4,
                            overflow: "auto"
                        }}>
                            {JSON.stringify(session.user, null, 2)}
                        </pre>
                        {!session.user.emailVerified && (
                            <p style={{ color: "orange" }}>
                                ⚠️ Email not verified.
                                <Link href="/arsha/verify-email" style={{ marginLeft: 5, color: "#0070f3" }}>
                                    Verify now
                                </Link>
                            </p>
                        )}
                    </div>
                ) : (
                    <p>Not signed in</p>
                )}
            </section>

            {!session ? (
                <section>
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

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: "block", marginBottom: 5 }}>Password:</label>
                        <input
                            type="password"
                            placeholder="Your password"
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

                    <button
                        onClick={handleSignUp}
                        disabled={loading}
                        style={{
                            marginRight: 8,
                            padding: "10px 20px",
                            backgroundColor: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={handleSignIn}
                        disabled={loading}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        Sign In
                    </button>

                    <div style={{ marginTop: 20 }}>
                        <Link href="/arsha/forgot-password" style={{ color: "#0070f3" }}>
                            Forgot password?
                        </Link>
                    </div>
                </section>
            ) : (
                <button
                    onClick={handleSignOut}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer"
                    }}
                >
                    Sign Out
                </button>
            )}

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