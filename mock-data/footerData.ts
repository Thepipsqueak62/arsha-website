import {LinkItem} from "@/types/FooterLinkItem.type";

export const footerSections: Record<string, { title: string; links: LinkItem[] }> = {
    company: {
        title: "Company",
        links: [
            { name: "About Us", href: "/about" },
            { name: "Our Team", href: "/team" },
            { name: "Careers", href: "/careers", badge: "Hiring" },
            { name: "Press", href: "/press" },
            { name: "Contact", href: "/contact-us" },
        ]
    },
    esports: {
        title: "esports",
        links: [
            { name: "teams", href: "/esports-teams" },
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
            { name: "guides", href: "/guides" },
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