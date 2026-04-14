"use client";

import * as React from "react";
import { useState, type FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {motion, AnimatePresence, Variants} from "framer-motion";
import { signin } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogIn } from "lucide-react";

// Define error response type
interface ErrorResponse {
    response?: {
        data?: {
            error?: string;
        };
    };
}

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signin(email, password);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);

            router.push("/dashboard");
        } catch (err: unknown) {
            const error = err as ErrorResponse;
            setError(error.response?.data?.error || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { scale: 0.9, opacity: 0, y: 30 },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15,
                duration: 0.6
            }
        },
        exit: {
            scale: 0.9,
            opacity: 0,
            y: -30,
            transition: {
                duration: 0.3
            }
        }
    };

    const iconVariants: Variants = {
        hidden: { rotate: -180, scale: 0 },
        visible: {
            rotate: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.1
            }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const buttonVariants: Variants = {
        idle: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    const linkVariants: Variants = {
        hover: {
            x: 5,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    const errorVariants: Variants = {
        hidden: { opacity: 0, x: -20, height: 0 },
        visible: {
            opacity: 1,
            x: 0,
            height: "auto",
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 30
            }
        },
        exit: {
            opacity: 0,
            x: 20,
            height: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    const inputVariants: Variants = {
        focus: { scale: 1.02, transition: { duration: 0.2 } },
        blur: { scale: 1, transition: { duration: 0.2 } }
    };

    const forgotPasswordVariants: Variants = {
        hover: {
            scale: 1.05,
            color: "#primary",
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4 overflow-hidden"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
            >
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <Card className="w-full shadow-xl rounded-2xl backdrop-blur-sm bg-background/95">
                        <CardHeader className="space-y-1 text-center">
                            <motion.div
                                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 cursor-pointer"
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                            >
                                <LogIn className="h-6 w-6 text-primary" />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CardTitle className="text-2xl">Welcome back</CardTitle>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CardDescription>
                                    Sign in to continue to your dashboard
                                </CardDescription>
                            </motion.div>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.div
                                            key="error"
                                            variants={errorVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <Alert variant="destructive">
                                                <AlertDescription>{error}</AlertDescription>
                                            </Alert>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div variants={itemVariants} className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <motion.div
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="blur"
                                    >
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </motion.div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <motion.div
                                            whileHover="hover"
                                            variants={forgotPasswordVariants}
                                        >
                                            <Link
                                                href="/forgot-password"
                                                className="text-sm text-primary hover:underline inline-block"
                                            >
                                                Forgot password?
                                            </Link>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        whileFocus="focus"
                                        variants={inputVariants}
                                        initial="blur"
                                    >
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </motion.div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <motion.div
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        animate="idle"
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full relative overflow-hidden group"
                                            disabled={loading}
                                        >
                                            <motion.span
                                                initial={false}
                                                animate={loading ? { opacity: 0 } : { opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center"
                                            >
                                                Sign in
                                            </motion.span>
                                            {loading && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span className="ml-2">Signing in</span>
                                                </motion.div>
                                            )}
                                        </Button>
                                    </motion.div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground">
                                    Don&apos;t have an account?{" "}
                                    <motion.div
                                        whileHover="hover"
                                        variants={linkVariants}
                                        className="inline-block"
                                    >
                                        <Link
                                            href="/signup"
                                            className="text-primary hover:underline"
                                        >
                                            Sign up
                                        </Link>
                                    </motion.div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="text-center">
                                    <motion.div
                                        whileHover="hover"
                                        variants={linkVariants}
                                        className="inline-block"
                                    >
                                        <Link
                                            href="/"
                                            className="text-sm text-muted-foreground hover:underline"
                                        >
                                            ← Back to home
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// Default export for Next.js page
export default SignInPage;