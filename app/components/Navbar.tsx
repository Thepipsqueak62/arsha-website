"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";

import { cn } from "@/lib/utils";
import {
    Home,
    Menu,
    X,
    Info,
    Newspaper,
    Globe,
    Contact,
    HatGlasses,
    User,
    LogOut,
    UserCircle,
    LayoutDashboard,
    ChevronDown,
    ChevronUp,
    Settings,
    HelpCircle,
    Search,
    History,
    TrendingUp,
    BookOpen,
    FileText,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

import { AnimatePresence } from "framer-motion";

// Next.js navigation imports — replaces react-router-dom
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/app/components/ui/button";
import { ROUTE_PATHS } from "@/lib/routes";

// ─── Types ───────────────────────────────────────────────────────────────────

type NavigationItem = {
    path: string;
    label: string;
    icon: LucideIcon;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockSearchResults = [
    { id: 1, title: "Getting Started Guide",  category: "Documentation", path: "/docs/getting-started", icon: BookOpen },
    { id: 2, title: "Project Profile",        category: "Features",       path: "/features/profile",     icon: LayoutDashboard },
    { id: 3, title: "Team Collaboration",     category: "Features",       path: "/features/team",        icon: Globe },
    { id: 4, title: "API Documentation",      category: "Documentation", path: "/docs/api",             icon: FileText },
    { id: 5, title: "Recent Updates",         category: "Blog",           path: "/blog/updates",         icon: Newspaper },
    { id: 6, title: "Contact Support",        category: "Help",           path: "/contact",              icon: Contact },
    { id: 7, title: "Privacy Policy",         category: "Legal",          path: "/privacy",              icon: HatGlasses },
    { id: 8, title: "User Settings",          category: "Account",        path: "/settings",             icon: Settings },
];

const mockRecentSearches = [
    "profile setup",
    "team management",
    "API integration",
    "project templates",
];

// ─── Search Overlay ───────────────────────────────────────────────────────────

const SearchOverlay = ({
                           isOpen,
                           onClose,
                       }: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [searchQuery,   setSearchQuery]   = useState("");
    const [searchResults, setSearchResults] = useState<typeof mockSearchResults>([]);
    const [isLoading,     setIsLoading]     = useState(false);
    const [showResults,   setShowResults]   = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Next.js: useRouter for programmatic navigation
    const router = useRouter();

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setShowResults(true);

        setTimeout(() => {
            const filteredResults = mockSearchResults.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
            setIsLoading(false);
        }, 300);
    };

    const handleQuickSearch = (query: string) => {
        setSearchQuery(query);
        const filteredResults = mockSearchResults.filter(
            (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setShowResults(true);
    };

    const handleResultClick = (path: string) => {
        router.push(path); // Next.js programmatic navigation
        onClose();
        setSearchQuery("");
        setShowResults(false);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setShowResults(false);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-background/95 dark:bg-background-dark/95 backdrop-blur-md z-50 transition-opacity duration-200"
            style={{ opacity: isOpen ? 1 : 0 }}
            onClick={onClose}
        >
            <div className="container mx-auto px-4 pt-20">
                <div
                    className="max-w-3xl mx-auto transition-all duration-200 ease-out"
                    style={{
                        transform: isOpen ? "translateY(0)" : "translateY(-20px)",
                        opacity:   isOpen ? 1 : 0,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative group">
                        <Search
                            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-foreground/40 group-focus-within:text-primary"
                            size={24}
                        />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (e.target.value.length > 0) {
                                    handleQuickSearch(e.target.value);
                                } else {
                                    setShowResults(false);
                                }
                            }}
                            placeholder="Search documentation, features, help..."
                            className="w-full pl-16 pr-24 py-5 bg-background dark:bg-background-dark rounded-2xl border-2 border-border/50 dark:border-border-dark/50 shadow-2xl text-lg focus:outline-none focus:border-primary transition-colors"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="px-3 py-1 text-sm text-foreground/60 hover:text-foreground bg-muted/50 rounded-lg transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                            >
                                Esc
                            </button>
                        </div>
                    </form>

                    {/* Results Panel */}
                    <div className="mt-6">
                        {showResults ? (
                            <div className="bg-background dark:bg-background-dark rounded-xl border border-border/50 dark:border-border-dark/50 shadow-xl overflow-hidden transition-all duration-200">
                                <div className="p-4 border-b border-border/30 dark:border-border-dark/30">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground/80">
                                            {isLoading ? "Searching..." : `Results (${searchResults.length})`}
                                        </h3>
                                        {searchQuery && (
                                            <span className="text-sm text-foreground/60">
                                                Search: &#34;{searchQuery}&#34;
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="p-8 text-center">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                                        <p className="mt-3 text-foreground/60">Searching...</p>
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="divide-y divide-border/30 dark:divide-border-dark/30">
                                        {searchResults.map((result) => {
                                            const Icon = result.icon;
                                            return (
                                                <button
                                                    key={result.id}
                                                    onClick={() => handleResultClick(result.path)}
                                                    className="w-full text-left p-4 hover:bg-muted/30 dark:hover:bg-muted-dark/30 transition-colors group"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                            <Icon size={18} className="text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium group-hover:text-primary transition-colors">
                                                                {result.title}
                                                            </div>
                                                            <div className="text-sm text-foreground/60 mt-1">
                                                                {result.category} • Click to navigate
                                                            </div>
                                                        </div>
                                                        <ChevronRight
                                                            className="opacity-0 group-hover:opacity-60 transition-opacity"
                                                            size={18}
                                                        />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <Search size={40} className="mx-auto text-foreground/30 mb-3" />
                                        <h4 className="font-medium text-foreground/80">No results found</h4>
                                        <p className="text-sm text-foreground/60 mt-1">
                                            Try different keywords or browse our documentation
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : searchQuery.length === 0 ? (
                            <div className="bg-background dark:bg-background-dark rounded-xl border border-border/50 dark:border-border-dark/50 shadow-xl overflow-hidden transition-all duration-200">
                                <div className="p-4 border-b border-border/30 dark:border-border-dark/30">
                                    <h3 className="font-semibold text-foreground/80">Recent Searches</h3>
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {mockRecentSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickSearch(search)}
                                                className="px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-lg text-sm text-foreground/70 hover:text-foreground transition-colors flex items-center gap-2"
                                            >
                                                <History size={12} />
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-foreground/70 flex items-center gap-2">
                                            <TrendingUp size={14} />
                                            Trending Searches
                                        </h4>
                                        <div className="space-y-2">
                                            {mockSearchResults.slice(0, 3).map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleResultClick(item.path)}
                                                        className="w-full text-left p-3 rounded-lg hover:bg-muted/30 transition-colors flex items-center gap-3 group"
                                                    >
                                                        <Icon
                                                            size={16}
                                                            className="text-foreground/50 group-hover:text-primary"
                                                        />
                                                        <span className="text-sm">{item.title}</span>
                                                        <span className="text-xs text-foreground/40 ml-auto">
                                                            {item.category}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Keyboard hints */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-4 text-sm text-foreground/50">
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">↑</kbd>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">↓</kbd>
                                <span>to navigate</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
                                <span>to select</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
                                <span>to close</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Auth Hook ────────────────────────────────────────────────────────────────
// localStorage is client-only; guarded with typeof window check for SSR safety.

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username,        setUsername]        = useState<string | null>(null);

    // Next.js: useRouter for programmatic navigation
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            // Guard: localStorage is unavailable during SSR
            if (typeof window === "undefined") return;

            const token           = localStorage.getItem("token");
            const storedUsername  = localStorage.getItem("username");

            if (token) {
                setIsAuthenticated(true);
                if (storedUsername) {
                    setUsername(storedUsername);
                } else {
                    try {
                        const payload = JSON.parse(atob(token.split(".")[1]));
                        if (payload.username) {
                            setUsername(payload.username);
                            localStorage.setItem("username", payload.username);
                        }
                    } catch (error) {
                        console.error("Failed to decode token:", error);
                    }
                }
            } else {
                setIsAuthenticated(false);
                setUsername(null);
            }
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        setUsername(null);
        router.push(ROUTE_PATHS.PUBLIC.MAINPAGE); // Next.js navigation
    };

    return { isAuthenticated, username, logout };
};

// ─── Desktop Navigation ───────────────────────────────────────────────────────
// NavLink from react-router-dom → replaced with Next.js <Link> + pathname check.

const DesktopNavigation = ({
                               items,
                               className = "",
                               showIcons = true,
                               showActiveIndicator = false,
                               currentPath,
                           }: {
    items: NavigationItem[];
    className?: string;
    showIcons?: boolean;
    showActiveIndicator?: boolean;
    currentPath: string;
}) => (
    <nav className={cn("hidden lg:flex items-center", className)}>
        {items.map((item) => {
            const Icon     = item.icon;
            const isActive = currentPath === item.path;
            return (
                <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                        "group relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm hover:bg-muted/50",
                        "min-w-[80px] justify-center",
                        isActive
                            ? "text-primary font-semibold"
                            : "text-foreground/80 hover:text-foreground"
                    )}
                >
                    {showIcons && <Icon size={16} className="shrink-0" />}
                    <span className="whitespace-nowrap">{item.label}</span>
                    {showActiveIndicator && isActive && (
                        <span className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-primary rounded-full -translate-x-1/2" />
                    )}
                </Link>
            );
        })}
    </nav>
);

// ─── Mobile Navigation ────────────────────────────────────────────────────────

const MobileNavigation = ({
                              items,
                              onItemClick,
                              className = "",
                              showIcons = true,
                              currentPath,
                          }: {
    items: NavigationItem[];
    onItemClick: () => void;
    className?: string;
    showIcons?: boolean;
    currentPath: string;
}) => (
    <div className={cn("space-y-1", className)}>
        {items.map((item) => {
            const Icon     = item.icon;
            const isActive = currentPath === item.path;
            return (
                <Link
                    key={item.path}
                    href={item.path}
                    onClick={onItemClick}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200",
                        isActive
                            ? "text-primary bg-primary/10"
                            : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    {showIcons && <Icon size={18} className="shrink-0" />}
                    <span className="text-sm">{item.label}</span>
                </Link>
            );
        })}
    </div>
);

// ─── User Dropdown ────────────────────────────────────────────────────────────

const UserDropdown = ({
                          username,
                          logout,
                      }: {
    username: string;
    logout: () => void;
}) => {
    const [isOpen,    setIsOpen]    = useState(false);
    const [isMobile,  setIsMobile]  = useState(false);
    const dropdownRef               = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getUserInitials = () => (username ? username.charAt(0).toUpperCase() : "U");

    const userMenuItems: NavigationItem[] = [
        { label: "Dashboard", icon: LayoutDashboard, path: ROUTE_PATHS.APP.DASHBOARD },
        { label: "Profile",   icon: UserCircle,      path: ROUTE_PATHS.APP?.PROFILE   || "/profile" },
        { label: "Settings",  icon: Settings,         path: ROUTE_PATHS.APP?.SETTINGS  || "/settings" },
    ];

    if (isMobile) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                </div>
                <span className="text-sm font-medium truncate max-w-[100px]">{username}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="ml-2">
                    <LogOut size={16} />
                </Button>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials()}
                </div>
                <span className="text-sm font-medium truncate max-w-[120px]">{username}</span>
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-background dark:bg-background-dark rounded-lg shadow-lg border border-border/50 dark:border-border-dark/50 py-1 z-50">
                        {userMenuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.path}          // Next.js: href instead of to
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </Link>
                            );
                        })}
                        <div className="border-t border-border/30 dark:border-border-dark/30 my-1" />
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors text-red-500"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─── Navbar (main export) ─────────────────────────────────────────────────────

const Navbar = () => {
    const [isOpen,      setIsOpen]      = useState(false);
    const [scrolled,    setScrolled]    = useState(false);
    const [searchOpen,  setSearchOpen]  = useState(false);
    const [isMobile,    setIsMobile]    = useState(false);

    // Next.js: usePathname instead of useLocation().pathname
    const pathname                      = usePathname();
    const { isAuthenticated, username, logout } = useAuth();
    const navbarRef                     = useRef<HTMLDivElement>(null);

    // Responsive breakpoint
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll handler (throttled via rAF)
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change (pathname from usePathname)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow  = "hidden";
            document.body.style.position  = "fixed";
            document.body.style.width     = "100%";
            document.body.style.top       = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow  = "";
            document.body.style.position  = "";
            document.body.style.width     = "";
            document.body.style.top       = "";
            if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
        }
        return () => {
            document.body.style.overflow  = "";
            document.body.style.position  = "";
            document.body.style.width     = "";
            document.body.style.top       = "";
        };
    }, [isOpen]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Keyboard shortcut: ⌘K or / to open search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === "/" && !searchOpen && !isOpen) {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [searchOpen, isOpen]);

    // Navigation config
    const baseNavigation: NavigationItem[] = [
        { path: ROUTE_PATHS.PUBLIC.MAINPAGE,            label: "Home",     icon: Home },
        { path: ROUTE_PATHS.PUBLIC?.ABOUT    || "/about",    label: "About",    icon: Info },
        { path: ROUTE_PATHS.PUBLIC?.FEATURES || "/features", label: "Features", icon: Globe },
    ];

    const secondaryNavigation: NavigationItem[] = [
        { path: ROUTE_PATHS.PUBLIC?.CONTACT || "/contact", label: "Contact", icon: Contact },
        { path: ROUTE_PATHS.PUBLIC?.PRIVACY  || "/privacy", label: "Privacy",  icon: HatGlasses },
    ];

    const authNavigation: NavigationItem[] = isAuthenticated
        ? []
        : [
            { path: ROUTE_PATHS.AUTH?.SIGN_IN || "/signin", label: "Sign In", icon: User },
            { path: ROUTE_PATHS.AUTH?.SIGN_UP || "/signup", label: "Sign Up", icon: UserCircle },
        ];

    const allNavigation = [...baseNavigation, ...secondaryNavigation, ...authNavigation];

    return (
        <div ref={navbarRef}>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
                    scrolled
                        ? "bg-background/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border/50 dark:border-border-dark/50 shadow-sm"
                        : "bg-background dark:bg-background-dark border-b border-transparent"
                )}
            >
                {/* Announcement banner */}
                <div className="hidden md:flex items-center justify-center py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium">
                    🚀 Welcome to Project-PurpleHaze • Next-gen E-Sports platform
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link
                            href={ROUTE_PATHS.PUBLIC.MAINPAGE}  // Next.js: href
                            className="flex items-center gap-2.5 group relative z-10"
                        >
                            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
                                <span className="text-white font-bold text-sm">PA</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 dark:from-foreground-dark dark:to-foreground-dark/80 bg-clip-text text-transparent">
                                    Proj-Ariel
                                </span>
                                <span className="text-[10px] lg:text-xs text-foreground/60 dark:text-foreground-dark/60 -mt-1">
                                    Project Management
                                </span>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden lg:flex items-center flex-1 justify-center px-8">
                            <DesktopNavigation
                                items={allNavigation}
                                showActiveIndicator
                                currentPath={pathname}  // Next.js: usePathname()
                            />
                        </div>

                        {/* Right controls */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            {/* Search button (desktop) */}
                            {!isMobile && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchOpen(true)}
                                    className="hidden md:flex items-center gap-2 hover:bg-primary/10"
                                >
                                    <Search size={16} />
                                    <span className="hidden lg:inline text-sm">Search</span>
                                    <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-muted rounded ml-2">
                                        <span className="text-[10px]">⌘</span>K
                                    </kbd>
                                </Button>
                            )}

                            {/* Auth area */}
                            {isAuthenticated ? (
                                <UserDropdown username={username || ""} logout={logout} />
                            ) : (
                                !isMobile && (
                                    <div className="hidden lg:flex items-center gap-2">
                                        {authNavigation.map((item) => {
                                            const Icon     = item.icon;
                                            const isSignUp = item.label === "Sign Up";
                                            return (
                                                <Link
                                                    key={item.path}
                                                    href={item.path}          // Next.js: href
                                                    className={cn(
                                                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                                        isSignUp
                                                            ? "bg-primary text-white hover:bg-primary/90"
                                                            : "hover:bg-muted/50"
                                                    )}
                                                >
                                                    {!isSignUp && <Icon size={16} className="inline mr-2" />}
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )
                            )}

                            {/* Theme toggle — keep your existing ModeToggle */}
                            {/* <ModeToggle /> */}

                            {/* Hamburger */}
                            <button
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors relative z-50"
                            >
                                {isOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                <div
                    className={cn(
                        "lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out",
                        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm"
                        style={{ opacity: isOpen ? 1 : 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Slide-in panel */}
                    <div
                        className="absolute top-0 right-0 h-full w-full max-w-sm bg-background dark:bg-background-dark border-l border-border/50 dark:border-border-dark/50 shadow-2xl overflow-y-auto transition-transform duration-300 ease-out"
                        style={{
                            transform:       isOpen ? "translateX(0)" : "translateX(100%)",
                            transitionDelay: isOpen ? "0s" : "0.1s",
                        }}
                    >
                        <div className="p-6">
                            {/* Mobile header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold">PA</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Proj-Ariel</h3>
                                        {isAuthenticated && username && (
                                            <p className="text-sm text-foreground/60">Hi, {username}!</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Search trigger */}
                            <div className="mb-6">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setTimeout(() => setSearchOpen(true), 300);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                                >
                                    <Search className="text-foreground/40" size={18} />
                                    <span className="text-foreground/70">Search...</span>
                                    <kbd className="ml-auto px-2 py-1 text-xs bg-background rounded">/</kbd>
                                </button>
                            </div>

                            {/* Nav sections */}
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                        Main Menu
                                    </h4>
                                    <MobileNavigation
                                        items={baseNavigation}
                                        onItemClick={() => setIsOpen(false)}
                                        currentPath={pathname}
                                    />
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                        Discover
                                    </h4>
                                    <MobileNavigation
                                        items={secondaryNavigation}
                                        onItemClick={() => setIsOpen(false)}
                                        currentPath={pathname}
                                    />
                                </div>

                                {!isAuthenticated && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                            Account
                                        </h4>
                                        <MobileNavigation
                                            items={authNavigation}
                                            onItemClick={() => setIsOpen(false)}
                                            currentPath={pathname}
                                        />
                                    </div>
                                )}

                                {isAuthenticated && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3 px-2">
                                            Your Account
                                        </h4>
                                        <div className="space-y-1">
                                            <Link
                                                href={ROUTE_PATHS.APP.DASHBOARD}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium hover:bg-muted/50"
                                            >
                                                <LayoutDashboard size={18} />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={ROUTE_PATHS.APP?.PROFILE || "/profile"}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium hover:bg-muted/50"
                                            >
                                                <UserCircle size={18} />
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-12 pt-6 border-t border-border/30">
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <Link href="/help" className="text-sm text-foreground/60 hover:text-foreground">
                                        <HelpCircle size={16} className="inline mr-1" /> Help
                                    </Link>
                                    <Link href="/terms" className="text-sm text-foreground/60 hover:text-foreground">
                                        Terms
                                    </Link>
                                    <Link href="/cookies" className="text-sm text-foreground/60 hover:text-foreground">
                                        Cookies
                                    </Link>
                                </div>
                                <p className="text-xs text-foreground/40 text-center">
                                    © {new Date().getFullYear()} Proj-Ariel. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Spacer when mobile menu pushes layout */}
            {isOpen && <div className="h-16" />}

            {/* Search overlay */}
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
    );
};

export default Navbar;