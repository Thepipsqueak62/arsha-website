"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Add this import
import Link from "next/link";
import {
    FaGithub,
    FaLinkedinIn,
    FaTwitter,
    FaDiscord,
    FaYoutube,
    FaTwitch
} from "react-icons/fa";
import {
    Mail,
    Send,
    MapPin,
    Phone,
    Clock,
    ChevronRight,
    Sparkles,
    Trophy,
    Users,
    Shield,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Footer() {
    const router = useRouter(); // Initialize router here
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [navigating, setNavigating] = useState<string | null>(null); // Track which link is navigating
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Sonner toast success message
        toast.success("Successfully subscribed! 🎉", {
            description: "You'll now receive the latest esports updates.",
            duration: 4000,
        });

        setEmail("");
        setIsSubmitting(false);
    };

    // Navigation handler to prevent blank screen on 404s
    const handleNavigation = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setNavigating(href);

        try {
            // Check if the page exists by making a HEAD request
            const response = await fetch(href, { method: 'HEAD' });

            if (response.ok) {
                // Page exists (200-299) - use smooth client-side navigation
                router.push(href);
            } else {
                // Page doesn't exist (404) or other error - use hard navigation
                // This prevents Next.js router from corrupting state
                window.location.href = href;
            }
        } catch (error) {
            // On network error, fall back to hard navigation
            console.error('Navigation error:', error);
            window.location.href = href;
        } finally {
            setNavigating(null);
        }
    };

    // Define proper types for links
    interface LinkItem {
        name: string;
        href: string;
        badge?: string;
    }

    // Footer sections data with proper typing
    const footerSections: Record<string, { title: string; links: LinkItem[] }> = {
        company: {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Our Team", href: "/team" },
                { name: "Careers", href: "/careers", badge: "Hiring" },
                { name: "Press", href: "/press" },
                { name: "Contact", href: "/contact" },
            ]
        },
        esports: {
            title: "Esports",
            links: [
                { name: "Teams", href: "/teams" },
                { name: "Schedule", href: "/schedule" },
                { name: "Results", href: "/results" },
                { name: "Academy", href: "/academy" },
                { name: "Tryouts", href: "/tryouts" },
            ]
        },
        resources: {
            title: "Resources",
            links: [
                { name: "Blog", href: "/blog" },
                { name: "News", href: "/news" },
                { name: "Guides", href: "/guides" },
                { name: "Shop", href: "/shop" },
                { name: "Support", href: "/support" },
            ]
        },
        legal: {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Code of Conduct", href: "/conduct" },
            ]
        }
    };

    const socialLinks = [
        { href: "https://github.com", Icon: FaGithub, label: "GitHub", color: "hover:bg-gray-700" },
        { href: "https://twitter.com", Icon: FaTwitter, label: "Twitter", color: "hover:bg-[#1DA1F2]" },
        { href: "https://linkedin.com", Icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
        { href: "https://discord.gg", Icon: FaDiscord, label: "Discord", color: "hover:bg-[#5865F2]" },
        { href: "https://youtube.com", Icon: FaYoutube, label: "YouTube", color: "hover:bg-[#FF0000]" },
        { href: "https://twitch.tv", Icon: FaTwitch, label: "Twitch", color: "hover:bg-[#9146FF]" },
    ];

    const stats = [
        { icon: Trophy, label: "Tournament Wins", value: "24" },
        { icon: Users, label: "Active Players", value: "50+" },
        { icon: Shield, label: "Years of Excellence", value: "4" },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative bg-gradient-to-b from-background via-background to-secondary/10 border-t border-border/50 mt-auto"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            {/* Main Footer Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                {/* Top Section with Newsletter */}
                <motion.div variants={itemVariants} className="mb-12 pb-8 border-b border-border/50">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                                    <Trophy className="relative h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Arsha Esports
                                </h2>
                                <Badge variant="outline" className="border-primary/50 text-primary">
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    Pro Circuit
                                </Badge>
                            </div>
                            <p className="text-muted-foreground max-w-md">
                                Building champions, creating content, and shaping the future of competitive gaming since 2021.
                            </p>
                            <div className="flex gap-3">
                                {stats.map((stat, index) => (
                                    <div key={stat.label} className="flex items-center gap-2">
                                        <stat.icon className="h-4 w-4 text-primary" />
                                        <div>
                                            <div className="font-semibold text-sm">{stat.value}</div>
                                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                                        </div>
                                        {index < stats.length - 1 && <div className="w-px h-6 bg-border mx-1" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <h3 className="font-semibold">Subscribe to our newsletter</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Get the latest esports news, match schedules, and exclusive content.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-background/50 backdrop-blur-sm"
                                />
                                <Button type="submit" disabled={isSubmitting} className="group">
                                    {isSubmitting ? (
                                        "Subscribing..."
                                    ) : (
                                        <>
                                            Subscribe
                                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground">
                                By subscribing, you agree to our Privacy Policy.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                    {Object.entries(footerSections).map(([key, section]) => (
                        <motion.div key={key} variants={itemVariants}>
                            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleNavigation(e, link.href)}
                                            className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {navigating === link.href ? (
                                                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                            ) : (
                                                <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            )}
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                {link.name}
                                            </span>
                                            {link.badge && (
                                                <Badge variant="secondary" className="text-[10px] ml-1">
                                                    {link.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                                <span>123 Gaming Street, Esports City, EC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                                <a href="mailto:contact@arshaesports.com" className="hover:text-foreground transition-colors">
                                    contact@arshaesports.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                                <span>Mon-Fri: 9AM - 6PM EST</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="pt-8 border-t border-border/50 flex flex-col lg:flex-row items-center justify-between gap-6"
                >
                    {/* Copyright */}
                    <div className="text-center lg:text-left space-y-2">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Arsha Esports. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-muted-foreground">
                            <span>Built with Next.js</span>
                            <span className="opacity-50">•</span>
                            <span>Powered by shadcn/ui</span>
                            <span className="opacity-50">•</span>
                            <span>Hosted on Vercel</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map(({ href, Icon, label, color }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-2 rounded-lg bg-background/50 backdrop-blur-sm text-muted-foreground hover:text-white transition-all duration-300 ${color} hover:scale-110`}
                                aria-label={label}
                            >
                                <Icon size={16} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Back to Top Button */}
                    <motion.button
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <span>Back to top</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </motion.button>
                </motion.div>
            </div>
        </motion.footer>
    );
}