"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-t border-border py-8"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                    {/* Left */}
                    <div className="text-center sm:text-left space-y-1">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()}{" "}
                            <span className="text-foreground font-medium">
                Your Name
              </span>
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground">
                            <a
                                href="/privacy-policy"
                                className="hover:text-foreground transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <span className="opacity-50">•</span>
                            <span>Next.js · shadcn/ui</span>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        {[
                            { href: "https://github.com", Icon: FaGithub, label: "GitHub" },
                            { href: "https://linkedin.com", Icon: FaLinkedinIn, label: "LinkedIn" },
                            { href: "mailto:you@example.com", Icon: Mail, label: "Email" },
                        ].map(({ href, Icon, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={label}
                            >
                                <Icon size={16} />
                            </motion.a>
                        ))}
                    </div>

                </div>
            </div>
        </motion.footer>
    );
}