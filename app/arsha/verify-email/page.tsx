// app/arsha/verify-email/page.tsx
"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Icons
import {
    Mail,
    KeyRound,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    ShieldCheck,
    Sparkles
} from "lucide-react";

function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        async function getEmail() {
            const urlEmail = searchParams.get("email");
            const storedEmail = sessionStorage.getItem("verifyEmail");
            const { data: session } = await authClient.getSession();

            const finalEmail = urlEmail || storedEmail || session?.user?.email || "";

            if (finalEmail) {
                setEmail(finalEmail);
                sessionStorage.setItem("verifyEmail", finalEmail);
            }

            if (session?.user?.emailVerified) {
                router.push("/arsha/app/dashboard");
            }
        }

        getEmail();
    }, [searchParams, router]);

    // Cooldown timer for resend
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    async function handleVerify() {
        if (!email || !otp) {
            setStatus({
                type: "error",
                message: "Please enter your email and the verification code"
            });
            return;
        }

        if (otp.length !== 6) {
            setStatus({
                type: "error",
                message: "Verification code must be 6 digits"
            });
            return;
        }

        setLoading(true);
        setStatus(null);

        const { error } = await authClient.emailOtp.verifyEmail({ email, otp });

        if (error) {
            setStatus({
                type: "error",
                message: error.message || "Invalid verification code"
            });
        } else {
            setStatus({
                type: "success",
                message: "Email verified successfully! Redirecting to dashboard..."
            });
            sessionStorage.removeItem("verifyEmail");
            setTimeout(() => router.push("/arsha/app/dashboard"), 2000);
        }
        setLoading(false);
    }

    async function handleResend() {
        if (!email) {
            setStatus({
                type: "error",
                message: "Email address is required"
            });
            return;
        }

        setLoading(true);
        setStatus(null);

        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "email-verification",
        });

        if (error) {
            setStatus({
                type: "error",
                message: error.message || "Failed to resend code"
            });
        } else {
            setStatus({
                type: "success",
                message: "New verification code sent to your email!"
            });
            setResendCooldown(60);
        }
        setLoading(false);
    }

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/50">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="border-2 shadow-2xl backdrop-blur-sm bg-background/95">
                    <CardHeader className="space-y-1 text-center pb-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.1
                            }}
                            className="mx-auto mb-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                                    <ShieldCheck className="h-8 w-8 text-primary-foreground" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Verify Your Email
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                We sent a verification code to
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <AnimatePresence mode="wait">
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Alert variant={status.type === "error" ? "destructive" : "default"}>
                                        {status.type === "success" ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                        ) : status.type === "error" ? (
                                            <AlertCircle className="h-4 w-4" />
                                        ) : (
                                            <Sparkles className="h-4 w-4" />
                                        )}
                                        <AlertDescription>{status.message}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                Email Address
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className="pl-10 bg-muted/50 border-2 focus:border-primary transition-colors"
                                    readOnly={!!searchParams.get("email")}
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                {email && (
                                    <Badge
                                        variant="secondary"
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        {searchParams.get("email") ? "From URL" : "Editable"}
                                    </Badge>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-2"
                        >
                            <Label htmlFor="otp" className="text-sm font-medium flex items-center gap-2">
                                <KeyRound className="h-4 w-4 text-muted-foreground" />
                                Verification Code
                            </Label>
                            <div className="relative">
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    maxLength={6}
                                    disabled={loading}
                                    className="pl-10 text-center text-2xl tracking-[0.5em] font-mono bg-muted/50 border-2 focus:border-primary transition-colors"
                                    autoFocus
                                />
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                            {otp.length > 0 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs text-muted-foreground text-center"
                                >
                                    {6 - otp.length} digits remaining
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3"
                        >
                            <Button
                                onClick={handleVerify}
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Verify Email
                                    </>
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Didn't receive the code?
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={handleResend}
                                disabled={loading || resendCooldown > 0}
                                variant="outline"
                                className="w-full border-2 hover:bg-muted/50 transition-all duration-300"
                                size="lg"
                            >
                                {resendCooldown > 0 ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Resend in {resendCooldown}s
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Resend Code
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </CardContent>

                    <CardFooter className="flex justify-center pb-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ x: -5 }}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/arsha/sign-in")}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Sign In
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>

                {/* Footer message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-xs text-muted-foreground mt-4"
                >
                    Protected by <span className="font-semibold">Better Auth</span> •
                    Verification code expires in 5 minutes
                </motion.p>
            </motion.div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading verification page...</p>
                </motion.div>
            </div>
        }>
            <VerifyEmailForm />
        </Suspense>
    );
}