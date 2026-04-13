"use client";

import { useMemo } from "react";
import {motion, useScroll, useTransform, Variants} from "framer-motion";
import {
    ArrowRight,
    PlayCircle,
    ShieldCheck,
    Trophy,
    Users,
    BarChart3,
    Sparkles,
    Zap,
    Medal,
    Star,
    ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MainPage() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    const features = useMemo(
        () => [
            {
                title: "Instant Matchmaking",
                description: "Get into ranked matches in under 30 seconds with our smart queue system.",
                icon: Zap,
            },
            {
                title: "Build Your Profile",
                description: "Showcase stats, highlights, and achievements with customizable career timeline.",
                icon: Sparkles,
            },
            {
                title: "Team Management",
                description: "Manage rosters, schedule scrims, and communicate with your team seamlessly.",
                icon: Users,
            },
            {
                title: "Performance Analytics",
                description: "Track your gameplay with deep insights and AI-powered recommendations.",
                icon: BarChart3,
            },
            {
                title: "Anti-Cheat Protection",
                description: "Secure, fair competitive environment with real-time monitoring.",
                icon: ShieldCheck,
            },
            {
                title: "Tournament Hub",
                description: "Join official tournaments, compete globally, and win exclusive prizes.",
                icon: Trophy,
            },
        ],
        []
    );

    const stats = [
        { value: "50K+", label: "Active Players", icon: Users, trend: "+20%" },
        { value: "$2.5M", label: "Total Prizes", icon: Medal, trend: "+15%" },
        { value: "99.9%", label: "Uptime", icon: ShieldCheck, trend: "Secure" },
        { value: "24/7", label: "Priority Support", icon: Star, trend: "Live" },
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Professional Player",
            content:
                "This platform completely changed how I approach competitive gaming. The matchmaking is incredibly fast and fair.",
            rating: 5,
        },
        {
            name: "Marcus Rodriguez",
            role: "Team Captain",
            content:
                "Managing our roster has never been easier. The analytics tools give us the edge we need to improve.",
            rating: 5,
        },
        {
            name: "Emma Watson",
            role: "Tournament Organizer",
            content:
                "Running tournaments on this platform is a breeze. The infrastructure is rock solid and support is amazing.",
            rating: 5,
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="bg-background text-foreground font-sans overflow-x-hidden">
            {/* Background decoration using theme colors */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 -left-4 w-72 h-72 rounded-full blur-3xl"
                    style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                />
                <div
                    className="absolute bottom-0 -right-4 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: 'hsl(var(--primary) / 0.08)' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
                    style={{ backgroundColor: 'hsl(var(--primary) / 0.05)' }}
                />
            </div>

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
                <motion.div
                    style={{ opacity, scale }}
                    className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10"
                />

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge
                        variant="secondary"
                        className="mb-8 bg-primary/10 hover:bg-primary/15 text-primary uppercase tracking-wider text-xs font-semibold px-4 py-1.5 rounded-full border-primary/20"
                    >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Next-Gen Platform for Gamers
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] max-w-5xl mx-auto"
                >
                    Built for the future of{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            competitive
          </span>{" "}
                    gaming
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-6 text-muted-foreground max-w-2xl text-base sm:text-lg"
                >
                    Build your competitive profile, find tournaments, and connect with elite players.
                    Join the fastest-growing competitive gaming platform.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Button
                        size="lg"
                        className="font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 hover:scale-105"
                    >
                        <PlayCircle className="mr-2 w-4 h-4" />
                        Watch Demo
                    </Button>
                </motion.div>

                {/* STATS SECTION */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 w-full max-w-4xl"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={item}
                            className="relative group"
                        >
                            <Card className="bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                                <CardContent className="p-5 text-center">
                                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-2xl font-bold text-foreground">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-[10px] text-primary/70 mt-1 font-medium">
                                        {stat.trend}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-bounce" />
                    </div>
                </motion.div>
            </section>

            {/* FEATURES SECTION */}
            <section className="relative px-4 py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-primary/10 text-primary border-primary/20"
                        >
                            Features
                        </Badge>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-bold mb-4"
                    >
                        Everything you need to{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              compete
            </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        Powerful tools and features designed to help you reach the next level
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={item}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="group bg-card hover:border-primary/30 transition-all duration-500 overflow-hidden relative">
                                <CardContent className="p-6 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="relative px-4 py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-primary/10 text-primary border-primary/20"
                        >
                            Testimonials
                        </Badge>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl font-bold mb-4"
                    >
                        Loved by the{" "}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              community
            </span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.name}
                            variants={item}
                            whileHover={{ y: -4 }}
                        >
                            <Card className="bg-card hover:border-primary/30 transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-primary text-primary"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        &#34;{testimonial.content}&#34;
                                    </p>
                                    <div>
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA SECTION */}
            <section className="relative px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <Card className="bg-card border-border overflow-hidden relative">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"
                        />
                        <CardContent className="p-12 text-center relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                            >
                                <Trophy className="w-8 h-8 text-primary" />
                            </motion.div>
                            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                                Ready to{" "}
                                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  compete
                </span>
                                ?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                Join thousands of players already competing on the platform. Start your journey today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    Sign Up Now
                                    <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="transition-all duration-300 hover:scale-105"
                                >
                                    Contact Sales
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-border py-12 px-4">
                <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
                    <p>&copy; 2024 Competitive Gaming Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}