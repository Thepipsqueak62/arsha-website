// app/arsha/sign-up/page.tsx - Clean version
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

import {
    FiUserPlus,
    FiMail,
    FiLock,
    FiUser,
    FiEye,
    FiEyeOff,
    FiArrowLeft,
    FiAlertCircle,
    FiLoader
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        if (passwordStrength < 50) {
            setError("Please choose a stronger password");
            return;
        }

        setError("");
        setLoading(true);

        const { error } = await authClient.signUp.email({ email, password, name });

        if (error) {
            setError(error.message ?? "Error signing up");
            setLoading(false);
            return;
        }

        sessionStorage.setItem("verifyEmail", email);
        router.push("/arsha/verify-email");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/50">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", damping: 15 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="border-2 shadow-2xl backdrop-blur-sm bg-background/95">
                    <CardHeader className="space-y-1 text-center pb-4">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                            className="mx-auto mb-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                                    <FiUserPlus className="h-8 w-8 text-primary-foreground" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Create Account
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                Join us today and start your journey
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                    >
                                        <Alert variant="destructive">
                                            <FiAlertCircle className="h-4 w-4" />
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                                    <FiUser className="h-4 w-4 text-muted-foreground" />
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={loading}
                                        required
                                        className="pl-10 bg-muted/50 border-2 focus:border-primary"
                                    />
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    {name && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            <HiSparkles className="h-4 w-4 text-primary animate-pulse" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                    <FiMail className="h-4 w-4 text-muted-foreground" />
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
                                        required
                                        className="pl-10 bg-muted/50 border-2 focus:border-primary"
                                    />
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                                    <FiLock className="h-4 w-4 text-muted-foreground" />
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        required
                                        className="pl-10 pr-10 bg-muted/50 border-2 focus:border-primary"
                                    />
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <FiEye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>

                                {password && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-1 pt-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Progress
                                                value={passwordStrength}
                                                className={`h-1.5 ${getStrengthColor(passwordStrength)}`}
                                            />
                                            <span className="text-xs text-muted-foreground ml-2 min-w-[45px]">
                                                {getStrengthText(passwordStrength)}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                                disabled={loading}
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <FiUserPlus className="mr-2 h-4 w-4" />
                                        Sign Up
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pb-6">
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/arsha/sign-in" className="text-primary hover:underline font-semibold">
                                Sign in
                            </Link>
                        </div>

                        <motion.div whileHover={{ x: -5 }} className="text-center">
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/")}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <FiArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                        </motion.div>
                    </CardFooter>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}