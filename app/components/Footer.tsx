"use client"

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
            className="border-t border-border py-8 sm:py-10"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground order-2 sm:order-1">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-foreground font-medium"></span>. All rights
                    reserved.
                </p>

                <div className="flex items-center gap-4 order-1 sm:order-2">
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

                <p className="text-xs text-muted-foreground font-mono order-3">
                    Next.JS· shadcn/ui
                </p>
            </div>
        </motion.footer>
    );
}