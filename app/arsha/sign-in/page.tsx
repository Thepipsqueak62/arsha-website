"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogIn } from "lucide-react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return; // ✅ prevent double submit

        setError("");
        setLoading(true);

        const { error } = await authClient.signIn.email({ email, password });

        if (error) {
            setError(error.message ?? "Invalid credentials");
            setLoading(false);
            return;
        }

        // ✅ NO getSession()

        const redirectTo =
            searchParams.get("from") ?? "/arsha/app/dashboard";

        router.push(redirectTo);
    };

    // animations unchanged
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };
    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
    };
    const cardVariants: Variants = {
        hidden: { scale: 0.9, opacity: 0, y: 30 },
        visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4"
        >
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
                <motion.div variants={cardVariants}>
                    <Card className="w-full shadow-xl rounded-2xl backdrop-blur-sm bg-background/95">
                        <CardHeader className="text-center">
                            <LogIn className="mx-auto mb-2" />
                            <CardTitle>Welcome back</CardTitle>
                            <CardDescription>Sign in to continue</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AnimatePresence>
                                    {error && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <Alert variant="destructive">
                                                <AlertDescription>{error}</AlertDescription>
                                            </Alert>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
                                </Button>

                                <div className="text-sm text-center">
                                    <Link href="/arsha/forgot-password">Forgot password?</Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}