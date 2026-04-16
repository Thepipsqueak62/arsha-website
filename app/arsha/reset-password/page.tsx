// app/arsha/reset-password/page.tsx
"use client";
import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Icons
import {
    Mail,
    KeyRound,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    ShieldCheck,
    Sparkles
} from "lucide-react";

function ResetForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        const savedEmail = sessionStorage.getItem("resetEmail");
        if (savedEmail) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEmail(savedEmail);
        }
    }, []);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Password strength calculation
    const getPasswordStrength = (pwd: string): number => {
        let strength = 0;
        if (pwd.length >= 8) strength += 25;
        if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength += 25;
        if (pwd.match(/\d/)) strength += 25;
        if (pwd.match(/[^a-zA-Z\d]/)) strength += 25;
        return strength;
    };

    const passwordStrength = getPasswordStrength(password);
    const getStrengthColor = (strength: number) => {
        if (strength <= 25) return "bg-destructive";
        if (strength <= 50) return "bg-yellow-500";
        if (strength <= 75) return "bg-blue-500";
        return "bg-green-500";
    };
    const getStrengthText = (strength: number) => {
        if (strength <= 25) return "Weak";
        if (strength <= 50) return "Fair";
        if (strength <= 75) return "Good";
        return "Strong";
    };

    async function handleReset() {
        if (!email || !otp || !password) {
            setStatus({ type: "error", message: "All fields are required" });
            return;
        }

        if (password !== confirmPassword) {
            setStatus({ type: "error", message: "Passwords do not match" });
            return;
        }

        if (password.length < 8) {
            setStatus({ type: "error", message: "Password must be at least 8 characters" });
            return;
        }

        if (passwordStrength < 50) {
            setStatus({ type: "error", message: "Please choose a stronger password" });
            return;
        }

        setLoading(true);
        setStatus(null);

        const { error } = await authClient.emailOtp.resetPassword({
            email,
            otp,
            password,
        });

        if (error) {
            setStatus({ type: "error", message: error.message || "Failed to reset password" });
        } else {
            setStatus({
                type: "success",
                message: "Password reset successfully! Redirecting to sign in..."
            });
            sessionStorage.removeItem("resetEmail");
            setTimeout(() => router.push("/arsha/sign-in"), 2000);
        }
        setLoading(false);
    }

    async function handleResend() {
        if (!email) {
            setStatus({ type: "error", message: "Please enter your email" });
            return;
        }

        setLoading(true);
        setStatus(null);

        const { error } = await authClient.emailOtp.requestPasswordReset({ email });

        if (error) {
            setStatus({ type: "error", message: error.message || "Failed to resend code" });
        } else {
            setStatus({ type: "success", message: "New reset code sent to your email!" });
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
            {/* Animated background */}
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
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="mx-auto mb-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                                    <ShieldCheck className="h-8 w-8 text-primary-foreground" />
                                </div>
                            </div>
                        </motion.div>

                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-base">
                            Enter the reset code and your new password
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <AnimatePresence mode="wait">
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
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

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className="pl-10"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                {email && (
                                    <Badge variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2">
                                        From Session
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* OTP Field */}
                        <div className="space-y-2">
                            <Label htmlFor="otp" className="flex items-center gap-2">
                                <KeyRound className="h-4 w-4" />
                                Reset Code
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
                                    className="pl-10 text-center text-2xl tracking-[0.5em] font-mono"
                                />
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    className="pl-10 pr-10"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            {password && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-1"
                                >
                                    <div className="flex items-center justify-between">
                                        <Progress value={passwordStrength} className={`h-2 ${getStrengthColor(passwordStrength)}`} />
                                        <span className="text-xs text-muted-foreground ml-2 min-w-[45px]">
                                            {getStrengthText(passwordStrength)}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={loading}
                                    className="pl-10 pr-10"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            {password && confirmPassword && (
                                <div className="flex items-center gap-1">
                                    {password === confirmPassword ? (
                                        <>
                                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                                            <span className="text-xs text-green-500">Passwords match</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="h-3 w-3 text-destructive" />
                                            <span className="text-xs text-destructive">Passwords don&#39;t match</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <Button
                                onClick={handleReset}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Resetting...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                        Reset Password
                                    </>
                                )}
                            </Button>

                            <Button
                                onClick={handleResend}
                                disabled={loading || resendCooldown > 0}
                                variant="outline"
                                className="w-full"
                            >
                                {resendCooldown > 0 ? (
                                    <>Resend in {resendCooldown}s</>
                                ) : (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Resend Code
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-center pb-6">
                        <motion.div
                            whileHover={{ x: -5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/arsha/sign-in")}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Sign In
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    Need help?{" "}
                    <Link href="/support" className="text-primary hover:underline">
                        Contact Support
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </motion.div>
            </div>
        }>
            <ResetForm />
        </Suspense>
    );
}