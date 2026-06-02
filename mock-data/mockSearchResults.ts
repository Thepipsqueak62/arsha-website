import {BookOpen, Contact, FileText, Globe, HatGlasses, LayoutDashboard, Newspaper, Settings} from "lucide-react";
import {SearchResult} from "@/types/SearchResult.types";

export const mockSearchResults: SearchResult[] = [
    { id: 1, title: "Getting Started Guide",  category: "Documentation", path: "/docs/getting-started", icon: BookOpen },
    { id: 2, title: "Project Profile",        category: "Features",      path: "/features/profile",     icon: LayoutDashboard },
    { id: 3, title: "Team Collaboration",     category: "Features",      path: "/features/team",        icon: Globe },
    { id: 4, title: "API Documentation",      category: "Documentation", path: "/docs/api",             icon: FileText },
    { id: 5, title: "Recent Updates",         category: "Blog",          path: "/blog/updates",         icon: Newspaper },
    { id: 6, title: "Contact Support",        category: "Help",          path: "/contact-us",           icon: Contact },
    { id: 7, title: "Privacy Policy",         category: "Legal",         path: "/privacy",              icon: HatGlasses },
    { id: 8, title: "User Settings",          category: "Account",       path: "/settings",             icon: Settings },
];