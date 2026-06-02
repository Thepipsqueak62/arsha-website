// app/layout.tsx  (Next.js)
"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function TestPage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    async function handleSignUp() {
        const { error } = await authClient.signUp.email({ email, password, name: email });
        setStatus(error ? `Sign up error: ${error.message}` : "Signed up!");
    }

    async function handleSignIn() {
        const { error } = await authClient.signIn.email({ email, password });
        if(error){
            setStatus(error ? `Sign in error: ${error.message}` : "Signed in!");
        }
        router.push("/arsha/verify-email")


    }

    async function handleSignOut() {
        await authClient.signOut();
        setStatus("Signed out");
    }

    return (
        <main style={{ padding: 40, fontFamily: "monospace" }}>
            <h1>Better Auth Test</h1>

            <section>
                <h2>Session</h2>
                {isPending ? (
                    <p>Loading...</p>
                ) : session ? (
                    <pre>{JSON.stringify(session.user, null, 2)}</pre>
                ) : (
                    <p>Not signed in</p>
                )}
            </section>

            <section style={{ marginTop: 24 }}>
                <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ display: "block", marginBottom: 8, padding: 6 }}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: "block", marginBottom: 8, padding: 6 }}
                />
                <button onClick={handleSignUp} style={{ marginRight: 8 }}>Sign Up</button>
                <button onClick={handleSignIn} style={{ marginRight: 8 }}>Sign In</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </section>

            {status && <p style={{ marginTop: 16, color: "teal" }}>{status}</p>}
        </main>
    );
}